import * as actionTypes from "./constants";
import { updateObject } from "../../helpers/UpdateObject";

const initialState = {
  isInitiated: false,
  isSuccess: false,
  isFailed: false,
  message: null,
};

const signupInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const signupSuccess = (state, action) => {
  console.log(action.msg);
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    message: action.msg,
  });
};
const signupFailed = (state, action) => {
  console.log(action.msg);
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_INITIATED:
      return signupInitiated(state, action);
    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case actionTypes.SIGNUP_FAILED:
      return signupFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
