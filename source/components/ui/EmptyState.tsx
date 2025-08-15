import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tokens } from '../../theme/tokens';

export interface EmptyStateProps {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle, style }) => {
  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens]);
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    container: { alignItems: 'center' },
    title: { fontSize: t.typography.lg, color: t.colors.textPrimary, fontWeight: '600' },
    subtitle: { fontSize: t.typography.sm, color: t.colors.textSecondary, marginTop: 4, textAlign: 'center' },
  });

export default EmptyState;
