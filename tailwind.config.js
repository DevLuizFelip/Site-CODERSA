import forms from '@tailwindcss/forms';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Opcional, mas seu HTML tinha isso
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary-color)",
        "primary-hover": "var(--primary-hover-color)",
        "background-light": "var(--background-color)",
        "background": "var(--background-color)",
        "text": "var(--text-color)",
        "background-dark": "var(--surface-color)", // Ajuste semântico
        "surface": "var(--surface-color)",
        "text-main": "var(--text-color)",
        "text-muted": "var(--text-muted-color)",
        "border": "var(--border-color)",
      },
      fontFamily: {
        "sans": ["Manrope", "sans-serif"],
        "serif": ["Source Serif 4", "serif"],
        "display": ["Source Serif 4", "serif"]
      },
      letterSpacing: {
        widest: '.25em', // Para o subtítulo "ENGENHARIA DE..."
      }
    },
  },
  plugins: [
    forms,
  ],
}
