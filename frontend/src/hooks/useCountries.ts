import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Country } from "../types";
import { fetchCountries } from "../api/countriesApi";

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // getting searchParams to make search in the search input
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

  return {
    countries,
    isLoading,
    refetch: () => {
      setCountries(null);
      fetchAllCountries(query);
    },
  };
};
