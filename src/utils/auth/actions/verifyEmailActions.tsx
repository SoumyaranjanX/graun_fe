import {
  GET_EMAIL_VERIFICATION_SUCCESS,
  GET_EMAIL_VERIFICATION_REQUEST,
} from "../../auth/constants";

export const getEmailVerificationRequest = (payload: object) => {
  return {
    type: GET_EMAIL_VERIFICATION_REQUEST,
    payload: payload,
  };
};

export const getEmailVerificationSuccess = (data: object) => {
  return {
    type: GET_EMAIL_VERIFICATION_SUCCESS,
    payload: data,
  };
};
