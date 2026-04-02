import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { useTheme } from '@/providers/ThemeProvider';

export default function NotFoundScreen(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Screen>
        <Text variant="h1" style={styles.title}>
          Page Not Found
        </Text>
        <Text variant="body" style={styles.message}>
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Link href="/" style={[styles.link, { color: theme.colors.primary }]}>
          Go back to Home
        </Link>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 64,
    marginBottom: 12,
  },
  message: {
    textAlign: 'center',
    marginBottom: 24,
  },
  link: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
