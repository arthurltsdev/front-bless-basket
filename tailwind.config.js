/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.jsx'],
  theme: {
    extend: {
      backgroundColor: {
        'custom': 'rgba(0, 44, 43, 1)',
        'custom2': 'rgba(0, 100, 100, 1)'// Adicione sua cor personalizada aqui
      },
    },
  },
  plugins: [],
}
