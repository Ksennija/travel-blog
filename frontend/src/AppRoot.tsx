import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CountriesPage } from "./pages/CountriesPage/CountriesPage";

export const AppRoot: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountriesPage />} />
        <Route path="/countries/:countryId" element={<CountriesPage />} />
      </Routes>
    </BrowserRouter>
  );
};
