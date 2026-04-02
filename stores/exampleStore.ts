import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Item {
  id: string;
  title: string;
  createdAt: string;
}

interface ExampleState {
  items: Item[];
  isLoading: boolean;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  fetchItems: () => Promise<void>;
}

const MOCK_ITEMS: Item[] = [
  { id: '1', title: 'Example Item 1', createdAt: new Date().toISOString() },
  { id: '2', title: 'Example Item 2', createdAt: new Date().toISOString() },
];

export const useExampleStore = create<ExampleState>()(
  persist(
    (set) => ({
      items: [],
      isLoading: false,
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      fetchItems: async () => {
        set({ isLoading: true });
        await new Promise<void>((resolve) => setTimeout(resolve, 500));
        set({ items: MOCK_ITEMS, isLoading: false });
      },
    }),
    {
      name: 'example-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
