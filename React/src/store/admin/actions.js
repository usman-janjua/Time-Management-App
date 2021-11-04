import * as actionTypes from "./constants";

export const usersDataInitiated = () => {
  return {
    type: actionTypes.USERS_DATA_INITIATED,
  };
};

export const usersDataSuccess = (users) => {
  return {
    type: actionTypes.USERS_DATA_SUCCESS,
    users,
  };
};

export const usersDataFailed = (msg) => {
  return {
    type: actionTypes.USERS_DATA_FAILED,
    msg,
  };
};

export const managersDataInitiated = () => {
  return {
    type: actionTypes.MANAGERS_DATA_INITIATED,
  };
};

export const managersDataSuccess = (managers) => {
  return {
    type: actionTypes.MANAGERS_DATA_SUCCESS,
    managers,
  };
};

export const managersDataFailed = (msg) => {
  return {
    type: actionTypes.MANAGERS_DATA_FAILED,
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

export const createManagerInitiated = () => {
  return {
    type: actionTypes.CREATE_MANAGER_INITIATED,
  };
};

export const createManagerSuccess = (data) => {
  return {
    type: actionTypes.CREATE_MANAGER_SUCCESS,
    data,
  };
};

export const createManagerFailed = (msg) => {
  return {
    type: actionTypes.CREATE_MANAGER_FAILED,
    msg,
  };
};

export const updateManagerInitiated = () => {
  return {
    type: actionTypes.UPDATE_MANAGER_INITIATED,
  };
};

export const updateManagerSuccess = (msg, manager) => {
  return {
    type: actionTypes.UPDATE_MANAGER_SUCCESS,
    msg,
    manager,
  };
};

export const updateManagerFailed = (msg) => {
  return {
    type: actionTypes.UPDATE_MANAGER_FAILED,
    msg,
  };
};

export const deleteManagerInitiated = () => {
  return {
    type: actionTypes.DELETE_MANAGER_INITIATED,
  };
};

export const deleteManagerSuccess = (msg, manager) => {
  return {
    type: actionTypes.DELETE_MANAGER_SUCCESS,
    msg,
    manager,
  };
};

export const deleteManagerFailed = (msg) => {
  return {
    type: actionTypes.DELETE_MANAGER_FAILED,
    msg,
  };
};
