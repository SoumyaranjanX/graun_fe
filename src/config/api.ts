import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LOCAL_STORAGE_KEYS } from './app';

export enum HttpResponseStatus {
  OK = 200,
  SESSION_OUT = 440,
  UNAUTHORIZED = 401
}

const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
const initialHeader = {
  headers: {
    common: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  },
};
export const orderInstance = axios.create({
  baseURL: import.meta.env.VITE_ORDERS_API_URL,
  // withCredentials: true,
  ...initialHeader,
});
export const restaurantInstance = axios.create({
  baseURL: import.meta.env.VITE_RESTAURANT_API_URL,
  ...initialHeader,
});
export const dispatchInstance = axios.create({
  baseURL: import.meta.env.VITE_DISPATCH_API_URL,
  ...initialHeader,
});

let logoutFunction: () => void;

export const setLogoutFunction = (logout: () => void) => {
  logoutFunction = logout;
};

const responseBody = (response: AxiosResponse) => response.data;
const errorBody = async (error: AxiosError) => {
  if (error.response?.status === HttpResponseStatus.UNAUTHORIZED) {
    logoutFunction();
  }
  return Promise.reject(error.response);
};

const requests = {
  orderGet: (url: string) => orderInstance.get(url).then(responseBody).catch(errorBody),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderPost: (url: string, data: any, config?: AxiosRequestConfig) =>
    orderInstance.post(url, data, config).then(responseBody).catch(errorBody),
  restaurantGet: (url: string) => restaurantInstance.get(url).then(responseBody).catch(errorBody),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restaurantPost: (url: string, data: any, config?: AxiosRequestConfig) =>
    restaurantInstance.post(url, data, config).then(responseBody).catch(errorBody),
  dispatchGet: (url: string) => dispatchInstance.get(url).then(responseBody).catch(errorBody),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatchPost: (url: string, data: any, config?: AxiosRequestConfig) =>
    dispatchInstance.post(url, data, config).then(responseBody).catch(errorBody),
};

export default requests;
