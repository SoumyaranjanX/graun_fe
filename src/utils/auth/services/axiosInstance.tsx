import axios from "axios";

// const baseURL =
//   "http://grauns-dev-nlb-2ebd5522b451f0c3.elb.eu-west-1.amazonaws.com/order";
const baseURL = "https://aws-nlb-prod.grauns.com/auth_backend";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
