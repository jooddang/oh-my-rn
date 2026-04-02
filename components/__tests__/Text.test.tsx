import { render, screen } from '@testing-library/react-native';
import type React from 'react';

import { Text } from '@/components/Text';
import { ThemeProvider } from '@/providers/ThemeProvider';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Text', () => {
  it('renders children', () => {
    renderWithTheme(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('defaults to body variant', () => {
    renderWithTheme(<Text>Body text</Text>);
    const el = screen.getByText('Body text');
    const style = Array.isArray(el.props.style)
      ? Object.assign({}, ...el.props.style.filter(Boolean))
      : el.props.style;
    // body fontSize = 16
    expect(style.fontSize).toBe(16);
  });

  it('applies h1 variant with larger fontSize', () => {
    renderWithTheme(<Text variant="h1">Heading</Text>);
    const el = screen.getByText('Heading');
    const style = Array.isArray(el.props.style)
      ? Object.assign({}, ...el.props.style.filter(Boolean))
      : el.props.style;
    // h1 fontSize = 32
    expect(style.fontSize).toBe(32);
  });

  it('applies h2 variant with medium fontSize', () => {
    renderWithTheme(<Text variant="h2">SubHeading</Text>);
    const el = screen.getByText('SubHeading');
    const style = Array.isArray(el.props.style)
      ? Object.assign({}, ...el.props.style.filter(Boolean))
      : el.props.style;
    // h2 fontSize = 24
    expect(style.fontSize).toBe(24);
  });

  it('applies caption variant with small fontSize', () => {
    renderWithTheme(<Text variant="caption">Fine print</Text>);
    const el = screen.getByText('Fine print');
    const style = Array.isArray(el.props.style)
      ? Object.assign({}, ...el.props.style.filter(Boolean))
      : el.props.style;
    // caption fontSize = 12
    expect(style.fontSize).toBe(12);
  });

  it('each variant has a different fontSize', () => {
    const sizes: number[] = [];
    for (const variant of ['h1', 'h2', 'body', 'caption'] as const) {
      const { unmount } = renderWithTheme(<Text variant={variant}>{variant}</Text>);
      const el = screen.getByText(variant);
      const style = Array.isArray(el.props.style)
        ? Object.assign({}, ...el.props.style.filter(Boolean))
        : el.props.style;
      sizes.push(style.fontSize);
      unmount();
    }
    // All 4 sizes should be unique
    expect(new Set(sizes).size).toBe(4);
  });
});
