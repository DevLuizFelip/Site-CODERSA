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
        "background-dark": "var(--surface-color)", // Ajuste semântico
        "surface": "var(--surface-color)",
        "text-main": "var(--text-color)",
        "text-muted": "var(--text-muted-color)",
        "border": "var(--border-color)",
      },
      fontFamily: {
        "sans": ["Montserrat", "sans-serif"],
        "serif": ["Playfair Display", "serif"],
        "display": ["Playfair Display", "serif"]
      },
      letterSpacing: {
        widest: '.25em', // Para o subtítulo "ENGENHARIA DE..."
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Necessário para estilizar formulários
  ],
}