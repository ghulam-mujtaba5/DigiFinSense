import React from 'react';
import { View, Text, StyleSheet, ViewProps, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tokens } from '../../theme/tokens';

export interface ErrorBannerProps extends ViewProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  retryLabel?: string;
  dismissLabel?: string;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onRetry, onDismiss, retryLabel = 'Retry', dismissLabel = 'Dismiss', style, ...rest }) => {
  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens]);
  return (
    <View style={[styles.container, style]} {...rest}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
      {(onRetry || onDismiss) ? (
        <View style={styles.actions}>
          {onDismiss ? (
            <Pressable
              onPress={onDismiss}
              accessibilityRole="button"
              accessibilityLabel="Dismiss error"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.actionText}>{dismissLabel}</Text>
            </Pressable>
          ) : null}
          {onRetry ? (
            <Pressable
              onPress={onRetry}
              accessibilityRole="button"
              accessibilityLabel="Retry"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={{ marginLeft: onDismiss ? 16 : 0 }}
            >
              <Text style={styles.actionText}>{retryLabel}</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    container: {
      backgroundColor: t.colors.card,
      borderLeftWidth: 4,
      borderLeftColor: t.colors.danger,
      paddingVertical: t.spacing.md,
      paddingHorizontal: t.spacing.lg,
      borderRadius: t.radius.md,
    },
    title: {
      color: t.colors.textPrimary,
      fontWeight: '700',
      marginBottom: 4,
    },
    message: {
      color: t.colors.textSecondary,
    },
    actions: {
      marginTop: t.spacing.sm,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    actionText: {
      color: t.colors.primary,
      fontWeight: '600',
    },
  });

export default ErrorBanner;
