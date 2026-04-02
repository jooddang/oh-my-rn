import { StyleSheet } from 'react-native';

import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { useTheme } from '@/providers/ThemeProvider';

const FEATURES = [
  'Expo SDK 54 + React Native 0.81',
  'TypeScript strict mode',
  'File-based routing (Expo Router)',
  'Zustand state management',
  'Dark/Light theme',
  'Secure storage',
  'Jest testing',
  'Biome linting',
] as const;

export default function HomeScreen(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <Screen scroll padding>
      <Text variant="h1" style={styles.heading}>
        Welcome to oh-my-rn
      </Text>
      <Text variant="body" style={styles.description}>
        A production-ready React Native boilerplate with best practices baked in. Clone, customize,
        and ship your next mobile app faster.
      </Text>
      <Card style={{ marginTop: theme.spacing.md }}>
        <Text variant="h2" style={styles.cardTitle}>
          Included Features
        </Text>
        {FEATURES.map((feature) => (
          <Text key={feature} variant="body" style={styles.featureItem}>
            {`\u2022 ${feature}`}
          </Text>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 12,
  },
  featureItem: {
    marginBottom: 4,
  },
});
