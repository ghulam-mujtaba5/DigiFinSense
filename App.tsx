

// import React from 'react';
// import {SafeAreaView, StatusBar, StyleSheet, useColorScheme} from 'react-native';
// import SignupScreen from './src/screens/SignupScreen'; // Import SignupScreen

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? '#333333' : '#F5F5F5',
//     flex: 1,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       {/* Render SignupScreen */}
//       <SignupScreen />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default App;


import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AuthScreen from './src/screens/AuthScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AuthScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
