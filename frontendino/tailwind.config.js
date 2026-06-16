/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        meadow: {
          50: '#fbffe8',
          100: '#eef8be',
          200: '#d9ec81',
          300: '#bee04b',
          400: '#9fcc26',
          500: '#7eaa17',
          600: '#5f8410',
          700: '#4d6811',
          800: '#405314',
          900: '#374715',
        },
        bedtime: {
          900: '#293253',
          950: '#171b32',
        },
        clay: '#b66f3f',
        butter: '#ffe07b',
      },
      fontFamily: {
        display: ['"Trebuchet MS"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        storybook: '0 24px 80px rgba(41, 50, 83, 0.18)',
      },
    },
  },
  plugins: [],
};
