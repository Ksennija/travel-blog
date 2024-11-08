import axios from "axios";
import { CountryType } from "./types/CountryType";

export const baseImgUrl = "//localhost:3001/img";

export const api = axios.create({
  baseURL: "//localhost:3001/api/",
  withCredentials: false,
});

export type CountriesResponse = {
  allCountries?: CountryType[];
  error?: unknown;
};

export const fetchCountries = async (): Promise<CountriesResponse> => {
  try {
    const response = await api.get("/countries");
    const allCountries = response.data;
    return allCountries;

    // return {
    //   allCountries,
    //   error: undefined,
    // };
  } catch (e) {
    return {
      //allCountries: undefined,
      error: e,
    };
  }
};

export const createCountry = (newCountry: Omit<CountryType, "id">) => {
  api.post("/countries/create", newCountry).then((response) => {
    console.log(response);
  });
};

export const deleteCountry = (id: number) => {
  return api
    .delete(`/countries/delete`, {
      data: {
        id,
      },
    })
    .then((response) => {
      console.log(response);
    });
};
