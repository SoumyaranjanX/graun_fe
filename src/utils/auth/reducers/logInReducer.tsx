import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../constants";

const initialState = {
  result: {},
  loading: false,
  error: null,
};

const logInReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
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

export default logInReducer;
