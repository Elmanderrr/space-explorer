import { Tooltip } from "@material-tailwind/react";

export function FavoriteIcon(props: { inFavorites: boolean }) {
  return (
    <Tooltip
      content={props.inFavorites ? "Remove from Favorites" : "Add to Favorites"}
    >
      <i
        className={
          (props.inFavorites ? "fa-solid" : "fa-regular") +
          " regular fa-star text-yellow-900 absolute right-3 top-3 cursor-pointer"
        }
      ></i>
    </Tooltip>
  );
}
