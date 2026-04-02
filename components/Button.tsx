import type React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { BORDER_RADIUS } from '@/constants';
import { useTheme } from '@/providers/ThemeProvider';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
}: ButtonProps): React.JSX.Element {
  const { theme } = useTheme();

  const backgroundColor =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'secondary'
        ? theme.colors.secondary
        : 'transparent';

  const textColor = variant === 'outline' ? theme.colors.primary : '#FFFFFF';

  const borderStyle =
    variant === 'outline' ? { borderWidth: 1, borderColor: theme.colors.primary } : undefined;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        { backgroundColor, borderRadius: BORDER_RADIUS },
        borderStyle,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
