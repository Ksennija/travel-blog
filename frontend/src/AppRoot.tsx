import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Country } from "./types";
import { useCountries } from "./hooks/useCountries";
import classnames from "classnames";

import styles from "./AppRoot.module.css";
import { WelcomePanel } from "./components/WelcomePanel/WelcomePanel";
import { CountryPanel } from "./components/CountryPanel/CountryPanel";
import { EditPanel } from "./components/EditPanel/EditPanel";
import ErrorPage from "./components/ErrorPage/ErrorPage";

export const AppRoot: React.FC = () => {
  const { countries, isLoading, refetch } = useCountries();
  const [isMutating, setIsMutating] = useState(false);

  function onCountryChange() {
    refetch();
  }

  if (!countries) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <Sidebar countries={countries} />
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
                countries={countries}
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
                countries={countries}
                onMutating={(isMutating) => setIsMutating(isMutating)}
                onChange={onCountryChange}
              />
            }
          />
          <Route
            path="/countries/:new/edit"
            element={
              <EditPanel
                countries={countries}
                onMutating={(isMutating) => setIsMutating(isMutating)}
                onChange={onCountryChange}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};
