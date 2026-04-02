import { render, screen } from '@testing-library/react-native';
import type React from 'react';
import { Text } from 'react-native';

import { Screen } from '@/components/Screen';
import { ThemeProvider } from '@/providers/ThemeProvider';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Screen', () => {
  it('renders children', () => {
    renderWithTheme(
      <Screen>
        <Text>Hello</Text>
      </Screen>,
    );
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('renders ScrollView when scroll=true', () => {
    const { toJSON } = renderWithTheme(
      <Screen scroll>
        <Text>Scrollable</Text>
      </Screen>,
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('RCTScrollView');
  });

  it('does not render ScrollView by default', () => {
    const { toJSON } = renderWithTheme(
      <Screen>
        <Text>Static</Text>
      </Screen>,
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).not.toContain('RCTScrollView');
  });

  it('applies padding by default', () => {
    const { toJSON } = renderWithTheme(
      <Screen>
        <Text>Padded</Text>
      </Screen>,
    );
    const tree = JSON.stringify(toJSON());
    // theme.spacing.md = 16
    expect(tree).toContain('"paddingHorizontal":16');
  });

  it('removes padding when padding=false', () => {
    const { toJSON } = renderWithTheme(
      <Screen padding={false}>
        <Text>No pad</Text>
      </Screen>,
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).not.toContain('paddingHorizontal');
  });
});
