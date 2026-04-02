import { render, screen } from '@testing-library/react-native';
import * as SplashScreen from 'expo-splash-screen';

import RootLayout from '@/app/_layout';

let mockColorScheme = 'system';
const mockSetColorScheme = jest.fn();

jest.mock('expo-router', () => ({
  // biome-ignore lint/suspicious/noExplicitAny: jest.mock factory cannot use external type refs
  Stack: (props: any) => {
    const RN = require('react-native');
    return <RN.View testID="stack-navigator" {...props} />;
  },
}));

jest.mock('expo-status-bar', () => ({
  // biome-ignore lint/suspicious/noExplicitAny: jest.mock factory cannot use external type refs
  StatusBar: (props: any) => {
    const RN = require('react-native');
    return <RN.View testID="status-bar" {...props} />;
  },
}));

jest.mock('@/stores/settingsStore', () => ({
  useSettingsStore: (
    selector: (s: { colorScheme: string; setColorScheme: () => void }) => unknown,
  ) => selector({ colorScheme: mockColorScheme, setColorScheme: mockSetColorScheme }),
}));

describe('RootLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockColorScheme = 'system';
  });

  it('renders without crashing', () => {
    render(<RootLayout />);
    expect(screen.getByTestId('stack-navigator')).toBeTruthy();
  });

  it('renders Stack navigator with headerShown false', () => {
    render(<RootLayout />);
    const stack = screen.getByTestId('stack-navigator');
    expect(stack.props.screenOptions).toEqual({ headerShown: false });
  });

  it('renders StatusBar component', () => {
    render(<RootLayout />);
    expect(screen.getByTestId('status-bar')).toBeTruthy();
  });

  it('calls SplashScreen.hideAsync on mount', () => {
    render(<RootLayout />);
    expect(SplashScreen.hideAsync).toHaveBeenCalled();
  });

  it('renders StatusBar with dark style for light theme', () => {
    mockColorScheme = 'light';
    render(<RootLayout />);
    const statusBar = screen.getByTestId('status-bar');
    expect(statusBar.props.style).toBe('dark');
  });

  it('renders StatusBar with light style for dark theme', () => {
    mockColorScheme = 'dark';
    render(<RootLayout />);
    const statusBar = screen.getByTestId('status-bar');
    expect(statusBar.props.style).toBe('light');
  });
});
