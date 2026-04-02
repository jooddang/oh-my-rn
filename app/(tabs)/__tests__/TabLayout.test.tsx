import { render, screen } from '@testing-library/react-native';
import type React from 'react';

import TabLayout from '@/app/(tabs)/_layout';
import { ThemeProvider } from '@/providers/ThemeProvider';

// Mock expo-router Tabs
jest.mock('expo-router', () => {
  const RN = require('react-native');

  // biome-ignore lint/suspicious/noExplicitAny: jest.mock factory cannot use external type refs
  function MockTabs(mockTabsProps: any) {
    return (
      <RN.View
        testID="tabs-navigator"
        accessibilityHint={JSON.stringify(mockTabsProps.screenOptions)}
      >
        {mockTabsProps.children}
      </RN.View>
    );
  }

  // biome-ignore lint/suspicious/noExplicitAny: jest.mock factory cannot use external type refs
  function MockScreen(mockScreenProps: any) {
    const mockIconFn = mockScreenProps.options.tabBarIcon;
    return (
      <RN.View testID={`tab-screen-${mockScreenProps.name}`}>
        <RN.Text>{String(mockScreenProps.options.title)}</RN.Text>
        {mockIconFn && (
          <RN.View testID={`tab-icon-${mockScreenProps.name}`}>
            {mockIconFn({ color: '#007AFF' })}
          </RN.View>
        )}
      </RN.View>
    );
  }

  MockTabs.Screen = MockScreen;

  return { Tabs: MockTabs };
});

// Mock lucide-react-native
jest.mock('lucide-react-native', () => {
  const RN = require('react-native');
  return {
    // biome-ignore lint/suspicious/noExplicitAny: jest.mock factory cannot use external type refs
    House: (mockIconProps: any) => (
      <RN.View
        testID="icon-house"
        accessibilityHint={`size:${mockIconProps.size},color:${mockIconProps.color}`}
      />
    ),
    // biome-ignore lint/suspicious/noExplicitAny: jest.mock factory cannot use external type refs
    Settings: (mockIconProps: any) => (
      <RN.View
        testID="icon-settings"
        accessibilityHint={`size:${mockIconProps.size},color:${mockIconProps.color}`}
      />
    ),
  };
});

function renderWithTheme(ui: React.ReactElement, colorSchemeMode?: 'light' | 'dark') {
  return render(<ThemeProvider colorSchemeMode={colorSchemeMode ?? 'light'}>{ui}</ThemeProvider>);
}

describe('TabLayout', () => {
  it('renders a Tabs navigator', () => {
    renderWithTheme(<TabLayout />);
    expect(screen.getByTestId('tabs-navigator')).toBeTruthy();
  });

  it('has Home and Settings tabs', () => {
    renderWithTheme(<TabLayout />);
    expect(screen.getByTestId('tab-screen-index')).toBeTruthy();
    expect(screen.getByTestId('tab-screen-settings')).toBeTruthy();
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('renders lucide icons for each tab', () => {
    renderWithTheme(<TabLayout />);
    expect(screen.getByTestId('icon-house')).toBeTruthy();
    expect(screen.getByTestId('icon-settings')).toBeTruthy();
  });

  it('passes icon size 24', () => {
    renderWithTheme(<TabLayout />);
    const houseIcon = screen.getByTestId('icon-house');
    expect(houseIcon.props.accessibilityHint).toContain('size:24');
  });

  it('uses theme colors for tab bar styling in light mode', () => {
    renderWithTheme(<TabLayout />, 'light');
    const navigator = screen.getByTestId('tabs-navigator');
    const opts = JSON.parse(navigator.props.accessibilityHint);
    expect(opts.tabBarActiveTintColor).toBe('#007AFF');
    expect(opts.tabBarStyle.backgroundColor).toBe('#F5F5F5');
    expect(opts.tabBarStyle.borderTopColor).toBe('#E0E0E0');
    expect(opts.headerShown).toBe(false);
  });

  it('uses theme colors for tab bar styling in dark mode', () => {
    renderWithTheme(<TabLayout />, 'dark');
    const navigator = screen.getByTestId('tabs-navigator');
    const opts = JSON.parse(navigator.props.accessibilityHint);
    expect(opts.tabBarActiveTintColor).toBe('#007AFF');
    expect(opts.tabBarStyle.backgroundColor).toBe('#1E1E1E');
    expect(opts.tabBarStyle.borderTopColor).toBe('#333333');
  });

  it('sets distinct active vs inactive tint colors', () => {
    renderWithTheme(<TabLayout />, 'light');
    const navigator = screen.getByTestId('tabs-navigator');
    const opts = JSON.parse(navigator.props.accessibilityHint);
    expect(opts.tabBarActiveTintColor).not.toBe(opts.tabBarInactiveTintColor);
  });
});
