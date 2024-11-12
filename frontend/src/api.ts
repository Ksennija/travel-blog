import axios from "axios";
import { CountryType } from "./types/CountryType";
//import { error } from "console";

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
    console.log(allCountries);
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

export const getCountry = async (id: string): Promise<CountriesResponse> => {
  try {
    const response = await api.get("/countries/:" + id);
    const country = response.data;
    console.log(country);
    return country;

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

const newCountry = {
  name: "New country",
  description: "Some descriotion",
  imageUrl: "https://i.imgur.com/r5etRvl.jpeg",
};

export const createCountry = async (): Promise<CountriesResponse> => {
  try {
    console.log(newCountry);
    const response = await api.post("/countries/create", newCountry);
    //const response = await api.get("/countries");
    //const allCountries = response.data;
    //console.log(allCountries);
    return response.data;
  } catch (e) {
    return { error: e };
  }
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
