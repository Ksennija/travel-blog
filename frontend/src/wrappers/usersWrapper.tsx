import { useEffect, useState } from "react";
import { fetchCountries } from "../api";
import { CountryType } from "../types/CountryType";
import { CountriesList } from "../components/CountriesList";

export const UsersWrapper = () => {
  const [allCountries, setAllUsers] = useState<CountryType[]>([]);

  // useEffect(() => {
  //   async function fetchCountries() {
  //     const fetchedCountries = await fetchCountries();
  //     setAllUsers(fetchedCountries);
  //   }

  //   fetchCountries();
  // }, []);

  return <CountriesList countries={allCountries} />;
};
