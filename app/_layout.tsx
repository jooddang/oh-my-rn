import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';
import { useSettingsStore } from '@/stores/settingsStore';

SplashScreen.preventAutoHideAsync();

function ThemedStatusBar(): React.JSX.Element {
  const { colorScheme } = useTheme();
  return <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />;
}

export default function RootLayout(): React.JSX.Element {
  const colorScheme = useSettingsStore((s) => s.colorScheme);
  const setColorScheme = useSettingsStore((s) => s.setColorScheme);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider colorSchemeMode={colorScheme} onColorSchemeModeChange={setColorScheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <ThemedStatusBar />
    </ThemeProvider>
  );
}
