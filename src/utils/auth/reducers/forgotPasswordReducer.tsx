import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_RESULT_EMPTY,
} from "../constants";

const initialState = {
  result: {},
  loading: false,
  error: null,
};

const forgotPasswordReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        result: action.payload,
        loading: false,
        error: null,
      };
    case FORGOT_PASSWORD_RESULT_EMPTY:
      return {
        ...state,
        result: {},
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default forgotPasswordReducer;
