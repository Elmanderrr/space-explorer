import { useReducer } from "react";
import {
  RoverCameraType,
  RoverPhotoResult,
} from "../../services/mars-rover-photos.api.ts";
import { Dialog, DialogBody, ThemeProvider } from "@material-tailwind/react";
import { Favorites } from "../../services/favorites.ts";
import { isFunction } from "lodash-es";
import { FavoriteIcon } from "../../components/FavoriteIcon.tsx";

interface PhotoGalleryParams {
  photos: RoverPhotoResult[];
  removeFromFavorites?: (photo: RoverPhotoResult) => void;
}

interface PhotoGalleryState {
  modal: boolean;
  modalContent?: RoverPhotoResult;
  favorites: RoverPhotoResult[];
}

interface PhotosGalleryStateAction {
  type: "setModal" | "updateFavorites";
  payload: Partial<PhotoGalleryState>;
}

function reducer(state: PhotoGalleryState, action: PhotosGalleryStateAction) {
  switch (action.type) {
    case "setModal":
      return {
        ...state,
        ...action.payload,
      } as PhotoGalleryState;
    case "updateFavorites":
      return {
        ...state,
        favorites: action.payload.favorites,
      } as PhotoGalleryState;
    default:
      return state;
  }
}

export function RoverPhotosGallery({
  photos,
  removeFromFavorites,
}: PhotoGalleryParams) {
  const [state, setState] = useReducer(reducer, {
    modal: false,
    modalContent: undefined,
    favorites: Favorites.get(),
  });

  const toggleFavoriteItem = (photo: RoverPhotoResult) => {
    if (Favorites.contains(photo.id)) {
      Favorites.remove(photo.id);
      if (isFunction(removeFromFavorites)) {
        removeFromFavorites(photo);
      }
    } else {
      Favorites.add(photo);
    }

    setState({
      type: "updateFavorites",
      payload: {
        favorites: Favorites.get(),
      },
    });
  };

  const renderDialog = () => {
    const modalPhotoIndex = photos.findIndex(
      (p) => p.id === state.modalContent?.id,
    );

    const handleNext = (direction: number) => {
      if (photos[modalPhotoIndex + direction]) {
        setState({
          type: "setModal",
          payload: {
            modalContent: photos[modalPhotoIndex + direction],
          },
        });
      }
    };

    if (state.modalContent) {
      return (
        <Dialog
          size="xl"
          open={state.modal}
          handler={() =>
            setState({
              type: "setModal",
              payload: { modal: false, modalContent: undefined },
            })
          }
        >
          <DialogBody className="p-0 relative">
            <div className="flex justify-center">
              <ThemeProvider
                value={{
                  tooltip: {
                    defaultProps: {
                      className: "z-[9999]",
                    },
                  },
                }}
              >
                <div onClick={() => toggleFavoriteItem(state.modalContent!)}>
                  <FavoriteIcon
                    inFavorites={Favorites.contains(state.modalContent.id)}
                  ></FavoriteIcon>
                </div>
              </ThemeProvider>
              <i
                className={
                  "fa - solid fa-lg fa-circle-left absolute top-1/2 left-3 cursor-pointer text-white " +
                  (modalPhotoIndex === 0
                    ? "pointer-events-none opacity-50"
                    : "")
                }
                onClick={() => handleNext(-1)}
              ></i>
              <img
                className="h-[48rem] w-full rounded-lg object-cover object-center"
                key={state.modalContent.id}
                src={state.modalContent.img_src}
              />
              <i
                className={
                  "fa-solid fa-lg fa-circle-right absolute top-1/2 right-3 cursor-pointer text-white" +
                  (modalPhotoIndex === photos.length - 1
                    ? "pointer-events-none opacity-50"
                    : "")
                }
                onClick={() => handleNext(1)}
              ></i>
            </div>
          </DialogBody>
        </Dialog>
      );
    }
  };

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {photos.map((photo) => (
        <div key={photo.id}>
          <div className="text-xs font-thin ">
            {RoverCameraType[photo.camera.name as keyof typeof RoverCameraType]}
            <span className="text-[10px]"> ({photo.camera.name})</span>
            <div className="relative">
              <img
                className="h-40 w-full max-w-full rounded-lg object-cover object-center cursor-pointer"
                onClick={() =>
                  setState({
                    type: "setModal",
                    payload: { modal: true, modalContent: photo },
                  })
                }
                key={photo.id}
                src={photo.img_src}
              />

              <div
                onClick={() => toggleFavoriteItem(photo)}
                className="text-sm"
              >
                <FavoriteIcon
                  inFavorites={Favorites.contains(photo.id)}
                ></FavoriteIcon>
              </div>
            </div>
          </div>
        </div>
      ))}
      {renderDialog()}
    </section>
  );
}
