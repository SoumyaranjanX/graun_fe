//import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getApi = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

// post API
export const postApi = async (url: string, body: object) => {
  const response = await axiosInstance.post(url, body);
  return response.data;
};

