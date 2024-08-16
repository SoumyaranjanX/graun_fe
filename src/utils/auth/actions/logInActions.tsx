import { LOGIN_SUCCESS, LOGIN_REQUEST } from "../constants";

//get order status
export const logInRequest = (payload: object) => {
  return {
    type: LOGIN_REQUEST,
    payload: payload,
  };
};

export const logInSuccess = (data: object) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};
