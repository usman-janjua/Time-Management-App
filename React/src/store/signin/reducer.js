import * as actionTypes from "./constants";
import { updateObject } from "../../helpers/UpdateObject";

const initialState = {
  isInitiated: false,
  isSuccess: false,
  isFailed: false,
  message: null,
};

const loginInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const loginSuccess = (state) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    // message: action.msg,
  });
};
const loginFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_INITIATED:
      return loginInitiated(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAILED:
      return loginFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
