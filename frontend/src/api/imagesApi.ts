import axios from "axios";
import { Image } from "../types";

export const baseImgUrl = "//localhost:3001/img";

export const api = axios.create({
  baseURL: "//localhost:3001/api/",
  withCredentials: false,
});

export const fetchImages = async (): Promise<Image> => {
  const response = await api.get(`/images`);
  return response.data;
};
