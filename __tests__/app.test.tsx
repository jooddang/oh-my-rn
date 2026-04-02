import { render, screen } from '@testing-library/react-native';
import type React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { ThemeProvider } from '@/providers/ThemeProvider';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('App smoke test', () => {
  it('renders a Text component', () => {
    renderWithTheme(<Text>Smoke test</Text>);
    expect(screen.getByText('Smoke test')).toBeTruthy();
  });

  it('renders a Button component', () => {
    renderWithTheme(<Button title="Tap me" onPress={() => {}} />);
    expect(screen.getByText('Tap me')).toBeTruthy();
  });

  it('renders multiple components together', () => {
    renderWithTheme(
      <View>
        <Text variant="h1">Welcome</Text>
        <Button title="Get Started" onPress={() => {}} />
      </View>,
    );
    expect(screen.getByText('Welcome')).toBeTruthy();
    expect(screen.getByText('Get Started')).toBeTruthy();
  });
});
