//import axios from "axios";
import ticketsAxios from "./ticketsAxios";

export const getApi = async (url: string) => {
  const response = await ticketsAxios.get(url);
  return response.data;
};

// post API
export const postApi = async (url: string, body: object) => {
  const response = await ticketsAxios.post(url, body);
  return response.data;
};

