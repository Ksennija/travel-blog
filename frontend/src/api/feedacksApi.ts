import axios from "axios";
import { Feedback } from "../types";

export const api = axios.create({
  baseURL: "//localhost:3001/api/",
  withCredentials: false,
});

export const fetchFeedbacks = async (): Promise<Feedback> => {
  const response = await api.get(`/feedbacks`);
  return response.data;
};

export const createFeedback = async (
  newFeedback: Omit<Feedback, "id">
): Promise<Feedback> => {
  const response = await api.post(`/feedbacks/create`, newFeedback);
  return response.data;
};
