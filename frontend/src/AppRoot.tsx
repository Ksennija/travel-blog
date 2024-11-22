import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Country } from "./types";
import { fetchCountries } from "./api/countriesApi";
import classnames from "classnames";

import styles from "./AppRoot.module.css";
import { WelcomePanel } from "./components/WelcomePanel/WelcomePanel";
import { CountryPanel } from "./components/CountryPanel/CountryPanel";
import { EditPanel } from "./components/EditPanel/EditPanel";
import ErrorPage from "./components/ErrorPage/ErrorPage";

export const AppRoot: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const fetchAllCountries = useCallback(async (query: string | null) => {
    setIsLoading(true);
    try {
      const countries = await fetchCountries(query);
      setCountries(countries);
    } catch (e) {
      console.error("Failed to fetch countries", e);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAllCountries(query);
  }, [fetchAllCountries, query]);

  function onCountryChange() {
    fetchAllCountries(query);
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
          [styles.loading]: isLoading,
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
                setIsLoaded={setIsLoading}
                onChange={onCountryChange}
              />
            }
          />
          <Route
            path="/countries/:countryId/edit"
            element={
              <EditPanel
                countries={countries}
                setIsLoaded={setIsLoading}
                onChange={onCountryChange}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};
