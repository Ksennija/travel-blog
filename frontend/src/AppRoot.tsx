import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CountriesPage } from "./pages/CountriesPage/CountriesPage";
import { PANEL_TYPES } from "./constants";

export const AppRoot: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<CountriesPage panelType={PANEL_TYPES.welcomePanel} />}
        />
        <Route
          path="/countries/:countryId"
          element={<CountriesPage panelType={PANEL_TYPES.countryPanel} />}
        />
        <Route
          path="/countries/:countryId"
          element={<CountriesPage panelType={PANEL_TYPES.editPanel} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
