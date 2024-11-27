import React, { useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { useCountries } from "./hooks/useCountries";
import { Country } from "./types";
import classnames from "classnames";

import styles from "./AppRoot.module.css";
import { WelcomePanel } from "./components/WelcomePanel/WelcomePanel";
import { CountryPanel } from "./components/CountryPanel/CountryPanel";
import { EditPanel } from "./components/EditPanel/EditPanel";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { CountryContext } from "./CountryContext";

export type Props = {
  onMutating: (isMutating: boolean) => void;
  onChange: () => void;
  disabled?: boolean;
};

export const AppRoot: React.FC = () => {
  const { countries, isLoading, refetch } = useCountries();
  const [isMutating, setIsMutating] = useState(false);

  function onCountryChange() {
    refetch();
  }
  debugger;
  if (!countries) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  console.log(countries);
  return (
    <div className={styles.content}>
      <CountryContext.Provider value={countries}>
        <Sidebar />
        <div
          className={classnames(styles.detail, {
            [styles.loading]: isLoading || isMutating,
          })}
        >
          <Routes>
            <Route path="/" element={<WelcomePanel />} />
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/countries/:countryId"
              element={
                <CountryPanel
                  onMutating={(isMutating) => setIsMutating(isMutating)}
                  onChange={onCountryChange}
                  disabled={isMutating || isLoading}
                />
              }
            />
            <Route
              path="/countries/:countryId/edit"
              element={
                <EditPanel
                  onMutating={(isMutating) => setIsMutating(isMutating)}
                  onChange={onCountryChange}
                />
              }
            />
            <Route
              path="/countries/:new/edit"
              element={
                <EditPanel
                  onMutating={(isMutating) => setIsMutating(isMutating)}
                  onChange={onCountryChange}
                />
              }
            />
          </Routes>
        </div>
      </CountryContext.Provider>
    </div>
  );
};
