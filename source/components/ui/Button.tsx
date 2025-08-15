import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tokens } from '../../theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens]);

  const containerStyles = [
    styles.base,
    styles[`size_${size}` as const],
    styles[`variant_${variant}` as const],
    disabled && styles.disabled,
    style,
  ];
  const labelStyles = [
    styles.label,
    styles[`label_${variant}` as const],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      activeOpacity={0.8}
    >
      <Text style={labelStyles} allowFontScaling maxFontSizeMultiplier={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    base: {
      borderRadius: t.radius.md,
      paddingVertical: t.spacing.sm,
      paddingHorizontal: t.spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    size_sm: { paddingVertical: t.spacing.xs, paddingHorizontal: t.spacing.md },
    size_md: { paddingVertical: t.spacing.sm, paddingHorizontal: t.spacing.lg },
    size_lg: { paddingVertical: t.spacing.md, paddingHorizontal: t.spacing.xl },

    variant_primary: { backgroundColor: t.colors.primary, elevation: t.elevation.card },
    variant_secondary: { backgroundColor: t.colors.secondary, elevation: t.elevation.card },
    variant_ghost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: t.colors.border },

    disabled: { opacity: 0.6 },

    label: { fontSize: t.typography.md, fontWeight: '600' },
    // Ensure contrast on colored buttons
    label_primary: { color: '#FFFFFF' },
    label_secondary: { color: '#FFFFFF' },
    label_ghost: { color: t.colors.textPrimary },
  });

export default Button;
