// /** @type {import('postcss-load-config').Config} */
// const config = {
//   plugins: {
//     '@tailwindcss/postcss': {},
//   },
// }

// export default config
// postcss.config.mjs
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss,
    autoprefixer,
  },
};

export default config;
