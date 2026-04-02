import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { APP_NAME } from '@/constants';
import { useTheme } from '@/providers/ThemeProvider';
import { useSettingsStore } from '@/stores/settingsStore';

const THEME_OPTIONS = ['light', 'dark', 'system'] as const;

export default function SettingsScreen(): React.JSX.Element {
  const { theme } = useTheme();
  const colorScheme = useSettingsStore((s) => s.colorScheme);
  const setColorScheme = useSettingsStore((s) => s.setColorScheme);

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <Screen scroll padding>
      <Text variant="h1" style={styles.heading}>
        Settings
      </Text>

      <Card style={{ marginBottom: theme.spacing.md }}>
        <Text variant="h2" style={styles.sectionTitle}>
          Appearance
        </Text>
        <Text variant="body" style={styles.currentTheme}>
          Current theme: {colorScheme}
        </Text>
        <View style={styles.buttonRow}>
          {THEME_OPTIONS.map((option) => (
            <View key={option} style={styles.buttonWrapper}>
              <Button
                title={option.charAt(0).toUpperCase() + option.slice(1)}
                onPress={() => setColorScheme(option)}
                variant={colorScheme === option ? 'primary' : 'outline'}
              />
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <Text variant="h2" style={styles.sectionTitle}>
          About
        </Text>
        <Text variant="body" style={styles.aboutItem}>
          {APP_NAME}
        </Text>
        <Text variant="body" style={styles.aboutItem}>
          Version {appVersion}
        </Text>
        <Text variant="caption" style={styles.footer}>
          Built with Expo SDK 54
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  currentTheme: {
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonWrapper: {
    flex: 1,
  },
  aboutItem: {
    marginBottom: 4,
  },
  footer: {
    marginTop: 8,
  },
});
