import React from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { Tokens } from '../../theme/tokens';

export interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  radius?: number;
  style?: ViewStyle;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = 16, radius, style }) => {
  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens, radius), [tokens, radius]);
  const opacity = React.useRef(new Animated.Value(0.5)).current;

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.5, duration: 800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return <Animated.View style={[styles.base, { width, height }, style, { opacity }]} />;
};

const makeStyles = (t: Tokens, radius?: number) =>
  StyleSheet.create({
    base: {
      backgroundColor: t.colors.border,
      borderRadius: radius ?? t.radius.sm,
    },
  });

export default Skeleton;
