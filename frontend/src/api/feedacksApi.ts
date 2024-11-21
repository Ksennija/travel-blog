import axios from "axios";
import { FeedbackType } from "../types/FeedbackType";

export const baseImgUrl = "//localhost:3001/img";

export const api = axios.create({
  baseURL: "//localhost:3001/api/",
  withCredentials: false,
});

export type FeedbackResponse = {
  allCountries?: FeedbackType;
  error?: unknown;
};

export type FeedbacksResponse = {
  allCountries?: FeedbackType[];
  error?: unknown;
};

export const fetchFeedbacks = async (): Promise<FeedbacksResponse> => {
  try {
    const response = await api.get(`/feedbacks`);
    const feedbacks = response.data;
    return feedbacks;
  } catch (e) {
    return { error: e };
  }
};

export const createFeedback = async (
  newFeedback: Omit<FeedbackType, "id">
): Promise<FeedbackResponse> => {
  try {
    const response = await api.post(`/feedbacks/create`, newFeedback);
    return response.data;
  } catch (e) {
    return { error: e };
  }
};
