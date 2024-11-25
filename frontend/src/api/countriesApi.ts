import axios from "axios";
import { Country } from "../types";
import { HOSTNAME } from "../constants";

export const api = axios.create({
  baseURL: `${HOSTNAME}/api/`,
  withCredentials: false,
});

export const fetchCountries = async (
  query: string | null
): Promise<Country[]> => {
  const response = await api.get(`/countries${query ? "?query=" + query : ""}`);
  return response.data;
};

export const getCountry = async (id: string): Promise<Country> => {
  const response = await api.get(`/countries/${id}`);
  return response.data;
};

export const createCountry = async (
  newCountry: Omit<Country, "id">
): Promise<Country> => {
  const response = await api.post(`/countries/create`, newCountry);
  return response.data;
};

export const updateCountry = async (
  id: string,
  updates: Partial<Country>
): Promise<Country> => {
  const response = await api.put(`/countries/${id}/update`, updates);
  return response.data;
};

export const deleteCountry = async (id: string): Promise<void> => {
  return await api.delete(`/countries/${id}/destroy`);
};
