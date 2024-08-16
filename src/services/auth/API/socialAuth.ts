import axios from "axios";


const baseURL = import.meta.env.VITE_AUTH_API_URL;

const socialAuth = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default socialAuth;
