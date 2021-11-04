import * as actionTypes from "./constants";

export const workLogsDataInitiated = () => {
  return {
    type: actionTypes.WORK_LOGS_DATA_INITIATED,
  };
};

export const workLogsDataSuccess = (workLogs) => {
  return {
    type: actionTypes.WORK_LOGS_DATA_SUCCESS,
    workLogs,
  };
};

export const workLogsDataFailed = (msg) => {
  return {
    type: actionTypes.WORK_LOGS_DATA_FAILED,
    msg,
  };
};

export const createWorkLogInitiated = () => {
  return {
    type: actionTypes.CREATE_WORK_LOG_INITIATED,
  };
};

export const createWorkLogSuccess = (msg) => {
  return {
    type: actionTypes.CREATE_WORK_LOG_SUCCESS,
    msg,
  };
};

export const createWorkLogFailed = (msg) => {
  return {
    type: actionTypes.CREATE_WORK_LOG_FAILED,
    msg,
  };
};

export const updateWorkLogInitiated = () => {
  return {
    type: actionTypes.UPDATE_WORK_LOG_INITIATED,
  };
};

export const updateWorkLogSuccess = (msg, data) => {
  return {
    type: actionTypes.UPDATE_WORK_LOG_SUCCESS,
    msg,
    data,
  };
};

export const updateWorkLogFailed = (msg) => {
  return {
    type: actionTypes.UPDATE_WORK_LOG_FAILED,
    msg,
  };
};

export const deleteWorkLogInitiated = () => {
  return {
    type: actionTypes.DELETE_WORK_LOG_INITIATED,
  };
};

export const deleteWorkLogSuccess = (msg, id) => {
  return {
    type: actionTypes.DELETE_WORK_LOG_SUCCESS,
    msg,
    id,
  };
};

export const deleteWorkLogFailed = (msg) => {
  return {
    type: actionTypes.DELETE_WORK_LOG_FAILED,
    msg,
  };
};

export const searchWorkLogInitiated = () => {
  return {
    type: actionTypes.SEARCH_WORK_LOG_INITIATED,
  };
};

export const searchWorkLogSuccess = (data) => {
  return {
    type: actionTypes.SEARCH_WORK_LOG_SUCCESS,
    data,
  };
};

export const searchWorkLogFailed = (msg) => {
  return {
    type: actionTypes.SEARCH_WORK_LOG_FAILED,
    msg,
  };
};

export const getHoursInitiated = () => {
  return {
    type: actionTypes.GET_HOURS_INITIATED,
  };
};

export const getHoursSuccess = (setting) => {
  return {
    type: actionTypes.GET_HOURS_SUCCESS,
    setting,
  };
};

export const getHoursFailed = (msg) => {
  return {
    type: actionTypes.GET_HOURS_FAILED,
    msg,
  };
};

export const addHoursInitiated = () => {
  return {
    type: actionTypes.ADD_HOURS_INITIATED,
  };
};

export const addHoursSuccess = (hours) => {
  return {
    type: actionTypes.ADD_HOURS_SUCCESS,
    hours,
  };
};

export const addHoursFailed = (msg) => {
  return {
    type: actionTypes.ADD_HOURS_FAILED,
    msg,
  };
};

export const changeHoursInitiated = () => {
  return {
    type: actionTypes.CHANGE_HOURS_INITIATED,
  };
};

export const changeHoursSuccess = (msg, hours) => {
  return {
    type: actionTypes.CHANGE_HOURS_SUCCESS,
    msg,
    hours,
  };
};

export const changeHoursFailed = (msg) => {
  return {
    type: actionTypes.CHANGE_HOURS_FAILED,
    msg,
  };
};
