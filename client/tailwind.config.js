/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


// module.exports = {
//   content: [
//     ...,
//     'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
//   ],
//   plugins: [..., require('flowbite/plugin')],
//   ...
// };