const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);


// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {
//   resolver: {
//     // Ensure that the svg files are handled by react-native-svg-transformer
//     assetExts: [
//       'png',
//       'jpg',
//       'jpeg',
//       'bmp',
//       'gif',
//       'webp',
//       'svg', // Add svg to asset extensions
//     ],
//     sourceExts: ['js', 'jsx', 'ts', 'tsx', 'svg'], // Ensure that .svg files are treated as source files
//   },
// };

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
