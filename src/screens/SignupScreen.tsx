import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';

import { SignupScreenProps } from '../navigation/types';
import { useTheme } from '../../source/theme/ThemeProvider';
import { Button, Input } from '../../source/components/ui';
import type { Tokens } from '../../source/theme/tokens';

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // TEMP: Bypass signup for testing. Allow empty fields and proceed.
    navigation.replace('Dashboard');
  };

  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens]);

  const emailError = email.length === 0 ? undefined : /.+@.+\..+/.test(email) ? undefined : 'Enter a valid email address';
  const passwordError = password.length === 0 ? undefined : password.length < 6 ? 'Password must be at least 6 characters' : undefined;
  const confirmError = confirmPassword.length === 0 ? undefined : confirmPassword !== password ? "Passwords don't match" : undefined;
  const isSignupDisabled = !email || !password || !confirmPassword || Boolean(emailError) || Boolean(passwordError) || Boolean(confirmError);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={64}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Start your financial journey with DigiFinSense</Text>

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
      <Input
        label="Confirm Password"
        placeholder="••••••••"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        showToggle
        accessibilityLabel="Confirm password"
        errorText={confirmError}
      />

      <Button title="Sign Up" onPress={handleSignup} accessibilityLabel="Sign up" accessibilityHint="Creates your account and opens the dashboard" disabled={isSignupDisabled} />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Pressable
          onPress={() => navigation.navigate('Login')}
          accessibilityRole="button"
          accessibilityLabel="Log in"
          accessibilityHint="Opens the login screen"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.loginLink}>Log In</Text>
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
      height: 50,
      backgroundColor: t.colors.card,
      borderRadius: t.radius.md,
      paddingHorizontal: t.spacing.md,
      color: t.colors.textPrimary,
      fontSize: t.typography.md,
      marginBottom: t.spacing.md,
      borderWidth: 1,
      borderColor: t.colors.border,
    },
    loginContainer: {
      flexDirection: 'row',
      marginTop: t.spacing.lg,
    },
    loginText: {
      color: t.colors.textSecondary,
      fontSize: t.typography.sm,
    },
    loginLink: {
      color: t.colors.primary,
      fontSize: t.typography.sm,
      fontWeight: 'bold',
    },
  });

export default SignupScreen;

