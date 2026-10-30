export const CONTACT_TIMEOUT_MS = 15000;
export const CONTACT_ENDPOINT = import.meta.env?.VITE_CONTACT_ENDPOINT || 'https://codersa-backend.onrender.com/send-email';
export function validateContact(values) {
  const errors = {};
  for (const [field, label] of Object.entries({ nome: 'seu nome', email: 'seu e-mail', assunto: 'o assunto', mensagem: 'a descrição do processo ou solicitação' })) {
    if (!String(values[field] || '').trim()) errors[field] = `Informe ${label}.`;
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Informe um e-mail válido.';
  return errors;
}
export async function sendContact(values, { fetchImpl = fetch, timeoutMs = CONTACT_TIMEOUT_MS, signal } = {}) {
  const controller = new AbortController();
  let timedOut = false;
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
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
