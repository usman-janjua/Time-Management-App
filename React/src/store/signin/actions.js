import * as actionTypes from "./constants";

export const loginInitiated = () => {
  return {
    type: actionTypes.LOGIN_INITIATED,
  };
};

export const loginSuccess = (msg) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    msg,
  };
};

export const loginFailed = (msg) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    msg,
  };
};
