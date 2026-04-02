import type React from 'react';
import { Text as RNText, StyleSheet, type TextStyle } from 'react-native';

import { useTheme } from '@/providers/ThemeProvider';

type TextVariant = 'h1' | 'h2' | 'body' | 'caption';

type TextProps = {
  variant?: TextVariant;
  children: React.ReactNode;
  style?: TextStyle;
};

export function Text({ variant = 'body', children, style }: TextProps): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <RNText style={[styles.base, theme.typography[variant], { color: theme.colors.text }, style]}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {},
});
