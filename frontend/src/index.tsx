import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";

import { AppRoot } from "./AppRoot";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  </React.StrictMode>
);
