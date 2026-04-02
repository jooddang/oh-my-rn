import { useSettingsStore } from '@/stores/settingsStore';

// Mock AsyncStorage for persist middleware
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('settingsStore', () => {
  beforeEach(() => {
    // Reset store to initial state between tests
    useSettingsStore.setState({ colorScheme: 'system' });
  });

  it('exports useSettingsStore hook', () => {
    expect(useSettingsStore).toBeDefined();
    expect(typeof useSettingsStore).toBe('function');
  });

  it("has default colorScheme of 'system'", () => {
    const state = useSettingsStore.getState();
    expect(state.colorScheme).toBe('system');
  });

  it('has setColorScheme action', () => {
    const state = useSettingsStore.getState();
    expect(typeof state.setColorScheme).toBe('function');
  });

  it("setColorScheme('dark') updates state", () => {
    useSettingsStore.getState().setColorScheme('dark');
    expect(useSettingsStore.getState().colorScheme).toBe('dark');
  });

  it("setColorScheme('light') updates state", () => {
    useSettingsStore.getState().setColorScheme('light');
    expect(useSettingsStore.getState().colorScheme).toBe('light');
  });

  it("setColorScheme('system') updates state back to system", () => {
    useSettingsStore.getState().setColorScheme('dark');
    useSettingsStore.getState().setColorScheme('system');
    expect(useSettingsStore.getState().colorScheme).toBe('system');
  });

  it('is accessible outside React via getState()', () => {
    const state = useSettingsStore.getState();
    expect(state).toHaveProperty('colorScheme');
    expect(state).toHaveProperty('setColorScheme');
  });

  it('is accessible outside React via setState()', () => {
    useSettingsStore.setState({ colorScheme: 'dark' });
    expect(useSettingsStore.getState().colorScheme).toBe('dark');
  });

  it("persist middleware is configured with 'settings' key", () => {
    // The persist middleware adds a persist property to the store
    expect(useSettingsStore.persist).toBeDefined();
    expect(useSettingsStore.persist.getOptions().name).toBe('settings');
  });
});
