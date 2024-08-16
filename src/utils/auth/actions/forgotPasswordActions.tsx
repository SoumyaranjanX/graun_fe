import {
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_RESULT_EMPTY,
} from "../constants";

export const forgotPasswordRequest = (payload: object) => {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload: payload,
  };
};

export const forgotPasswordSuccess = (data: object) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: data,
  };
};

export const forgotPasswordResultEmpty = () => {
  return {
    type: FORGOT_PASSWORD_RESULT_EMPTY,
  };
};
