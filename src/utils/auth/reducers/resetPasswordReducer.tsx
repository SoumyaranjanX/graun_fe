import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from "../constants";

const initialState = {
  result: {},
  loading: false,
  error: null,
};

const resetPasswordReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case RESET_PASSWORD_SUCCESS:
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

export default resetPasswordReducer;
