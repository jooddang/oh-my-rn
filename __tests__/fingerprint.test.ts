import { execFileSync } from 'node:child_process';

jest.setTimeout(30_000);

const FINGERPRINT_SCRIPT = `
  const { createFingerprintAsync } = require('expo/fingerprint');
  createFingerprintAsync(process.cwd(), { platforms: ['ios'], silent: true })
    .then((fingerprint) => {
      console.log('FINGERPRINT=' + fingerprint.hash);
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
`;

function createFingerprint(apiUrl: string, appEnv: string): string {
  const stdout = execFileSync(process.execPath, ['--eval', FINGERPRINT_SCRIPT], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      API_URL: apiUrl,
      APP_ENV: appEnv,
      EXPO_NO_DOTENV: '1',
    },
  });

  const fingerprint = stdout
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.startsWith('FINGERPRINT='));

  if (!fingerprint) {
    throw new Error(`Fingerprint process did not return a hash:\n${stdout}`);
  }

  return fingerprint.slice('FINGERPRINT='.length);
}

describe('fingerprint configuration', () => {
  it('does not change the runtime fingerprint when extra environment values change', () => {
    const first = createFingerprint('https://a.example.com', 'production');
    const second = createFingerprint('https://b.example.com', 'staging');

    expect(second).toBe(first);
  });
});
