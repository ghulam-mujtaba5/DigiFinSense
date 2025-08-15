// /**
//  * @format
//  */
// //index.js
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


// Import required shims at the top of index.js
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
