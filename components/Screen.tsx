import type React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/providers/ThemeProvider';

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  padding?: boolean;
};

export function Screen({
  children,
  scroll = false,
  padding = true,
}: ScreenProps): React.JSX.Element {
  const { theme } = useTheme();

  const containerStyle = [
    styles.container,
    { backgroundColor: theme.colors.background },
    padding && { paddingHorizontal: theme.spacing.md },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      {scroll ? (
        <ScrollView style={styles.scrollView} contentContainerStyle={containerStyle}>
          {children}
        </ScrollView>
      ) : (
        <View style={containerStyle}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
