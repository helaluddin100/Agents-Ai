/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#6849f8",
        secondary: "#9150ff",
        primaryLight: "#cec5f9",
        light: "#6b6d85",
        blank: "#edf3f7",
      },
      screens: {
        "cut-off": "1060px",
        "hero-cut-off": "1230px",
        "7xl": "1300px",
        1250: "1250px",
        760: "760px",
        850: "850px",
        885: "885px",
      },
      backgroundImage: {
        register:
          "url(https://engineeringx.org:8443/uploads/register_bg_b9d6eacc07.png)",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
