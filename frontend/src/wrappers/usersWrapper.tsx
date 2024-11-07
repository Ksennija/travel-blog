import { useEffect, useState } from "react";
import { fetchCountries } from "../api";
import { CountryType } from "../types/CountryType";
import { CountriesList } from "../components/CountriesList";

export const UsersWrapper = () => {
  const [allCountries, setAllUsers] = useState<CountryType[]>([]);

  useEffect(() => {
    async function fetchMyUsers() {
      const fetchedUsers = await fetchCountries();
      setAllUsers(fetchedUsers);
    }

    fetchMyUsers();
  }, []);

  return <CountriesList countries={allCountries} />;
};
