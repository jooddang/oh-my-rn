import type { TextStyle } from 'react-native';

export type ColorSchemeMode = 'light' | 'dark' | 'system';

export type ThemeColors = {
  background: string;
  text: string;
  card: string;
  border: string;
  primary: string;
  secondary: string;
};

export type ThemeSpacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type ThemeTypography = {
  h1: TextStyle;
  h2: TextStyle;
  body: TextStyle;
  caption: TextStyle;
};

export type Theme = {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
};

const spacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const typography: ThemeTypography = {
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
};

export const lightTheme: Theme = {
  colors: {
    background: '#FFFFFF',
    text: '#000000',
    card: '#F5F5F5',
    border: '#E0E0E0',
    primary: '#007AFF',
    secondary: '#5856D6',
  },
  spacing,
  typography,
};

export const darkTheme: Theme = {
  colors: {
    background: '#121212',
    text: '#FFFFFF',
    card: '#1E1E1E',
    border: '#333333',
    primary: '#007AFF',
    secondary: '#5856D6',
  },
  spacing,
  typography,
};
