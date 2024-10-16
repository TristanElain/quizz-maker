import { createBrowserRouter } from "react-router-dom";
import { Results } from "./page/results";
import { Home } from "./page/root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/results",
    element: <Results />,
  },
]);
