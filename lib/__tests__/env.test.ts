beforeEach(() => {
  jest.resetModules();
});

function loadEnvWith(extra?: Record<string, unknown>) {
  jest.doMock('expo-constants', () => ({
    __esModule: true,
    default: {
      expoConfig: extra !== undefined ? { extra } : null,
    },
  }));
  return require('@/lib/env').env;
}

describe('env', () => {
  it('exports env object with API_URL and APP_ENV', () => {
    const env = loadEnvWith();
    expect(env).toHaveProperty('API_URL');
    expect(env).toHaveProperty('APP_ENV');
  });

  it('returns defaults when expoConfig is null', () => {
    const env = loadEnvWith();
    expect(env.API_URL).toBe('http://localhost:3000');
    expect(env.APP_ENV).toBe('development');
  });

  it('returns defaults when extra is undefined', () => {
    jest.doMock('expo-constants', () => ({
      __esModule: true,
      default: { expoConfig: { extra: undefined } },
    }));
    const env = require('@/lib/env').env;
    expect(env.API_URL).toBe('http://localhost:3000');
    expect(env.APP_ENV).toBe('development');
  });

  it('reads API_URL from expoConfig.extra', () => {
    const env = loadEnvWith({ API_URL: 'https://api.example.com', APP_ENV: 'production' });
    expect(env.API_URL).toBe('https://api.example.com');
  });

  it('reads APP_ENV from expoConfig.extra', () => {
    const env = loadEnvWith({ API_URL: 'https://api.example.com', APP_ENV: 'staging' });
    expect(env.APP_ENV).toBe('staging');
  });

  it('falls back to default for invalid APP_ENV value', () => {
    const env = loadEnvWith({ API_URL: 'https://api.example.com', APP_ENV: 'invalid' });
    expect(env.APP_ENV).toBe('development');
  });

  it('falls back to default for non-string API_URL', () => {
    const env = loadEnvWith({ API_URL: 123, APP_ENV: 'production' });
    expect(env.API_URL).toBe('http://localhost:3000');
  });

  it('APP_ENV accepts all three valid values', () => {
    for (const value of ['development', 'staging', 'production'] as const) {
      jest.resetModules();
      const env = loadEnvWith({ APP_ENV: value });
      expect(env.APP_ENV).toBe(value);
    }
  });
});
