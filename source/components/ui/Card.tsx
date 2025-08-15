import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tokens } from '../../theme/tokens';

export interface CardProps extends ViewProps {
  padded?: boolean;
}

const Card: React.FC<CardProps> = ({ style, children, padded = true, ...rest }) => {
  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens]);
  return (
    <View style={[styles.container, padded && styles.padded, style]} {...rest}>
      {children}
    </View>
  );
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    container: {
      backgroundColor: t.colors.card,
      borderRadius: t.radius.lg,
      elevation: t.elevation.card,
    },
    padded: {
      padding: t.spacing.lg,
    },
  });

export default Card;
