/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '0px 2px 16px 44px rgba(0, 0, 0, 0.26) inset',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-to-45':
          'linear-gradient(55deg, rgba(0, 255, 0, 0), gray, rgba(0, 255, 0, 0))',
      },
    },
  },
  plugins: [],
}
