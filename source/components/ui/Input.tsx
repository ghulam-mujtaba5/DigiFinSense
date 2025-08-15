import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tokens } from '../../theme/tokens';

export type InputProps = TextInputProps & {
  label?: string;
  helperText?: string;
  errorText?: string;
  showToggle?: boolean; // only applicable when secureTextEntry is true
};

const Input: React.FC<InputProps> = ({ label, helperText, errorText, style, showToggle, secureTextEntry, ...rest }) => {
  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens]);
  const hasError = Boolean(errorText);
  const [isSecure, setIsSecure] = React.useState<boolean>(!!secureTextEntry);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label} allowFontScaling maxFontSizeMultiplier={2}>{label}</Text> : null}
      <View style={styles.inputWrap}>
        <TextInput
          style={[styles.input, hasError && styles.inputError, style]}
          placeholderTextColor={tokens.colors.textSecondary}
          secureTextEntry={isSecure}
          allowFontScaling
          maxFontSizeMultiplier={2}
          {...rest}
        />
        {secureTextEntry && showToggle ? (
          <Pressable
            onPress={() => setIsSecure((s) => !s)}
            accessibilityRole="button"
            accessibilityLabel={isSecure ? 'Show password' : 'Hide password'}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.suffix}
          >
            <Text style={styles.toggleText} allowFontScaling maxFontSizeMultiplier={2}>{isSecure ? 'Show' : 'Hide'}</Text>
          </Pressable>
        ) : null}
      </View>
      {hasError ? (
        <Text style={styles.errorText} accessibilityLiveRegion="polite" allowFontScaling maxFontSizeMultiplier={2}>
          {errorText}
        </Text>
      ) : helperText ? (
        <Text style={styles.helperText} allowFontScaling maxFontSizeMultiplier={2}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: t.spacing.md,
    },
    label: {
      color: t.colors.textSecondary,
      fontSize: t.typography.xs,
      marginBottom: t.spacing.xs,
    },
    inputWrap: {
      position: 'relative',
      justifyContent: 'center',
    },
    input: {
      width: '100%',
      backgroundColor: t.colors.card,
      color: t.colors.textPrimary,
      paddingHorizontal: t.spacing.md,
      paddingVertical: t.spacing.md,
      borderRadius: t.radius.md,
      fontSize: t.typography.md,
      borderWidth: 1,
      borderColor: t.colors.border,
    },
    inputError: {
      borderColor: t.colors.danger,
    },
    suffix: {
      position: 'absolute',
      right: t.spacing.md,
      paddingVertical: t.spacing.xs,
      paddingHorizontal: t.spacing.xs,
    },
    toggleText: {
      color: t.colors.primary,
      fontSize: t.typography.sm,
      fontWeight: '600',
    },
    helperText: {
      marginTop: t.spacing.xs,
      color: t.colors.textSecondary,
      fontSize: t.typography.xs,
    },
    errorText: {
      marginTop: t.spacing.xs,
      color: t.colors.danger,
      fontSize: t.typography.xs,
    },
  });

export default Input;
