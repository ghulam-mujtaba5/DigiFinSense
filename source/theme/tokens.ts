// Design tokens for DigiFinSense (2025)

export type ColorTokens = {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  surface: string;
  card: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  fab: string;
};

export type SpacingTokens = {
  xxs: number; // 4
  xs: number;  // 8
  sm: number;  // 12
  md: number;  // 16
  lg: number;  // 20
  xl: number;  // 24
  xxl: number; // 32
};

export type TypographyTokens = {
  xs: number; // 12
  sm: number; // 14
  md: number; // 16
  lg: number; // 20
  xl: number; // 24
  xxl: number; // 32
};

export type RadiusTokens = {
  sm: number; // 6
  md: number; // 10
  lg: number; // 16
  pill: number; // 999
};

export type ElevationTokens = {
  card: number;
  fab: number;
};

export type Tokens = {
  colors: ColorTokens;
  spacing: SpacingTokens;
  typography: TypographyTokens;
  radius: RadiusTokens;
  elevation: ElevationTokens;
};

export const spacing: SpacingTokens = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const typography: TypographyTokens = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const radius: RadiusTokens = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
};

export const elevation: ElevationTokens = {
  card: 2,
  fab: 8,
};

export const lightColors: ColorTokens = {
  primary: '#007BFF',
  secondary: '#6200EE',
  success: '#4CAF50',
  danger: '#FF5252',
  warning: '#FFC107',
  surface: '#FFFFFF',
  card: '#F7F7F7',
  border: '#E1E1E1',
  textPrimary: '#121212',
  textSecondary: '#4F4F4F',
  fab: '#007BFF',
};

export const darkColors: ColorTokens = {
  primary: '#007BFF',
  secondary: '#6200EE',
  success: '#4CAF50',
  danger: '#FF5252',
  warning: '#FFC107',
  surface: '#121212',
  card: '#1E1E1E',
  border: '#333333',
  textPrimary: '#FFFFFF',
  textSecondary: '#A9A9A9',
  fab: '#007BFF',
};

export const makeTokens = (mode: 'light' | 'dark'): Tokens => ({
  colors: mode === 'light' ? lightColors : darkColors,
  spacing,
  typography,
  radius,
  elevation,
});
