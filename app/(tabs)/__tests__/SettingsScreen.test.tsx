import { fireEvent, render, screen } from '@testing-library/react-native';
import type React from 'react';

import SettingsScreen from '@/app/(tabs)/settings';
import { ThemeProvider } from '@/providers/ThemeProvider';

// Mock react-native-safe-area-context used by Screen
jest.mock('react-native-safe-area-context', () => {
  const RN = require('react-native');
  return {
    // biome-ignore lint/suspicious/noExplicitAny: jest.mock factory cannot use external type refs
    SafeAreaView: (props: any) => <RN.View {...props} />,
  };
});

// Mock expo-constants
jest.mock('expo-constants', () => ({
  expoConfig: { version: '1.0.0' },
}));

const mockSetColorScheme = jest.fn();
jest.mock('@/stores/settingsStore', () => ({
  useSettingsStore: (
    selector: (s: { colorScheme: string; setColorScheme: () => void }) => unknown,
  ) => selector({ colorScheme: 'system', setColorScheme: mockSetColorScheme }),
}));

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider colorSchemeMode="light">{ui}</ThemeProvider>);
}

describe('SettingsScreen', () => {
  beforeEach(() => {
    mockSetColorScheme.mockClear();
  });

  it('renders without crashing', () => {
    renderWithTheme(<SettingsScreen />);
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('displays current theme mode', () => {
    renderWithTheme(<SettingsScreen />);
    expect(screen.getByText('Current theme: system')).toBeTruthy();
  });

  it('renders Light, Dark, and System buttons', () => {
    renderWithTheme(<SettingsScreen />);
    expect(screen.getByText('Light')).toBeTruthy();
    expect(screen.getByText('Dark')).toBeTruthy();
    expect(screen.getByText('System')).toBeTruthy();
  });

  it('calls setColorScheme when pressing Light button', () => {
    renderWithTheme(<SettingsScreen />);
    fireEvent.press(screen.getByText('Light'));
    expect(mockSetColorScheme).toHaveBeenCalledWith('light');
  });

  it('calls setColorScheme when pressing Dark button', () => {
    renderWithTheme(<SettingsScreen />);
    fireEvent.press(screen.getByText('Dark'));
    expect(mockSetColorScheme).toHaveBeenCalledWith('dark');
  });

  it('calls setColorScheme when pressing System button', () => {
    renderWithTheme(<SettingsScreen />);
    fireEvent.press(screen.getByText('System'));
    expect(mockSetColorScheme).toHaveBeenCalledWith('system');
  });

  it('displays app name', () => {
    renderWithTheme(<SettingsScreen />);
    expect(screen.getByText('oh-my-rn')).toBeTruthy();
  });

  it('displays app version from Expo Constants', () => {
    renderWithTheme(<SettingsScreen />);
    expect(screen.getByText('Version 1.0.0')).toBeTruthy();
  });

  it('displays Expo SDK footer', () => {
    renderWithTheme(<SettingsScreen />);
    expect(screen.getByText('Built with Expo SDK 54')).toBeTruthy();
  });
});
