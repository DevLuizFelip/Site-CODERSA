import { knownService, serviceOptions } from './content.js';

export const CONTACT_TIMEOUT_MS = 15000;
export const CONTACT_ENDPOINT = import.meta.env?.VITE_CONTACT_ENDPOINT || 'https://codersa-backend.onrender.com/send-email';
const headerControls = value => /[\r\n]/.test(value) || String(value || '').includes('\0');
export function validateContact(values) {
  const errors = {};
  for (const [field, label] of Object.entries({ nome: 'seu nome', email: 'seu e-mail', assunto: 'o assunto', mensagem: 'a descrição do processo ou solicitação' })) {
    if (!String(values[field] || '').trim()) errors[field] = `Informe ${label}.`;
  }
  if (!errors.email && (typeof values.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))) errors.email = 'Informe um e-mail válido.';
  for (const [field, limit] of Object.entries({ nome: 180, email: 254, assunto: 180, mensagem: 6000 })) {
    if (typeof values[field] !== 'string' || values[field].length > limit) errors[field] = `Use texto com até ${limit} caracteres.`;
  }
  for (const field of ['nome', 'email', 'assunto']) if (headerControls(values[field])) errors[field] = 'Use uma única linha, sem caracteres de controle.';
  return errors;
}
export function qualifyContact(values) {
  const service = serviceOptions.find(item => item.id === knownService(values.servico));
  const label = service?.label || '';
  return {
    nome: String(values.nome || '').trim(),
    email: String(values.email || '').trim(),
    assunto: `${label} — ${String(values.assunto || '').trim()}`,
    mensagem: [
      `Serviço: ${label}`,
      values.empresa?.trim() ? `Empresa: ${values.empresa.trim()}` : '',
      `Preferência de contato: ${values.preferencia === 'whatsapp' ? 'WhatsApp' : 'E-mail'}`,
      values.preferencia === 'whatsapp' ? `Telefone: ${String(values.telefone || '').trim()}` : '',
      '', 'Descrição:', String(values.mensagem || '').trim(),
    ].filter(line => line !== '').join('\n'),
  };
}
export function validateQualification(values) {
  const errors = validateContact(values);
  if (!knownService(values.servico)) errors.servico = 'Escolha o serviço de interesse.';
  if (!['email', 'whatsapp'].includes(values.preferencia)) errors.preferencia = 'Escolha como prefere receber o contato.';
  const phone = String(values.telefone || '');
  const digits = phone.replace(/\D/g, '');
  if (values.preferencia === 'whatsapp' && (!/^\+?[\d\s().-]{8,32}$/.test(phone) || digits.length < 10 || digits.length > 15)) errors.telefone = 'Informe um telefone com DDD para o WhatsApp.';
  if (typeof values.empresa !== 'string' || values.empresa.length > 180 || headerControls(values.empresa)) errors.empresa = 'Informe a empresa em uma linha com até 180 caracteres.';
  if (String(values.assunto || '').length > 120) errors.assunto = 'Use até 120 caracteres no assunto.';
  if (String(values.mensagem || '').length > 5000) errors.mensagem = 'Use até 5000 caracteres na descrição.';
  if (values.website) errors.website = 'Não foi possível enviar. Use um dos canais diretos de contato.';
  if (!Object.keys(errors).length) {
    const serializedErrors = validateContact(qualifyContact(values));
    Object.assign(errors, serializedErrors);
  }
  return errors;
}
export async function sendContact(values, { fetchImpl = fetch, timeoutMs = CONTACT_TIMEOUT_MS, signal } = {}) {
  const controller = new AbortController();
  let timedOut = false;
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  if (signal?.aborted) controller.abort();
  const timer = setTimeout(() => { timedOut = true; controller.abort(); }, timeoutMs);
  const fail = reason => Object.assign(new Error('Não foi possível confirmar o envio.'), { reason });
  try {
    const response = await fetchImpl(CONTACT_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(['nome', 'email', 'assunto', 'mensagem'].map(field => [field, String(values[field] || '').trim()]))),
      signal: controller.signal,
    });
    if (!response.ok) throw fail('http');
    let result;
    try { result = await response.json(); } catch { throw fail('invalid-response'); }
    if (result?.success !== true) throw fail('negative');
    return true;
  } catch (error) {
    if (timedOut) throw fail('timeout');
    if (error.reason) throw error;
    throw fail('network');
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abort);
  }
}
