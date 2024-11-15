import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/Root";
import { Country, loader as countryLoader } from "./routes/Country";
import ErrorPage from "./ErrorPage";
import EditCountry, { action as editAction } from "./routes/Edit";
import { action as destroyAction } from "./routes/Destroy";
import Index from "./routes/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "countries/:countryId",
        element: <Country />,
        loader: countryLoader,
      },
      {
        path: "countries/:countryId/edit",
        element: <EditCountry />,
        loader: countryLoader,
        action: editAction,
      },
      {
        path: "countries/:countryId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
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
