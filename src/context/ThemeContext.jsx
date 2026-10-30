import { useEffect, useSyncExternalStore } from 'react';
let temporaryTheme = null;
function currentTheme() {
  if (typeof window === 'undefined') return 'light';
  if (temporaryTheme) return temporaryTheme;
  try { const stored = localStorage.getItem('theme'); if (stored === 'dark' || stored === 'light') return stored; } catch { /* Optional storage. */ }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function applyTheme() {
  const dark = currentTheme() === 'dark';
  document.documentElement.classList.toggle('dark', dark);
  document.body.classList.toggle('dark', dark);
}
function subscribe(callback) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const update = () => { applyTheme(); callback(); };
  window.addEventListener('codersa:theme', update);
  window.addEventListener('storage', update);
  media.addEventListener('change', update);
  return () => { window.removeEventListener('codersa:theme', update); window.removeEventListener('storage', update); media.removeEventListener('change', update); };
}
export function ThemeProvider({ children }) {
  useEffect(() => { applyTheme(); return subscribe(() => {}); }, []);
  return children;
}
// Each consumer uses the server snapshot during its own hydration.
// eslint-disable-next-line react-refresh/only-export-components -- Shared theme hook preserves the existing consumer API.
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => 'light');
  return { theme, toggleTheme: () => {
    const next = currentTheme() === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', next); temporaryTheme = null; } catch { temporaryTheme = next; }
    window.dispatchEvent(new Event('codersa:theme'));
  } };
}
