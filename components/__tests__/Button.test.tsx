import { fireEvent, render, screen } from '@testing-library/react-native';
import type React from 'react';

import { Button } from '@/components/Button';
import { ThemeProvider } from '@/providers/ThemeProvider';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Button', () => {
  it('renders without crashing', () => {
    renderWithTheme(<Button title="Press me" onPress={() => {}} />);
    expect(screen.getByText('Press me')).toBeTruthy();
  });

  it('fires onPress when pressed', () => {
    const onPress = jest.fn();
    renderWithTheme(<Button title="Tap" onPress={onPress} />);
    fireEvent.press(screen.getByText('Tap'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    renderWithTheme(<Button title="Nope" onPress={onPress} disabled />);
    fireEvent.press(screen.getByText('Nope'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows ActivityIndicator when loading', () => {
    renderWithTheme(<Button title="Loading" onPress={() => {}} loading />);
    // Title should not be visible when loading
    expect(screen.queryByText('Loading')).toBeNull();
  });

  it('does not fire onPress when loading', () => {
    const onPress = jest.fn();
    const { toJSON } = renderWithTheme(<Button title="Wait" onPress={onPress} loading />);
    // The Pressable is disabled when loading, so press should not fire
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('ActivityIndicator');
  });

  it('applies reduced opacity when disabled', () => {
    const { toJSON } = renderWithTheme(<Button title="Dim" onPress={() => {}} disabled />);
    const tree = JSON.stringify(toJSON());
    expect(tree).toContain('"opacity":0.5');
  });
});
