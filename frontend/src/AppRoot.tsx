import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { useCountries } from "./hooks/useCountries";
import classnames from "classnames";

import styles from "./AppRoot.module.css";
import { WelcomePanel } from "./components/WelcomePanel/WelcomePanel";
import { CountryPanel } from "./components/CountryPanel/CountryPanel";
import { EditPanel } from "./components/EditPanel/EditPanel";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { CountryPageContext } from "./CountryPageContext";

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
  console.log(countries);
  return (
    <div className={styles.content}>
      <CountryPageContext.Provider
        value={{
          countries: countries,
          onMutating: (isMutating) => setIsMutating(isMutating),
          onChange: onCountryChange,
          disabled: isMutating || isLoading,
        }}
      >
        <Sidebar />
        <div
          className={classnames(styles.detail, {
            [styles.loading]: isLoading || isMutating,
          })}
        >
          <Routes>
            <Route path="/" element={<WelcomePanel />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/countries/:countryId" element={<CountryPanel />} />
            <Route path="/countries/:countryId/edit" element={<EditPanel />} />
            <Route path="/countries/:new/edit" element={<EditPanel />} />
          </Routes>
        </div>
      </CountryPageContext.Provider>
    </div>
  );
};
