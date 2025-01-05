
//App.tsx

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



