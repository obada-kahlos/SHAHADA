/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "main-color": "#ff8700",
        firstDarkBgColor: "#1B1C1E",
        secondDarkBgColor: "#1B1C1E",
        titleDarkColor: "#F7F7F7",
        paragraphDarkColor: "#cecece",
        sidebarLightBgColor: "#fff",
        whiteLightBgColor: "#fff",
        titleLightColor: "#1B1C1E",
        paragraphLightColor: "#666666",
        error: "#d44040",
      },
    },
  },
  plugins: [],
};
