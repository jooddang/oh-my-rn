import type React from 'react';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { type ColorSchemeMode, type Theme, darkTheme, lightTheme } from '@/lib/theme';

type ThemeContextValue = {
  theme: Theme;
  colorScheme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: React.ReactNode;
  colorSchemeMode?: ColorSchemeMode;
  onColorSchemeModeChange?: (mode: ColorSchemeMode) => void;
};

const CYCLE_ORDER: ColorSchemeMode[] = ['system', 'light', 'dark'];

export function ThemeProvider({
  children,
  colorSchemeMode = 'system',
  onColorSchemeModeChange,
}: ThemeProviderProps): React.JSX.Element {
  const systemColorScheme = useColorScheme();

  const effectiveScheme: 'light' | 'dark' =
    colorSchemeMode === 'system' ? (systemColorScheme ?? 'light') : colorSchemeMode;

  const theme = effectiveScheme === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = useCallback(() => {
    const currentIndex = CYCLE_ORDER.indexOf(colorSchemeMode);
    const nextMode = CYCLE_ORDER[(currentIndex + 1) % CYCLE_ORDER.length];
    onColorSchemeModeChange?.(nextMode);
  }, [colorSchemeMode, onColorSchemeModeChange]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, colorScheme: effectiveScheme, toggleTheme }),
    [theme, effectiveScheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
