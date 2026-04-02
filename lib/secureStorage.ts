import * as SecureStore from 'expo-secure-store';

const KEY_PATTERN = /^[a-zA-Z0-9_.-]{1,64}$/;

function validateKey(key: string): void {
  if (!KEY_PATTERN.test(key)) {
    throw new Error(`[SecureStorage] Invalid key format: "${key}"`);
  }
}

/**
 * Retrieve a value from secure storage.
 * Returns null if the key does not exist or an error occurs.
 *
 * WARNING: Never log stored values. Only log key names, and only in __DEV__.
 */
export async function getSecureItem(key: string): Promise<string | null> {
  validateKey(key);
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error: unknown) {
    if (__DEV__) {
      console.warn(`[SecureStorage] Failed to get item "${key}":`, error);
    }
    return null;
  }
}

/**
 * Store a value in secure storage.
 */
export async function setSecureItem(key: string, value: string): Promise<void> {
  validateKey(key);
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error: unknown) {
    if (__DEV__) {
      console.warn(`[SecureStorage] Failed to set item "${key}":`, error);
    }
    throw error;
  }
}

/**
 * Delete a value from secure storage.
 * Does not throw if the key does not exist.
 */
export async function deleteSecureItem(key: string): Promise<void> {
  validateKey(key);
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error: unknown) {
    if (__DEV__) {
      console.warn(`[SecureStorage] Failed to delete item "${key}":`, error);
    }
  }
}
