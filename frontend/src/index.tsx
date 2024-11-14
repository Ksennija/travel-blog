import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigation,
} from "react-router-dom";
import "./index.css";

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/Root";
import { Country, loader as CountryLoader } from "./routes/Country";
import ErrorPage from "./ErrorPage";
import EditCountry, { action as EditAction } from "./routes/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "countries/:countryId",
        element: <Country />,
        loader: CountryLoader,
      },
      {
        path: "countries/:countryId/edit",
        element: <EditCountry />,
        loader: CountryLoader,
        action: EditAction,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
