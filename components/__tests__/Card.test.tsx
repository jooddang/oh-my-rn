import { render, screen } from '@testing-library/react-native';
import type React from 'react';
import { Text } from 'react-native';

import { Card } from '@/components/Card';
import { BORDER_RADIUS } from '@/constants';
import { ThemeProvider } from '@/providers/ThemeProvider';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Card', () => {
  it('renders children inside card', () => {
    renderWithTheme(
      <Card>
        <Text>Card content</Text>
      </Card>,
    );
    expect(screen.getByText('Card content')).toBeTruthy();
  });

  it('applies border radius from constants', () => {
    const { toJSON } = renderWithTheme(
      <Card>
        <Text>Rounded</Text>
      </Card>,
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain(`"borderRadius":${BORDER_RADIUS}`);
  });

  it('applies border', () => {
    const { toJSON } = renderWithTheme(
      <Card>
        <Text>Bordered</Text>
      </Card>,
    );
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"borderWidth":1');
  });

  it('applies theme background and padding', () => {
    const { toJSON } = renderWithTheme(
      <Card>
        <Text>Styled</Text>
      </Card>,
    );
    const tree = JSON.stringify(toJSON());
    // lightTheme.colors.card = "#F5F5F5", spacing.md = 16
    expect(tree).toContain('"backgroundColor":"#F5F5F5"');
    expect(tree).toContain('"padding":16');
  });
});
