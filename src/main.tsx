import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./core/template/Root.tsx";
import { Rover } from "./pages/rover/Rover.tsx";
import { RoverFavoritesPage } from "./pages/rover-favorites/RoverFavorites.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "rover",
        element: <Rover />,
      },
      {
        path: "favorites",
        element: <RoverFavoritesPage />,
      },
      {
        path: "apod",
        element: <div>APOD</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}></RouterProvider>,
);
