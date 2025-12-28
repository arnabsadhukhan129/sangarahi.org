// module.exports = {
//   webpack: (config, { isServer }) => {
//     // Modify the webpack config here
//     if (!isServer) {
//       // Add a rule for WebSocket handling, excluding specific files
//       config.module.rules.push({
//         test: /\.js$/,
//         include: /\/_next\/webpack-hmr/,
//         use: 'null-loader',
//       });
//     }

//     // Return the modified config
//     return config;
//   },
// };

// next.config.js
const withTM = require('next-transpile-modules')([
  'react-bootstrap',
  '@restart/ui',
  '@restart/hooks',
  'dom-helpers',
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  // do not set output:'export'
  // do not override webpack
});


