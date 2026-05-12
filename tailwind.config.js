export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cocoa: '#3b1f0b',
        caramel: '#d9b68e',
        cream: '#f7ede1',
        gold: '#d1a15b',
        espresso: '#1e0f05',
      },
      boxShadow: {
        premium: '0 25px 80px rgba(15, 13, 10, 0.18)',
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(180deg, rgba(59,31,11,0.72), rgba(20,10,6,0.92)), url('/images/hero-banner.jpg')",
      },
    },
  },
  plugins: [],
};
