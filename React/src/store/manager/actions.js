import * as actionTypes from "./constants";

export const usersDataInitiated = () => {
  return {
    type: actionTypes.MANAGER_USERS_DATA_INITIATED,
  };
};

export const usersDataSuccess = (users) => {
  return {
    type: actionTypes.MANAGER_USERS_DATA_SUCCESS,
    users,
  };
};

export const usersDataFailed = (msg) => {
  return {
    type: actionTypes.MANAGER_USERS_DATA_FAILED,
    msg,
  };
};

export const createUserInitiated = () => {
  return {
    type: actionTypes.CREATE_USER_INITIATED,
  };
};

export const createUserSuccess = (data) => {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
    data,
  };
};

export const createUserFailed = (msg) => {
  return {
    type: actionTypes.CREATE_USER_FAILED,
    msg,
  };
};

export const updateUserInitiated = () => {
  return {
    type: actionTypes.UPDATE_USER_INITIATED,
  };
};

export const updateUserSuccess = (msg, user) => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    msg,
    user,
  };
};

export const updateUserFailed = (msg) => {
  return {
    type: actionTypes.UPDATE_USER_FAILED,
    msg,
  };
};

export const deleteUserInitiated = () => {
  return {
    type: actionTypes.DELETE_USER_INITIATED,
  };
};

export const deleteUserSuccess = (msg, user) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    msg,
    user,
  };
};

export const deleteUserFailed = (msg) => {
  return {
    type: actionTypes.DELETE_USER_FAILED,
    msg,
  };
};
