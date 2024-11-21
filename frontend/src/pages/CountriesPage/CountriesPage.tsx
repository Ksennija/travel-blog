import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { CountriesPageParams } from "./types";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { CountryPanel } from "./components/CountryPanel/CountryPanel";
import { WelcomePanel } from "./components/WelcomePanel/WelcomePanel";
import { fetchCountries } from "../../api/countriesApi";
import { Country } from "../../types/CountryType";
import styles from "./CountriesPage.module.css";

export const CountriesPage: React.FC = () => {
  const { countryId } = useParams<CountriesPageParams>();
  const [countries, setCountries] = useState<Country[]>();
  const [searchParams] = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(true);
  const query = searchParams.get("q");

  const fetchAllCountries = /*useCallback(*/ async (query: string | null) => {
    setIsLoaded(true);
    try {
      const countries = await fetchCountries(query);
      setCountries(countries);
    } catch (e) {
      console.error("Failed to fetch countries", e);
    }
    setIsLoaded(false);
  }; //, []);

  useEffect(() => {
    fetchAllCountries(query);
  }, [/*fetchAllCountries,*/ query]);

  function onCountryChange() {
    //fetchAllCountries(query);
  }

  if (!countries) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={`${isLoaded ? styles.loading : ""}`}>
        <Sidebar countries={countries} />
      </div>
      <div className={styles.detail}>
        {countryId ? (
          <CountryPanel
            displayedCountry={getCountry(countries, countryId)}
            //setIsLoaded={setIsLoaded}
            onChange={onCountryChange}
          />
        ) : (
          <WelcomePanel />
        )}
      </div>
    </>
  );
};

function getCountry(countries: Country[], countryId: string) {
  return countries.find((country) => country.id === countryId)!;
}
