import { RoverPhotoResult } from "./mars-rover-photos.api.ts";

export const Favorites = {
  key: "favorites",

  get favorites(): RoverPhotoResult[] {
    const favorites = localStorage.getItem(this.key);

    return favorites ? JSON.parse(favorites) : [];
  },

  add(roverPhoto: RoverPhotoResult) {
    const favorites = this.favorites;

    window.localStorage.setItem(
      this.key,
      JSON.stringify([...favorites, roverPhoto]),
    );
  },

  remove(id: number) {
    const favorites = this.favorites;
    const newList = favorites.filter((r) => r.id !== id);

    localStorage.setItem(this.key, JSON.stringify(newList));
  },

  get() {
    return this.favorites;
  },

  contains(id: number): boolean {
    return !!this.favorites.find((f) => f.id === id);
  },
};
