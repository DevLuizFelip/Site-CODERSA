import { knownService } from './content.js';
const allowedEvents = new Set(['process_mapping_click', 'blueprint_cta_click', 'contact_submit_success', 'contact_submit_error']);
const allowedRoutes = new Set(['/', '/servicos', '/servicos/blueprint', '/processo', '/portfolio', '/sobre', '/contato']);
const allowedSources = new Set(['hero', 'header', 'footer', 'section', 'solutions', 'contact-form']);
let adapter = null;
export function configureAnalytics(nextAdapter) { adapter = typeof nextAdapter === 'function' ? nextAdapter : null; }
export function trackEvent(name, details = {}) {
  if (typeof window === 'undefined' || !allowedEvents.has(name)) return;
  const payload = { name, route: allowedRoutes.has(details.route) ? details.route : '/', source: allowedSources.has(details.source) ? details.source : 'section' };
  if (knownService(details.service)) payload.service = details.service;
  if (name === 'contact_submit_error') payload.reason = ['http', 'negative', 'network', 'timeout', 'invalid-response'].includes(details.reason) ? details.reason : 'network';
  window.dispatchEvent(new CustomEvent('codersa:analytics', { detail: payload }));
  try { adapter?.(payload); } catch { /* Telemetry must not break the journey. */ }
}
