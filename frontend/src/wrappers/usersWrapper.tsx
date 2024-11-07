import { useEffect, useState } from "react";
import { fetchCountries } from "../api";
import { Country } from "../types/Country";
import { CountriesList } from "../components/CountriesList";

export const UsersWrapper = () => {
  const [allCountries, setAllUsers] = useState<Country[]>([]);

  useEffect(() => {
    async function fetchMyUsers() {
      const fetchedUsers = await fetchCountries();
      setAllUsers(fetchedUsers);
    }

    fetchMyUsers();
  }, []);

  return <CountriesList countries={allCountries} />;
};
