import { useSettingsStore } from '@/stores/settingsStore';

describe('settingsStore', () => {
  beforeEach(() => {
    useSettingsStore.setState({ colorScheme: 'system' });
  });

  it("has default colorScheme of 'system'", () => {
    const state = useSettingsStore.getState();
    expect(state.colorScheme).toBe('system');
  });

  it('setColorScheme updates state to dark', () => {
    useSettingsStore.getState().setColorScheme('dark');
    expect(useSettingsStore.getState().colorScheme).toBe('dark');
  });

  it('setColorScheme updates state to light', () => {
    useSettingsStore.getState().setColorScheme('light');
    expect(useSettingsStore.getState().colorScheme).toBe('light');
  });

  it('setColorScheme cycles back to system', () => {
    useSettingsStore.getState().setColorScheme('dark');
    useSettingsStore.getState().setColorScheme('system');
    expect(useSettingsStore.getState().colorScheme).toBe('system');
  });

  it('getState works outside React', () => {
    const state = useSettingsStore.getState();
    expect(state).toHaveProperty('colorScheme');
    expect(state).toHaveProperty('setColorScheme');
  });
});
