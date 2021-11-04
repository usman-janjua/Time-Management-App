import * as actionTypes from "./constants";
import { updateObject } from "../../helpers/UpdateObject";
import _ from "lodash";

const initialState = {
  isInitiated: false,
  isSuccess: false,
  isFailed: false,
  message: null,
  workLogs: [],
  settings: null,
};

const workLogsDataInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const workLogsDataSuccess = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    workLogs: action.workLogs,
  });
};
const workLogsDataFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const createWorkLogInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const createWorkLogSuccess = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    message: action.msg,
  });
};
const createWorkLogFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const updateWorkLogInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};

const updateWorkLogSuccess = (state, action) => {
  const workLogs = _.cloneDeep(state.workLogs);
  const workLogIndex = state.workLogs.findIndex((workLog) => {
    return workLog._id === action.data._id;
  });
  const workLog = { ...state.workLogs[workLogIndex] };
  workLog.date = action.data.date;
  workLog.hours = action.data.hours;
  workLog.note = action.data.note;
  workLogs[workLogIndex] = workLog;
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    message: action.msg,
    workLogs: workLogs,
  });
};

const updateWorkLogFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const deleteWorkLogInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const deleteWorkLogSuccess = (state, action) => {
  const workLogs = _.cloneDeep(state.workLogs);
  workLogs.splice(
    _.findIndex((log) => log._id === action.id),
    1
  );
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    workLogs: workLogs,
    message: action.msg,
  });
};
const deleteWorkLogFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const getHoursInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const getHoursSuccess = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    settings: action.setting,
  });
};
const getHoursFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const addHoursInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const addHoursSuccess = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    hours: action.hours,
  });
};
const addHoursFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const changeHoursInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const changeHoursSuccess = (state, action) => {
  const settings = _.cloneDeep(state.settings);
  settings.hours = action.hours;
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    settings: settings,
  });
};
const changeHoursFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const searchWorkLogInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const searchWorkLogSuccess = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    workLogs: action.data,
  });
};
const searchWorkLogFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WORK_LOGS_DATA_INITIATED:
      return workLogsDataInitiated(state, action);
    case actionTypes.WORK_LOGS_DATA_SUCCESS:
      return workLogsDataSuccess(state, action);
    case actionTypes.WORK_LOGS_DATA_FAILED:
      return workLogsDataFailed(state, action);
    case actionTypes.CREATE_WORK_LOG_INITIATED:
      return createWorkLogInitiated(state, action);
    case actionTypes.CREATE_WORK_LOG_SUCCESS:
      return createWorkLogSuccess(state, action);
    case actionTypes.CREATE_WORK_LOG_FAILED:
      return createWorkLogFailed(state, action);
    case actionTypes.UPDATE_WORK_LOG_INITIATED:
      return updateWorkLogInitiated(state, action);
    case actionTypes.UPDATE_WORK_LOG_SUCCESS:
      return updateWorkLogSuccess(state, action);
    case actionTypes.UPDATE_WORK_LOG_FAILED:
      return updateWorkLogFailed(state, action);
    case actionTypes.DELETE_WORK_LOG_INITIATED:
      return deleteWorkLogInitiated(state, action);
    case actionTypes.DELETE_WORK_LOG_SUCCESS:
      return deleteWorkLogSuccess(state, action);
    case actionTypes.DELETE_WORK_LOG_FAILED:
      return deleteWorkLogFailed(state, action);
    case actionTypes.SEARCH_WORK_LOG_INITIATED:
      return searchWorkLogInitiated(state, action);
    case actionTypes.SEARCH_WORK_LOG_SUCCESS:
      return searchWorkLogSuccess(state, action);
    case actionTypes.SEARCH_WORK_LOG_FAILED:
      return searchWorkLogFailed(state, action);
    case actionTypes.GET_HOURS_INITIATED:
      return getHoursInitiated(state, action);
    case actionTypes.GET_HOURS_SUCCESS:
      return getHoursSuccess(state, action);
    case actionTypes.GET_HOURS_FAILED:
      return getHoursFailed(state, action);
    case actionTypes.ADD_HOURS_INITIATED:
      return addHoursInitiated(state, action);
    case actionTypes.ADD_HOURS_SUCCESS:
      return addHoursSuccess(state, action);
    case actionTypes.ADD_HOURS_FAILED:
      return addHoursFailed(state, action);
    case actionTypes.CHANGE_HOURS_INITIATED:
      return changeHoursInitiated(state, action);
    case actionTypes.CHANGE_HOURS_SUCCESS:
      return changeHoursSuccess(state, action);
    case actionTypes.CHANGE_HOURS_FAILED:
      return changeHoursFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
