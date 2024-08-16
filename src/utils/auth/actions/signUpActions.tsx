import {
  GET_SIGNUP_REQUEST,
  GET_SIGNUP_SUCCESS,
  MAKE_NEW_SIGNUP,
} from "../utils/constant";

export const getSignUpRequest = (payload: object) => {
  return {
    type: GET_SIGNUP_REQUEST,
    payload: payload,
  };
};

export const getSignUpSuccess = (data: object) => {
  return {
    type: GET_SIGNUP_SUCCESS,
    payload: data,
  };
};

export const makeNewRequest = () => {
  return {
    type: MAKE_NEW_SIGNUP,
  };
};
