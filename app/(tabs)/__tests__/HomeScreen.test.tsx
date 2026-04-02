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
  it('renders without crashing', () => {
    renderWithTheme(<HomeScreen />);
    expect(screen.getByText('Welcome to oh-my-rn')).toBeTruthy();
  });

  it('displays the welcome heading', () => {
    renderWithTheme(<HomeScreen />);
    expect(screen.getByText('Welcome to oh-my-rn')).toBeTruthy();
  });

  it('displays the boilerplate description', () => {
    renderWithTheme(<HomeScreen />);
    expect(screen.getByText(/production-ready React Native boilerplate/)).toBeTruthy();
  });

  it('displays the feature list card with all features', () => {
    renderWithTheme(<HomeScreen />);
    expect(screen.getByText('Included Features')).toBeTruthy();
    expect(screen.getByText(/Expo SDK 54/)).toBeTruthy();
    expect(screen.getByText(/TypeScript strict mode/)).toBeTruthy();
    expect(screen.getByText(/File-based routing/)).toBeTruthy();
    expect(screen.getByText(/Zustand state management/)).toBeTruthy();
    expect(screen.getByText(/Dark\/Light theme/)).toBeTruthy();
    expect(screen.getByText(/Secure storage/)).toBeTruthy();
    expect(screen.getByText(/Jest testing/)).toBeTruthy();
    expect(screen.getByText(/Biome linting/)).toBeTruthy();
  });

  it('renders feature items with bullet prefix', () => {
    renderWithTheme(<HomeScreen />);
    expect(screen.getByText('\u2022 Expo SDK 54 + React Native 0.81')).toBeTruthy();
  });

  it('renders correctly in light mode', () => {
    renderWithTheme(<HomeScreen />, 'light');
    expect(screen.getByText('Welcome to oh-my-rn')).toBeTruthy();
  });

  it('renders correctly in dark mode', () => {
    renderWithTheme(<HomeScreen />, 'dark');
    expect(screen.getByText('Welcome to oh-my-rn')).toBeTruthy();
  });
});
