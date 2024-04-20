import { Favorites } from "../../services/favorites.ts";
import { RoverPhotosGallery } from "../rover/RoverPhotosGallery.tsx";
import { useState } from "react";
import { RoverPhotoResult } from "../../services/mars-rover-photos.api.ts";

export function RoverFavoritesPage() {
  const [favorites, setFavorites] = useState<RoverPhotoResult[]>(
    Favorites.get(),
  );

  return (
    <RoverPhotosGallery
      photos={favorites}
      removeFromFavorites={() => setFavorites(Favorites.get())}
    ></RoverPhotosGallery>
  );
}
