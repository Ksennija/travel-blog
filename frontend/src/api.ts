import axios from "axios";
import { CountryType } from "./types/CountryType";
import { CountryProps } from "./props/CountryProps";

const newCountry = {
  name: "New country",
  description: "Please, write something about this country",
  imageUrl: "/defaultImg.jpeg",
};

export const baseImgUrl = "//localhost:3001/img";

export const api = axios.create({
  baseURL: "//localhost:3001/api/",
  withCredentials: false,
});

export type CountriesResponse = {
  allCountries?: CountryType[];
  error?: unknown;
};

export type CountryResponse = {
  country?: CountryType;
  error?: unknown;
};

export const fetchCountries = async (): Promise<CountriesResponse> => {
  try {
    const response = await api.get(`/countries`);
    const allCountries = response.data;
    return allCountries;

    // return {
    //   allCountries,
    //   error: undefined,
    // };
  } catch (e) {
    return { error: e };
  }
};

export const getCountry = async (id: string): Promise<CountryResponse> => {
  try {
    const response = await api.get(`/countries/${id}`);
    const country = response.data;
    return country;
  } catch (e) {
    return { error: e };
  }
};

export const createCountry = async (): Promise<CountryResponse> => {
  try {
    const response = await api.post(`/countries/create`, newCountry);
    return response.data;
  } catch (e) {
    return { error: e };
  }
};

export const updateCountry = async (
  id: string,
  updates: CountryProps
): Promise<CountryResponse> => {
  try {
    const response = await api.put(`/countries/${id}/update`, updates);
    return response.data;
  } catch (e) {
    return { error: e };
  }
};

export const deleteCountry = async (id: string): Promise<Response | object> => {
  try {
    const response = await api.delete(`/countries/${id}/destroy`);
    return response.data;
  } catch (e) {
    return { error: e };
  }
};
