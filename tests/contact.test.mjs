import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, sendContact, CONTACT_TIMEOUT_MS } from '../src/site/contact-service.js';
import { trackEvent, configureAnalytics } from '../src/site/analytics.js';
const valid = { nome: ' Teste ', email: ' teste@example.com ', assunto: ' Novo projeto ', mensagem: ' Um processo de teste. ' };
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
