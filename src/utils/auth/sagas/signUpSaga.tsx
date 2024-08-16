import { put, call } from "redux-saga/effects";
import { getAllOrdersFailure, getSignUpSuccess } from "../actions";
import { postApi } from "../services/apiinterface";

interface signUpSaga {
  type: string;
  payload: any;
}

function* signUpSaga(action: any): Generator<any, void, any> {
  const path = "/api/auth/signUp";
  const body = action.payload;
  try {
    // Make the API call using call effect
    const creds = yield call(postApi, path, body);
    // Dispatch success action
    yield put(getSignUpSuccess(creds));
  } catch (error) {
    // Dispatch failure action
    yield put(getAllOrdersFailure(error)); // Corrected action dispatch
  }
}

export default signUpSaga;
