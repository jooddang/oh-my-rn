import type { ColorSchemeMode } from '@/lib/theme';
import React from 'react';

// Mock react-native before importing ThemeProvider
let mockSystemScheme: 'light' | 'dark' | null = 'light';

jest.mock('react-native', () => ({
  useColorScheme: () => mockSystemScheme,
}));

// Import after mock is set up
import { darkTheme, lightTheme } from '@/lib/theme';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';

import { act, create } from 'react-test-renderer';

type HookResult<T> = { current: T };

function renderThemeHook(
  colorSchemeMode: ColorSchemeMode = 'system',
  onColorSchemeModeChange?: (mode: ColorSchemeMode) => void,
): HookResult<ReturnType<typeof useTheme>> {
  const result: HookResult<ReturnType<typeof useTheme>> = {
    current: undefined as unknown as ReturnType<typeof useTheme>,
  };

  function TestComponent(): null {
    result.current = useTheme();
    return null;
  }

  act(() => {
    create(
      <ThemeProvider
        colorSchemeMode={colorSchemeMode}
        onColorSchemeModeChange={onColorSchemeModeChange}
      >
        <TestComponent />
      </ThemeProvider>,
    );
  });

  return result;
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    mockSystemScheme = 'light';
  });

  it('returns theme, colorScheme, and toggleTheme', () => {
    const result = renderThemeHook();
    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('colorScheme');
    expect(result.current).toHaveProperty('toggleTheme');
  });

  it('defaults to light theme when system is light', () => {
    mockSystemScheme = 'light';
    const result = renderThemeHook('system');
    expect(result.current.theme).toEqual(lightTheme);
    expect(result.current.colorScheme).toBe('light');
  });

  it('uses dark theme when system is dark and mode is system', () => {
    mockSystemScheme = 'dark';
    const result = renderThemeHook('system');
    expect(result.current.theme).toEqual(darkTheme);
    expect(result.current.colorScheme).toBe('dark');
  });

  it('uses light theme when mode is explicitly light regardless of system', () => {
    mockSystemScheme = 'dark';
    const result = renderThemeHook('light');
    expect(result.current.theme).toEqual(lightTheme);
    expect(result.current.colorScheme).toBe('light');
  });

  it('uses dark theme when mode is explicitly dark regardless of system', () => {
    mockSystemScheme = 'light';
    const result = renderThemeHook('dark');
    expect(result.current.theme).toEqual(darkTheme);
    expect(result.current.colorScheme).toBe('dark');
  });

  it('falls back to light when system returns null in system mode', () => {
    mockSystemScheme = null;
    const result = renderThemeHook('system');
    expect(result.current.theme).toEqual(lightTheme);
    expect(result.current.colorScheme).toBe('light');
  });

  it('toggleTheme cycles system → light → dark → system', () => {
    const calls: ColorSchemeMode[] = [];
    const onChange = (mode: ColorSchemeMode) => calls.push(mode);

    // system → light
    const r1 = renderThemeHook('system', onChange);
    act(() => r1.current.toggleTheme());
    expect(calls[0]).toBe('light');

    // light → dark
    const r2 = renderThemeHook('light', onChange);
    act(() => r2.current.toggleTheme());
    expect(calls[1]).toBe('dark');

    // dark → system
    const r3 = renderThemeHook('dark', onChange);
    act(() => r3.current.toggleTheme());
    expect(calls[2]).toBe('system');
  });
});

describe('useTheme outside provider', () => {
  it('throws when used outside ThemeProvider', () => {
    function BadComponent(): null {
      useTheme();
      return null;
    }

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      act(() => {
        create(<BadComponent />);
      });
    }).toThrow('useTheme must be used within a ThemeProvider');
    spy.mockRestore();
  });
});
