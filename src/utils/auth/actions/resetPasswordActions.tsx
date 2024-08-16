import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
} from "../constants";

export const resetPasswordRequest = (payload: object) => {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload: payload,
  };
};

export const resetPasswordSuccess = (data: object) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: data,
  };
};
