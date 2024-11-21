import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CountriesPageParams } from "./types";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { CountryPanel } from "./components/CountryPanel/CountryPanel";
import { WelcomePanel } from "./components/WelcomePanel/WelcomePanel";
import { fetchCountries } from "../../api/countriesApi";
import { Country } from "../../types/CountryType";
import styles from "./CountriesPage.module.css";

export type CountriesProps = {
  countries: Country[];
};

export const CountriesPage: React.FC = () => {
  const { countryId } = useParams<CountriesPageParams>();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    async function fetchAllCountries() {
      const countries = (await fetchCountries(null)) as Country[]; //q);
      setCountries(countries);
    }

    fetchAllCountries();
  }, []);
  return (
    <div className={styles.root}>
      <Sidebar countries={countries} />
      {countryId ? <CountryPanel /> : <WelcomePanel />}
    </div>
  );
};
