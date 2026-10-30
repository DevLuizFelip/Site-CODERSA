try {
  const stored = localStorage.getItem('theme');
  const dark = stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
} catch { /* The default light theme remains usable without storage. */ }
