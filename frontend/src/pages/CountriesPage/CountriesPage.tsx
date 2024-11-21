import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { CountriesPageParams } from "./types";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { CountryPanel } from "./components/CountryPanel/CountryPanel";
import { WelcomePanel } from "./components/WelcomePanel/WelcomePanel";
import { fetchCountries } from "../../api/countriesApi";
import { Country } from "../../types/CountryType";
import styles from "./CountriesPage.module.css";
import { serialize } from "v8";

export type CountriesProps = {
  countries: Country[];
};

export const CountriesPage: React.FC = () => {
  const { countryId } = useParams<CountriesPageParams>();
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  useEffect(() => {
    async function fetchAllCountries(query: string | null) {
      const countries = (await fetchCountries(query)) as Country[];
      setCountries(countries);
    }

    fetchAllCountries(query);
  }, [query]);
  return (
    <>
      <Sidebar countries={countries} />
      <div className={styles.detail}>
        {countryId ? <CountryPanel /> : <WelcomePanel />}
      </div>
    </>
  );
};
