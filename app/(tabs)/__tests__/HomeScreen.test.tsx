import { render, screen } from '@testing-library/react-native';
import type React from 'react';

import HomeScreen from '@/app/(tabs)/index';
import { ThemeProvider } from '@/providers/ThemeProvider';

// Mock react-native-safe-area-context used by Screen
jest.mock('react-native-safe-area-context', () => {
  const RN = require('react-native');
  return {
    // biome-ignore lint/suspicious/noExplicitAny: jest.mock factory cannot use external type refs
    SafeAreaView: (props: any) => <RN.View {...props} />,
  };
});

function renderWithTheme(ui: React.ReactElement, colorSchemeMode?: 'light' | 'dark') {
  return render(<ThemeProvider colorSchemeMode={colorSchemeMode ?? 'light'}>{ui}</ThemeProvider>);
}

describe('HomeScreen', () => {
  it('renders without crashing', async () => {
    await renderWithTheme(<HomeScreen />);
    expect(screen.getByText('Welcome to oh-my-rn')).toBeTruthy();
  });

  it('displays the welcome heading', async () => {
    await renderWithTheme(<HomeScreen />);
    expect(screen.getByText('Welcome to oh-my-rn')).toBeTruthy();
  });

  it('displays the boilerplate description', async () => {
    await renderWithTheme(<HomeScreen />);
    expect(screen.getByText(/production-ready React Native boilerplate/)).toBeTruthy();
  });

  it('displays the feature list card with all features', async () => {
    await renderWithTheme(<HomeScreen />);
    expect(screen.getByText('Included Features')).toBeTruthy();
    expect(screen.getByText(/Expo SDK 57/)).toBeTruthy();
    expect(screen.getByText(/TypeScript strict mode/)).toBeTruthy();
    expect(screen.getByText(/File-based routing/)).toBeTruthy();
    expect(screen.getByText(/Zustand state management/)).toBeTruthy();
    expect(screen.getByText(/Dark\/Light theme/)).toBeTruthy();
    expect(screen.getByText(/Secure storage/)).toBeTruthy();
    expect(screen.getByText(/Jest testing/)).toBeTruthy();
    expect(screen.getByText(/Biome linting/)).toBeTruthy();
  });

  it('renders feature items with bullet prefix', async () => {
    await renderWithTheme(<HomeScreen />);
    expect(screen.getByText('\u2022 Expo SDK 57 + React Native 0.86')).toBeTruthy();
  });

  it('renders correctly in light mode', async () => {
    await renderWithTheme(<HomeScreen />, 'light');
    expect(screen.getByText('Welcome to oh-my-rn')).toBeTruthy();
  });

  it('renders correctly in dark mode', async () => {
    await renderWithTheme(<HomeScreen />, 'dark');
    expect(screen.getByText('Welcome to oh-my-rn')).toBeTruthy();
  });
});
