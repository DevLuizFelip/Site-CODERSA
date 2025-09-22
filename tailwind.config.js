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
        "primary": "#138aec",
        "background-light": "#f6f7f8",
        "background-dark": "#101a22",
        "text-light": "#182733",
        "text-muted": "#475f70",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Necessário para estilizar formulários
  ],
}