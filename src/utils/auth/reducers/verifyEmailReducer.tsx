import {
  GET_EMAIL_VERIFICATION_REQUEST,
  GET_EMAIL_VERIFICATION_SUCCESS,
} from "../constants";

const initialState = {
  result: {},
  loading: false,
  error: null,
};

const verifyEmailReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_EMAIL_VERIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        result: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default verifyEmailReducer;
