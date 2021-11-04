import * as actionTypes from "./constants";

export const signupInitiated = () => {
  return {
    type: actionTypes.SIGNUP_INITIATED,
  };
};

export const signupSuccess = (msg) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    msg,
  };
};

export const signupFailed = (msg) => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    msg,
  };
};
