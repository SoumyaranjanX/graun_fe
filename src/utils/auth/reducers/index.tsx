import { combineReducers } from "redux";
import orderReducer from "./orderReducer";
import configureStore from "../../../";
import rootSaga from "../sagas";
import signUpReducer from "./signUpReducer";
import verifyEmailReducer from "./verifyEmailReducer";
import logInReducer from "./logInReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import resetPasswordReducer from "./resetPasswordReducer";


export default () => {
  const rootReducer = combineReducers({
    orderReducer,
    signUpReducer,
    verifyEmailReducer,
    logInReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
