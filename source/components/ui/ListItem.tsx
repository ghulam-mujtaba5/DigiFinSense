import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tokens } from '../../theme/tokens';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityHint?: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, subtitle, right, onPress, style, accessibilityHint }) => {
  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens]);

  const content = (
    <View style={[styles.container, style]}>
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={1} allowFontScaling maxFontSizeMultiplier={2}>{title}</Text>
        {!!subtitle && (
          <Text style={styles.subtitle} numberOfLines={1} allowFontScaling maxFontSizeMultiplier={2}>{subtitle}</Text>
        )}
      </View>
      {!!right && <View style={styles.right}>{right}</View>}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityHint={accessibilityHint}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: t.spacing.md,
      paddingHorizontal: t.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: t.colors.border,
    },
    texts: { flex: 1, paddingRight: t.spacing.md },
    title: { fontSize: t.typography.md, color: t.colors.textPrimary, fontWeight: '600' },
    subtitle: { fontSize: t.typography.sm, color: t.colors.textSecondary, marginTop: 2 },
    right: { marginLeft: t.spacing.md },
  });

export default ListItem;
