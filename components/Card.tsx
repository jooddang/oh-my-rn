import type React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { BORDER_RADIUS } from '@/constants';
import { useTheme } from '@/providers/ThemeProvider';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function Card({ children, style }: CardProps): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          padding: theme.spacing.md,
          borderRadius: BORDER_RADIUS,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
});
