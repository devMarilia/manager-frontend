/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        green: '#10b981',
        red: '#ef4444',
        blue: '#0ea5e9',
      },
    },
  },
  plugins: [],
}

