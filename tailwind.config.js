const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");

export default withMT({
  darkMode: "class",
  content: [
    flowbite.content(),
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#123D82",
      secondary: "#092A5D",
      tertiary: "#4A79CA",
      pertiary: "#9AB3E3",
      certiary: "#212121",
      sertiary: "#f3f3f3",
    },
    extend: {},
  },
  plugins: [flowbite.plugin()],
});
