

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
import Icon from 'react-native-vector-icons/Feather'; // You can use Feather icons for the eye icon

const AuthScreen = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const fadeAnim = useState(new Animated.Value(0))[0];

  // Validate Email Format
  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  // Handle Authentication (Login/Signup)
  const handleAuth = async () => {
    setEmailError('');
    setPasswordError('');

    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      let response;

      if (isLogin) {
        // Login user
        response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      } else {
        // Signup user
        response = await supabase.auth.signUp({
          email,
          password,
        });

        if (response.error) throw response.error;

        // After successful signup, trigger email verification
        Alert.alert(
          'Check Your Email',
          'Please check your inbox for a verification email to confirm your account.'
        );
      }

      if (response.error) throw response.error;

      // Handle success
      Alert.alert(
        'Success',
        isLogin
          ? 'Logged in successfully!'
          : 'Signup successful! Please check your email to verify your account.'
      );

      if (!isLogin) {
        setEmail('');
        setPassword('');
      }
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

  // Handle OAuth (Google/Facebook/Apple)
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

  // Animation for button fade-in
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
        textContentType="emailAddress"
        placeholderTextColor="#888"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : {}]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          textContentType="password"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <Animated.View style={[styles.button, { opacity: fadeAnim }]}>
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
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: '#007BFF',
    fontSize: 14,
  },
  orText: {
    fontSize: 16,
    marginTop: 20,
    color: '#333',
  },
  oauthContainer: {
    flexDirection: 'row',
    marginTop: 10,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default AuthScreen;
