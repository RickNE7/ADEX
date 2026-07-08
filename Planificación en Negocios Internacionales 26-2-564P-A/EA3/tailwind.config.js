/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B132B",
        ink: "#0C0C0C",
        gold: "#D4AF37",
        "gold-soft": "#E7C66B",
        cream: "#F5F5F0",
        soft: "#D7E2EA",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
