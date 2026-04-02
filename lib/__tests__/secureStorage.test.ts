import { deleteSecureItem, getSecureItem, setSecureItem } from '@/lib/secureStorage';
import * as SecureStore from 'expo-secure-store';

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

const mockedSecureStore = SecureStore as jest.Mocked<typeof SecureStore>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getSecureItem', () => {
  it('returns the stored value', async () => {
    mockedSecureStore.getItemAsync.mockResolvedValue('my-token');
    const result = await getSecureItem('auth_token');
    expect(mockedSecureStore.getItemAsync).toHaveBeenCalledWith('auth_token');
    expect(result).toBe('my-token');
  });

  it('returns null for nonexistent key', async () => {
    mockedSecureStore.getItemAsync.mockResolvedValue(null);
    const result = await getSecureItem('missing_key');
    expect(result).toBeNull();
  });

  it('returns null on error instead of throwing', async () => {
    mockedSecureStore.getItemAsync.mockRejectedValue(new Error('storage unavailable'));
    const result = await getSecureItem('bad_key');
    expect(result).toBeNull();
  });
});

describe('setSecureItem', () => {
  it('stores a value', async () => {
    mockedSecureStore.setItemAsync.mockResolvedValue();
    await setSecureItem('auth_token', 'my-token');
    expect(mockedSecureStore.setItemAsync).toHaveBeenCalledWith('auth_token', 'my-token');
  });

  it('throws on error', async () => {
    mockedSecureStore.setItemAsync.mockRejectedValue(new Error('write failed'));
    await expect(setSecureItem('key', 'val')).rejects.toThrow('write failed');
  });
});

describe('deleteSecureItem', () => {
  it('deletes a value', async () => {
    mockedSecureStore.deleteItemAsync.mockResolvedValue();
    await deleteSecureItem('auth_token');
    expect(mockedSecureStore.deleteItemAsync).toHaveBeenCalledWith('auth_token');
  });

  it('does not throw on nonexistent key', async () => {
    mockedSecureStore.deleteItemAsync.mockRejectedValue(new Error('not found'));
    await expect(deleteSecureItem('missing_key')).resolves.toBeUndefined();
  });
});

describe('set then get round-trip', () => {
  it('returns the value that was set', async () => {
    mockedSecureStore.setItemAsync.mockResolvedValue();
    mockedSecureStore.getItemAsync.mockResolvedValue('secret-value');

    await setSecureItem('credential', 'secret-value');
    const result = await getSecureItem('credential');

    expect(result).toBe('secret-value');
  });
});
