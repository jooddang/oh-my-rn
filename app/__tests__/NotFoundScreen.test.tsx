import { render, screen } from '@testing-library/react-native';
import type React from 'react';

import NotFoundScreen from '@/app/+not-found';
import { ThemeProvider } from '@/providers/ThemeProvider';

jest.mock('react-native-safe-area-context', () => {
  const RN = require('react-native');
  return {
    // biome-ignore lint/suspicious/noExplicitAny: jest.mock factory cannot use external type refs
    SafeAreaView: (props: any) => <RN.View {...props} />,
  };
});

jest.mock('expo-router', () => ({
  Stack: {
    // biome-ignore lint/suspicious/noExplicitAny: jest.mock factory cannot use external type refs
    Screen: (_props: any) => null,
  },
  // biome-ignore lint/suspicious/noExplicitAny: jest.mock factory cannot use external type refs
  Link: ({ children, style, ...props }: any) => {
    const RN = require('react-native');
    return (
      <RN.Text {...props} style={style}>
        {children}
      </RN.Text>
    );
  },
}));

function renderWithTheme(ui: React.ReactElement, colorSchemeMode?: 'light' | 'dark') {
  return render(<ThemeProvider colorSchemeMode={colorSchemeMode ?? 'light'}>{ui}</ThemeProvider>);
}

describe('NotFoundScreen', () => {
  it('renders without crashing', () => {
    renderWithTheme(<NotFoundScreen />);
    expect(screen.getByText('Page Not Found')).toBeTruthy();
  });

  it('displays the "Page Not Found" heading', () => {
    renderWithTheme(<NotFoundScreen />);
    expect(screen.getByText('Page Not Found')).toBeTruthy();
  });

  it('displays a helpful message', () => {
    renderWithTheme(<NotFoundScreen />);
    expect(screen.getByText(/doesn't exist or has been moved/)).toBeTruthy();
  });

  it('provides a link to navigate back to Home', () => {
    renderWithTheme(<NotFoundScreen />);
    expect(screen.getByText('Go back to Home')).toBeTruthy();
  });

  it('renders correctly in light mode', () => {
    renderWithTheme(<NotFoundScreen />, 'light');
    expect(screen.getByText('Page Not Found')).toBeTruthy();
    expect(screen.getByText('Go back to Home')).toBeTruthy();
  });

  it('renders correctly in dark mode', () => {
    renderWithTheme(<NotFoundScreen />, 'dark');
    expect(screen.getByText('Page Not Found')).toBeTruthy();
    expect(screen.getByText('Go back to Home')).toBeTruthy();
  });
});
