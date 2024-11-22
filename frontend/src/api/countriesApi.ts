import axios from "axios";
import { Country } from "../types";

const newCountry = {
  name: "New country",
  description: "Please, write something about this country",
  imageUrl: "/defaultImg.jpeg",
};

export const api = axios.create({
  baseURL: "//localhost:3001/api/",
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

export const createCountry = async (): Promise<Country> => {
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
