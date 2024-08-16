import {
  GET_SIGNUP_REQUEST,
  GET_SIGNUP_SUCCESS,
  MAKE_NEW_SIGNUP,
} from "../constants";

const initialState = {
  result: {},
  loading: false,
  error: null,
};

const signUpReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_SIGNUP_SUCCESS:
      return {
        result: action.payload,
        loading: false,
        error: null,
      };
    case MAKE_NEW_SIGNUP:
      return {
        result: {},
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default signUpReducer;
