/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 8px 32px -12px rgba(15, 23, 42, 0.16)",
        lift: "0 18px 40px -16px rgba(79, 70, 229, 0.32)"
      },
      backgroundImage: {
        "soft-grid":
          "radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.08) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

