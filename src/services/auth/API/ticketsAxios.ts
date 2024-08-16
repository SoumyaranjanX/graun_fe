import axios from "axios";


const baseURL = import.meta.env.VITE_RESTAURANT_API_URL;

const ticketsAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default ticketsAxios;
