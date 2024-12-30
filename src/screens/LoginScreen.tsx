import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import { supabase } from '../utils/supabaseClient';

type Provider = 'google' | 'facebook'; // Define allowed providers

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const handleLogin = async (provider: Provider) => {  // Use the Provider type
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      Alert.alert('Login Error', error.message);  // Use Alert.alert() here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Button title="Login with Google" onPress={() => handleLogin('google')} />
      <Button title="Login with Facebook" onPress={() => handleLogin('facebook')} />
      <Button
        title="Don't have an account? Signup"
        onPress={() => navigation.navigate('Signup')}
        style={styles.secondaryButton}
        textStyle={styles.secondaryText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  secondaryText: {
    color: '#4CAF50',
  },
});

export default LoginScreen;
