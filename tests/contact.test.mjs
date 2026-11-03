import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, validateQualification, qualifyContact, sendContact, CONTACT_TIMEOUT_MS } from '../src/site/contact-service.js';
import { knownService, contactPath } from '../src/site/content.js';
import { trackEvent, configureAnalytics } from '../src/site/analytics.js';
const valid = { nome: ' Teste ', email: ' teste@example.com ', assunto: ' Novo projeto ', mensagem: ' Um processo de teste. ' };
const qualified = { ...valid, empresa: '', servico: 'blueprint', preferencia: 'email', telefone: '', website: '' };
test('service context accepts only catalog identifiers', () => {
  assert.equal(contactPath('blueprint'), '/contato?servico=blueprint');
  for (const invalid of ['<script>', 'email@example.com', '/contato?email=secret', null]) {
    assert.equal(knownService(invalid), ''); assert.equal(contactPath(invalid), '/contato');
  }
});
test('qualified contact includes context in the legacy envelope without leaking hidden fields', () => {
  assert.deepEqual(validateQualification(qualified), {});
  const payload = qualifyContact({ ...qualified, empresa: ' Empresa Teste ', telefone: 'discard unless selected', privateNote: 'never' });
  assert.deepEqual(Object.keys(payload), ['nome', 'email', 'assunto', 'mensagem']);
  assert.equal(payload.assunto, 'CODERSA Blueprint — Novo projeto');
  assert.match(payload.mensagem, /Empresa: Empresa Teste/);
  assert.match(payload.mensagem, /Preferência de contato: E-mail/);
  assert.doesNotMatch(payload.mensagem, /discard|never/);
  assert.deepEqual(validateContact(payload), {});
});
test('qualification enforces optional company, known service and conditional WhatsApp phone', () => {
  assert.ok(validateQualification({ ...qualified, servico: 'unknown' }).servico);
  assert.ok(validateQualification({ ...qualified, preferencia: 'sms' }).preferencia);
  assert.ok(validateQualification({ ...qualified, preferencia: 'whatsapp' }).telefone);
  for (const telefone of ['        ', '()---()---', '12345678']) assert.ok(validateQualification({ ...qualified, preferencia: 'whatsapp', telefone }).telefone);
  const values = { ...qualified, preferencia: 'whatsapp', telefone: '+55 (11) 99999-9999' };
  assert.deepEqual(validateQualification(values), {});
  assert.match(qualifyContact(values).mensagem, /Telefone: \+55 \(11\) 99999-9999/);
  assert.ok(validateQualification({ ...qualified, website: 'spam' }).website);
});
test('qualified envelope respects limits without silent truncation or header injection', () => {
  const largest = { ...qualified, nome: 'N'.repeat(180), assunto: 'A'.repeat(120), mensagem: 'M'.repeat(5000), empresa: 'E'.repeat(180) };
  assert.deepEqual(validateQualification(largest), {});
  assert.deepEqual(validateContact(qualifyContact(largest)), {});
  assert.ok(validateQualification({ ...largest, mensagem: 'M'.repeat(5001) }).mensagem);
  assert.ok(validateQualification({ ...largest, assunto: 'A'.repeat(121) }).assunto);
  assert.ok(validateQualification({ ...qualified, empresa: 'E'.repeat(181) }).empresa);
  for (const field of ['nome', 'email', 'assunto']) {
    assert.ok(validateQualification({ ...qualified, [field]: 'injected\r\nBcc: victim@example.com' })[field]);
    assert.ok(validateContact({ ...valid, [field]: {} })[field]);
  }
});
test('Blueprint events and confirmed contacts use allowed service only, even if adapter fails', () => {
  const previous = globalThis.window; const target = new EventTarget(); globalThis.window = target;
  const events=[]; target.addEventListener('codersa:analytics', e=>events.push(e.detail));
  configureAnalytics(()=>{throw new Error('adapter down');});
  trackEvent('blueprint_cta_click', { route: '/servicos/blueprint', source: 'section', service: 'blueprint', empresa: 'private', telefone: 'private', email: 'private' });
  trackEvent('contact_submit_success', { route: '/contato', source: 'contact-form', service: 'unknown@example.com' });
  assert.deepEqual(events[0], { name: 'blueprint_cta_click', route: '/servicos/blueprint', source: 'section', service: 'blueprint' });
  assert.equal('service' in events[1], false);
  assert.doesNotMatch(JSON.stringify(events), /private|unknown@/);
  configureAnalytics(null); globalThis.window = previous;
});
test('required fields and invalid email return named errors', () => {
  assert.deepEqual(Object.keys(validateContact({})), ['nome', 'email', 'assunto', 'mensagem']);
  assert.ok(validateContact({ ...valid, email: 'invalido' }).email);
  assert.deepEqual(validateContact(valid), {});
});
test('success requires service confirmation and preserves the four-field contract', async () => {
  let body;
  const result = await sendContact({ ...valid, privateNote: 'never include' }, { fetchImpl: async (url, options) => {
    assert.equal(url, 'https://codersa-backend.onrender.com/send-email');
    assert.equal(options.method, 'POST'); body = JSON.parse(options.body);
    return { ok: true, json: async () => ({ success: true }) };
  } });
  assert.equal(result, true);
  assert.deepEqual(body, { nome: 'Teste', email: 'teste@example.com', assunto: 'Novo projeto', mensagem: 'Um processo de teste.' });
});
for (const [name, response, reason] of [
  ['HTTP error', { ok: false }, 'http'],
  ['negative body', { ok: true, json: async () => ({ success: false }) }, 'negative'],
  ['missing confirmation', { ok: true, json: async () => ({}) }, 'negative'],
  ['non-boolean confirmation', { ok: true, json: async () => ({ success: 'true' }) }, 'negative'],
  ['malformed JSON', { ok: true, json: async () => { throw new Error('bad JSON'); } }, 'invalid-response'],
]) test(name + ' is not a conversion', async () => assert.rejects(sendContact(valid, { fetchImpl: async () => response }), error => error.reason === reason));
test('network failure has no service details in its message', async () => {
  await assert.rejects(sendContact(valid, { fetchImpl: async () => { throw new Error('sensitive backend message'); } }), error => error.reason === 'network' && !error.message.includes('sensitive'));
});
test('timeout aborts the request and returns a retryable category', async () => {
  assert.equal(CONTACT_TIMEOUT_MS, 15000);
  await assert.rejects(sendContact(valid, { timeoutMs: 10, fetchImpl: (_url, { signal }) => new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(new Error('aborted')))) }), error => error.reason === 'timeout');
});
test('analytics allowlist drops PII, arbitrary routes and unknown events', () => {
  const previous = globalThis.window;
  const target = new EventTarget(); globalThis.window = target;
  const local = [], remote = [];
  target.addEventListener('codersa:analytics', event => local.push(event.detail));
  configureAnalytics(event => remote.push(event));
  trackEvent('contact_submit_success', { route: '/contato', source: 'contact-form', email: 'secret@example.com', mensagem: 'private' });
  trackEvent('process_mapping_click', { route: '/?email=secret@example.com', source: 'arbitrary' });
  trackEvent('unknown', valid);
  assert.equal(local.length, 2);
  assert.deepEqual(local[0], { name: 'contact_submit_success', route: '/contato', source: 'contact-form' });
  assert.equal(local[1].route, '/');
  assert.equal(JSON.stringify(remote).includes('secret'), false);
  configureAnalytics(null); globalThis.window = previous;
});
