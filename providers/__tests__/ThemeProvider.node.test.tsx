import type { ColorSchemeMode } from '@/lib/theme';

// Mock react-native before importing ThemeProvider
let mockSystemScheme: 'light' | 'dark' | 'unspecified' | null = 'light';

jest.mock('react-native', () => ({
  useColorScheme: () => mockSystemScheme,
}));

import { act } from '@testing-library/react-native';
import { Component, type ReactNode } from 'react';
import { createRoot } from 'test-renderer';
// Import after mock is set up
import { darkTheme, lightTheme } from '@/lib/theme';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';

type HookResult<T> = { current: T };
const roots: ReturnType<typeof createRoot>[] = [];

afterEach(async () => {
  for (const root of roots) {
    await act(() => {
      root.unmount();
    });
  }
  roots.length = 0;
});

async function renderThemeHook(
  colorSchemeMode: ColorSchemeMode = 'system',
  onColorSchemeModeChange?: (mode: ColorSchemeMode) => void,
): Promise<HookResult<ReturnType<typeof useTheme>>> {
  const result: HookResult<ReturnType<typeof useTheme>> = {
    current: undefined as unknown as ReturnType<typeof useTheme>,
  };

  function TestComponent(): null {
    result.current = useTheme();
    return null;
  }

  const root = createRoot();
  roots.push(root);
  await act(() => {
    root.render(
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

  it('returns theme, colorScheme, and toggleTheme', async () => {
    const result = await renderThemeHook();
    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('colorScheme');
    expect(result.current).toHaveProperty('toggleTheme');
  });

  it('defaults to light theme when system is light', async () => {
    mockSystemScheme = 'light';
    const result = await renderThemeHook('system');
    expect(result.current.theme).toEqual(lightTheme);
    expect(result.current.colorScheme).toBe('light');
  });

  it('uses dark theme when system is dark and mode is system', async () => {
    mockSystemScheme = 'dark';
    const result = await renderThemeHook('system');
    expect(result.current.theme).toEqual(darkTheme);
    expect(result.current.colorScheme).toBe('dark');
  });

  it('uses light theme when mode is explicitly light regardless of system', async () => {
    mockSystemScheme = 'dark';
    const result = await renderThemeHook('light');
    expect(result.current.theme).toEqual(lightTheme);
    expect(result.current.colorScheme).toBe('light');
  });

  it('uses dark theme when mode is explicitly dark regardless of system', async () => {
    mockSystemScheme = 'light';
    const result = await renderThemeHook('dark');
    expect(result.current.theme).toEqual(darkTheme);
    expect(result.current.colorScheme).toBe('dark');
  });

  it('falls back to light when system returns null in system mode', async () => {
    mockSystemScheme = null;
    const result = await renderThemeHook('system');
    expect(result.current.theme).toEqual(lightTheme);
    expect(result.current.colorScheme).toBe('light');
  });

  it('falls back to light when the system color scheme is unspecified', async () => {
    mockSystemScheme = 'unspecified';
    const result = await renderThemeHook('system');
    expect(result.current.theme).toEqual(lightTheme);
    expect(result.current.colorScheme).toBe('light');
  });

  it('toggleTheme cycles system → light → dark → system', async () => {
    const calls: ColorSchemeMode[] = [];
    const onChange = (mode: ColorSchemeMode) => calls.push(mode);

    // system → light
    const r1 = await renderThemeHook('system', onChange);
    await act(() => {
      r1.current.toggleTheme();
    });
    expect(calls[0]).toBe('light');

    // light → dark
    const r2 = await renderThemeHook('light', onChange);
    await act(() => {
      r2.current.toggleTheme();
    });
    expect(calls[1]).toBe('dark');

    // dark → system
    const r3 = await renderThemeHook('dark', onChange);
    await act(() => {
      r3.current.toggleTheme();
    });
    expect(calls[2]).toBe('system');
  });
});

describe('useTheme outside provider', () => {
  it('throws when used outside ThemeProvider', async () => {
    function BadComponent(): null {
      useTheme();
      return null;
    }

    class CaptureErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
      state = { error: null };

      static getDerivedStateFromError(error: unknown) {
        return { error: error instanceof Error ? error : new Error(String(error)) };
      }

      render(): ReactNode {
        return this.state.error ? null : this.props.children;
      }
    }

    let caughtError: unknown;
    const root = createRoot({
      onCaughtError: (error) => {
        caughtError = error;
      },
    });
    roots.push(root);
    await act(() => {
      root.render(
        <CaptureErrorBoundary>
          <BadComponent />
        </CaptureErrorBoundary>,
      );
    });

    expect(caughtError).toBeInstanceOf(Error);
    expect(caughtError).toHaveProperty('message', 'useTheme must be used within a ThemeProvider');
  });
});
