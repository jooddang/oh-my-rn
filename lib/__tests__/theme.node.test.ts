import { type Theme, darkTheme, lightTheme } from '@/lib/theme';

const COLOR_KEYS: (keyof Theme['colors'])[] = [
  'background',
  'text',
  'card',
  'border',
  'primary',
  'secondary',
];

const SPACING_KEYS: (keyof Theme['spacing'])[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const TYPOGRAPHY_KEYS: (keyof Theme['typography'])[] = ['h1', 'h2', 'body', 'caption'];

function assertValidTheme(theme: Theme, name: string): void {
  describe(`${name} structure`, () => {
    it('has colors, spacing, and typography sub-objects', () => {
      expect(theme).toHaveProperty('colors');
      expect(theme).toHaveProperty('spacing');
      expect(theme).toHaveProperty('typography');
    });

    it.each(COLOR_KEYS)('colors.%s is a non-empty string', (key) => {
      expect(typeof theme.colors[key]).toBe('string');
      expect(theme.colors[key].length).toBeGreaterThan(0);
    });

    it.each(SPACING_KEYS)('spacing.%s is a positive number', (key) => {
      expect(typeof theme.spacing[key]).toBe('number');
      expect(theme.spacing[key]).toBeGreaterThan(0);
    });

    it.each(TYPOGRAPHY_KEYS)('typography.%s has fontSize, fontWeight, lineHeight', (key) => {
      const style = theme.typography[key];
      expect(style).toHaveProperty('fontSize');
      expect(style).toHaveProperty('fontWeight');
      expect(style).toHaveProperty('lineHeight');
    });
  });
}

describe('Theme definitions', () => {
  assertValidTheme(lightTheme, 'lightTheme');
  assertValidTheme(darkTheme, 'darkTheme');

  it('lightTheme has expected spacing values', () => {
    expect(lightTheme.spacing).toEqual({
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    });
  });

  it('lightTheme uses white background', () => {
    expect(lightTheme.colors.background).toBe('#FFFFFF');
  });

  it('darkTheme uses dark background', () => {
    expect(darkTheme.colors.background).toBe('#121212');
  });

  it('both themes use blue primary', () => {
    expect(lightTheme.colors.primary).toBe('#007AFF');
    expect(darkTheme.colors.primary).toBe('#007AFF');
  });

  it('both themes share the same spacing', () => {
    expect(lightTheme.spacing).toEqual(darkTheme.spacing);
  });

  it('both themes share the same typography', () => {
    expect(lightTheme.typography).toEqual(darkTheme.typography);
  });
});
