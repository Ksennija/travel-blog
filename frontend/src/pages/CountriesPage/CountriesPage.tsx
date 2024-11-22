import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { CountriesPageParams } from "./types";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { CountryPanel } from "./components/CountryPanel/CountryPanel";
import { WelcomePanel } from "./components/WelcomePanel/WelcomePanel";
import { fetchCountries } from "../../api/countriesApi";
import { Country } from "./types";
import classnames from "classnames";
import styles from "./CountriesPage.module.css";
import { PANEL_TYPES } from "../../constants";

export const CountriesPage: React.FC<{
  panelType: string;
}> = ({ panelType }) => {
  const { countryId } = useParams<CountriesPageParams>();
  const [countries, setCountries] = useState<Country[]>();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
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

  function getComponent() {
    switch (panelType) {
      case PANEL_TYPES.countryPanel:
        if (!countries || !countryId) {
          break;
        }
        return (
          <CountryPanel
            key={countryId}
            country={getCountry(countries, countryId)}
            setIsLoaded={setIsLoading}
            onChange={onCountryChange}
          />
        );
      case PANEL_TYPES.editPanel:
        if (!countries || !countryId) {
          break;
        }
        return (
          <CountryPanel
            key={countryId}
            country={getCountry(countries, countryId)}
            setIsLoaded={setIsLoading}
            onChange={onCountryChange}
          />
        );
      default:
        return <WelcomePanel />;
    }
  }

  return (
    <div className={styles.content}>
      <Sidebar countries={countries} />
      <div
        className={classnames(styles.detail, {
          [styles.loading]: isLoading,
        })}
      >
        {getComponent()}
      </div>
    </div>
  );
};

function getCountry(countries: Country[], countryId: string) {
  return countries.find((country) => country.id === countryId)!;
}
