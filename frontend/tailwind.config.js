/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        glow: 'glow 3s ease-in-out infinite',
        glowslo: 'glowslo 26s linear infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

      
      },
      
      keyframes: {
      

        glow: {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(154, 211, 242, 0.2), 0 0 20px rgba(154, 211, 242, 0.1), 0 0 30px rgba(154, 211, 242, 0.05)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(154, 211, 242, 0.7), 0 0 60px rgba(154, 211, 242, 0.5), 0 0 90px rgba(154, 211, 242, 0.3)'
          },
        },
       
        
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      
    },
  },
  
  

  plugins: [require("tailwindcss-animate")],
}