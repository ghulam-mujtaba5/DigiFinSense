import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Image,
} from 'react-native';

import { supabase } from '../services/supabaseClient';

const AuthScreen = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleAuth = async () => {
    // Authentication logic
  };

  const handleOAuth = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Text>

      <TextInput
        style={[styles.input, emailError ? styles.inputError : {}]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#B0B0B0"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={[styles.input, passwordError ? styles.inputError : {}]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        placeholderTextColor="#B0B0B0"
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity
        style={styles.showPasswordButton}
        onPress={() => setShowPassword((prev) => !prev)}
      >
        <Text style={styles.showPasswordText}>
          {showPassword ? 'Hide' : 'Show'} Password
        </Text>
      </TouchableOpacity>

      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Signup'}</Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        onPress={() => setIsLogin(!isLogin)}
        style={styles.linkButton}
      >
        <Text style={styles.linkText}>
          {isLogin ? 'Don’t have an account? Signup' : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or sign in with</Text>
      <View style={styles.oauthContainer}>
        {/* Google Button */}
        <TouchableOpacity
          style={[styles.oauthButton, { backgroundColor: '#FFFFFF', borderColor: '#E0E0E0', borderWidth: 1 }]}
          onPress={() => handleOAuth('google')}
        >
          <Image
            source={require('../assets/Google.png')}
            style={styles.oauthIcon}
          />
          <Text style={[styles.oauthText, { color: '#000' }]}>Google</Text>
        </TouchableOpacity>

        {/* Facebook Button */}
        <TouchableOpacity
          style={[styles.oauthButton, { backgroundColor: '#1877F2' }]}
          onPress={() => handleOAuth('facebook')}
        >
          <Image
            source={require('../assets/Facebook.png')}
            style={styles.oauthIcon}
          />
          <Text style={styles.oauthText}>Facebook</Text>
        </TouchableOpacity>

        {/* Apple Button */}
        <TouchableOpacity
          style={[styles.oauthButton, { backgroundColor: '#FFFFFF', borderColor: '#E0E0E0', borderWidth: 1 }]}
          onPress={() => handleOAuth('apple')}
        >
          <Image
            source={require('../assets/Apple.png')}
            style={styles.oauthIcon}
          />
          <Text style={[styles.oauthText, { color: '#000' }]}>Apple</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#FF0000',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#B0B0B0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: '#007BFF',
    fontSize: 14,
  },
  orText: {
    fontSize: 16,
    marginVertical: 20,
    color: '#555',
  },
  oauthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  oauthButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 8,
    flexDirection: 'row',
  },
  oauthIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  oauthText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AuthScreen;
