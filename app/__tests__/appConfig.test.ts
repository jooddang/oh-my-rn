import { default as appConfig, getEasProjectId } from '@/app.config';
import easConfig from '../../eas.json';
import packageJson from '../../package.json';

const PROJECT_ID = '00000000-0000-0000-0000-000000000000';
const buildProfiles = easConfig.build as Record<
  string,
  { extends?: string; node?: string; env?: Record<string, string> }
>;

function createContext(projectId: string) {
  return {
    projectRoot: process.cwd(),
    staticConfigPath: null,
    packageJsonPath: null,
    config: {
      extra: {
        eas: {
          projectId,
        },
      },
    },
  };
}

describe('app config EAS project ID', () => {
  const originalBuildProfile = process.env.EAS_BUILD_PROFILE;
  const originalRequireProjectId = process.env.EAS_REQUIRE_PROJECT_ID;
  const originalApiUrl = process.env.API_URL;
  const originalAppEnv = process.env.APP_ENV;

  afterEach(() => {
    if (originalBuildProfile === undefined) {
      delete process.env.EAS_BUILD_PROFILE;
    } else {
      process.env.EAS_BUILD_PROFILE = originalBuildProfile;
    }

    if (originalRequireProjectId === undefined) {
      delete process.env.EAS_REQUIRE_PROJECT_ID;
    } else {
      process.env.EAS_REQUIRE_PROJECT_ID = originalRequireProjectId;
    }

    if (originalApiUrl === undefined) {
      delete process.env.API_URL;
    } else {
      process.env.API_URL = originalApiUrl;
    }

    if (originalAppEnv === undefined) {
      delete process.env.APP_ENV;
    } else {
      process.env.APP_ENV = originalAppEnv;
    }
  });

  it('allows local development when the project ID is not configured', () => {
    expect(getEasProjectId(undefined)).toBeUndefined();
    expect(getEasProjectId('')).toBeUndefined();
  });

  it('accepts and trims a valid EAS project ID', () => {
    expect(getEasProjectId(` ${PROJECT_ID} `)).toBe(PROJECT_ID);
  });

  it('rejects a malformed EAS project ID', () => {
    expect(() => getEasProjectId('not-a-project-id')).toThrow(
      'extra.eas.projectId in app.json must be an EAS project UUID.',
    );
  });

  it('requires a project ID for an EAS build', () => {
    process.env.EAS_BUILD_PROFILE = 'production';

    expect(() => appConfig(createContext(''))).toThrow(
      'Run "eas init" before building or publishing an EAS update.',
    );
  });

  it('enforces the project ID requirement from an EAS profile', () => {
    process.env.EAS_REQUIRE_PROJECT_ID = 'true';

    expect(() => appConfig(createContext(''))).toThrow(
      'Run "eas init" before building or publishing an EAS update.',
    );
  });

  it('derives OTA settings from the static EAS project ID', () => {
    process.env.API_URL = 'http://localhost:3000';
    process.env.APP_ENV = 'development';
    const config = appConfig(createContext(PROJECT_ID));

    expect(config.runtimeVersion).toEqual({ policy: 'fingerprint' });
    expect(config.updates).toEqual({
      url: `https://u.expo.dev/${PROJECT_ID}`,
      checkAutomatically: 'ON_LOAD',
      fallbackToCacheTimeout: 0,
    });
    expect(config.extra?.eas).toEqual({ projectId: PROJECT_ID });
  });

  it('requires explicit environment values when OTA is configured', () => {
    delete process.env.API_URL;
    process.env.APP_ENV = 'development';

    expect(() => appConfig(createContext(PROJECT_ID))).toThrow(
      'Set API_URL and APP_ENV in the active environment. For local development after linking a project, copy .env.example to .env.',
    );
  });

  it('rejects a loopback API URL outside development', () => {
    process.env.API_URL = 'https://localhost:3000';
    process.env.APP_ENV = 'production';

    expect(() => appConfig(createContext(PROJECT_ID))).toThrow(
      'API_URL must be a non-loopback HTTPS URL when APP_ENV is production.',
    );
  });

  it('makes every concrete EAS build profile require a project ID and Node 24', () => {
    expect(buildProfiles.base).toBeDefined();

    for (const [name, profile] of Object.entries(buildProfiles)) {
      if (name === 'base') {
        expect(profile.env?.EAS_REQUIRE_PROJECT_ID).toBe('true');
        expect(profile.node).toBe('24.x');
        continue;
      }

      expect(profile.extends).toBe('base');
    }
  });

  it('does not load the local .env file when publishing updates', () => {
    expect(packageJson.scripts['update:preview']).toContain('EXPO_NO_DOTENV=1');
    expect(packageJson.scripts['update:production']).toContain('EXPO_NO_DOTENV=1');
  });
});
