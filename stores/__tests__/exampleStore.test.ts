import { useExampleStore } from '@/stores/exampleStore';
import type { Item } from '@/stores/exampleStore';

describe('exampleStore', () => {
  beforeEach(() => {
    useExampleStore.setState({ items: [], isLoading: false });
  });

  it('has empty items and isLoading false by default', () => {
    const state = useExampleStore.getState();
    expect(state.items).toEqual([]);
    expect(state.isLoading).toBe(false);
  });

  it('addItem adds an item to the items array', () => {
    const item: Item = {
      id: '1',
      title: 'Test Item',
      createdAt: '2026-04-02T00:00:00.000Z',
    };

    useExampleStore.getState().addItem(item);

    const state = useExampleStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(item);
  });

  it('addItem appends to existing items', () => {
    const item1: Item = { id: '1', title: 'First', createdAt: '2026-04-02T00:00:00.000Z' };
    const item2: Item = { id: '2', title: 'Second', createdAt: '2026-04-02T00:00:01.000Z' };

    useExampleStore.getState().addItem(item1);
    useExampleStore.getState().addItem(item2);

    expect(useExampleStore.getState().items).toHaveLength(2);
  });

  it('removeItem removes the correct item by id', () => {
    const item1: Item = { id: '1', title: 'Keep', createdAt: '2026-04-02T00:00:00.000Z' };
    const item2: Item = { id: '2', title: 'Remove', createdAt: '2026-04-02T00:00:01.000Z' };

    useExampleStore.setState({ items: [item1, item2] });
    useExampleStore.getState().removeItem('2');

    const state = useExampleStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('1');
  });

  it('removeItem does nothing for non-existent id', () => {
    const item: Item = { id: '1', title: 'Stay', createdAt: '2026-04-02T00:00:00.000Z' };
    useExampleStore.setState({ items: [item] });

    useExampleStore.getState().removeItem('999');

    expect(useExampleStore.getState().items).toHaveLength(1);
  });

  it('fetchItems sets isLoading true during execution and false after', async () => {
    jest.useFakeTimers();

    const fetchPromise = useExampleStore.getState().fetchItems();
    expect(useExampleStore.getState().isLoading).toBe(true);

    jest.advanceTimersByTime(500);
    await fetchPromise;

    expect(useExampleStore.getState().isLoading).toBe(false);
    expect(useExampleStore.getState().items.length).toBeGreaterThan(0);

    jest.useRealTimers();
  });

  it('fetchItems populates items with mock data', async () => {
    jest.useFakeTimers();

    const fetchPromise = useExampleStore.getState().fetchItems();
    jest.advanceTimersByTime(500);
    await fetchPromise;

    const state = useExampleStore.getState();
    expect(state.items).toHaveLength(2);
    expect(state.items[0]).toHaveProperty('id');
    expect(state.items[0]).toHaveProperty('title');
    expect(state.items[0]).toHaveProperty('createdAt');

    jest.useRealTimers();
  });
});
