import { useFavoritesStore } from "../src/store/favorites";

beforeEach(() => {
  useFavoritesStore.setState({ favoriteIds: [] });
});

describe("favorites store", () => {
  it("toggles a favorite on and off", () => {
    const { toggle } = useFavoritesStore.getState();

    toggle(1);
    expect(useFavoritesStore.getState().favoriteIds).toContain(1);

    toggle(1);
    expect(useFavoritesStore.getState().favoriteIds).not.toContain(1);
  });

  it("handles multiple favorites", () => {
    const { toggle } = useFavoritesStore.getState();

    toggle(1);
    toggle(5);
    toggle(10);

    const { favoriteIds } = useFavoritesStore.getState();
    expect(favoriteIds).toEqual([1, 5, 10]);

    toggle(5);
    expect(useFavoritesStore.getState().favoriteIds).toEqual([1, 10]);
  });
});
