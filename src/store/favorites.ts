import { createMMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";

const storage = createMMKV({ id: "favorites-storage" });

const mmkvStorage: StateStorage = {
  getItem: (name) => storage.getString(name) ?? null,
  setItem: (name, value) => storage.set(name, value),
  removeItem: (name) => storage.remove(name),
};

interface FavoritesState {
  favoriteIds: number[];
  toggle: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoriteIds: [],
      toggle: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((fid) => fid !== id)
            : [...state.favoriteIds, id],
        })),
    }),
    {
      name: "favorites",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
