import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';

import { LoginScreenProps } from '../navigation/types';
import { useTheme } from '../../source/theme/ThemeProvider';
import { Button, Input } from '../../source/components/ui';
import type { Tokens } from '../../source/theme/tokens';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TEMP: Bypass auth for testing. Allow empty credentials and proceed.
    navigation.replace('Dashboard');
  };

  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens]);

  const emailError = email.length === 0 ? undefined : /.+@.+\..+/.test(email) ? undefined : 'Enter a valid email address';
  const passwordError = password.length === 0 ? undefined : password.length < 6 ? 'Password must be at least 6 characters' : undefined;
  // In development, keep the button enabled for quick navigation/testing
  const isLoginDisabled = __DEV__ ? false : (!email || !password || Boolean(emailError) || Boolean(passwordError));

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={64}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue to DigiFinSense{__DEV__ ? ' (dev mode: any credentials allowed)' : ''}</Text>

      <Input
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Email address"
        errorText={emailError}
      />
      <Input
        label="Password"
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        showToggle
        accessibilityLabel="Password"
        errorText={passwordError}
      />

      <Button title="Log In" onPress={handleLogin} accessibilityLabel="Log in" accessibilityHint="Navigates to your dashboard" disabled={isLoginDisabled} />

      {/* TEMP: Debug navigation to Supabase status screen */}
      <View style={styles.debugButtonWrap}>
        <Button
          title="Debug Supabase"
          variant="secondary"
          onPress={() => navigation.navigate('DebugSupabase')}
          accessibilityLabel="Open Supabase debug screen"
        />
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Pressable
          onPress={() => navigation.navigate('Signup')}
          accessibilityRole="button"
          accessibilityLabel="Sign up"
          accessibilityHint="Opens the account creation screen"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.signupLink}>Sign Up</Text>
        </Pressable>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.surface,
    },
    content: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: t.spacing.lg,
    },
    title: {
      fontSize: t.typography.xxl,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
      marginBottom: t.spacing.xs,
    },
    subtitle: {
      fontSize: t.typography.sm,
      color: t.colors.textSecondary,
      marginBottom: t.spacing.xl,
    },
    input: {
      width: '100%',
    },
    debugButtonWrap: {
      width: '100%',
      marginTop: t.spacing.sm,
    },
    signupContainer: {
      flexDirection: 'row',
      marginTop: t.spacing.lg,
    },
    signupText: {
      color: t.colors.textSecondary,
      fontSize: t.typography.sm,
    },
    signupLink: {
      color: t.colors.primary,
      fontSize: t.typography.sm,
      fontWeight: 'bold',
    },
  });

export default LoginScreen;
