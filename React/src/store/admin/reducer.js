import * as actionTypes from "./constants";
import { updateObject } from "../../helpers/UpdateObject";
import _ from "lodash";

const initialState = {
  isInitiated: false,
  isSuccess: false,
  isFailed: false,
  users: [],
  managers: [],
  message: null,
};

const usersDataInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const usersDataSuccess = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    users: action.users,
  });
};
const usersDataFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const managersDataInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};

const managersDataSuccess = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    managers: action.managers,
  });
};
const managersDataFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const createUserInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const createUserSuccess = (state, action) => {
  const users = _.cloneDeep(state.users);
  users.push(action.data);
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    users: users,
  });
};
const createUserFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const updateUserInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const updateUserSuccess = (state, action) => {
  const users = _.cloneDeep(state.users);
  const userIndex = state.users.findIndex((user) => {
    return user._id === action.user._id;
  });
  const user = { ...state.users[userIndex] };
  user.name = action.user.name;
  user.username = action.user.username;
  user.email = action.user.email;
  users[userIndex] = user;
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    users: users,
  });
};
const updateUserFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const deleteUserInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const deleteUserSuccess = (state, action) => {
  const users = _.cloneDeep(state.users);
  users.splice(
    _.findIndex((user) => user._id === action.user._id),
    1
  );
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    users: users,
  });
};
const deleteUserFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const createManagerInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const createManagerSuccess = (state, action) => {
  const managers = _.cloneDeep(state.managers);
  managers.push(action.data);
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    managers: managers,
  });
};
const createManagerFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const updateManagerInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const updateManagerSuccess = (state, action) => {
  const managers = _.cloneDeep(state.managers);
  const managerIndex = state.managers.findIndex((manager) => {
    return manager._id === action.manager._id;
  });
  const manager = { ...state.managers[managerIndex] };
  manager.name = action.manager.name;
  manager.username = action.manager.username;
  manager.email = action.manager.email;
  managers[managerIndex] = manager;
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    managers: managers,
  });
};
const updateManagerFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const deleteManagerInitiated = (state) => {
  return updateObject(state, {
    isInitiated: true,
    isSuccess: false,
    isFailed: false,
  });
};
const deleteManagerSuccess = (state, action) => {
  const managers = _.cloneDeep(state.managers);
  managers.splice(
    _.findIndex((manager) => manager._id === action.manager._id),
    1
  );
  return updateObject(state, {
    isInitiated: false,
    isSuccess: true,
    isFailed: false,
    message: action.msg,
    managers: managers,
  });
};
const deleteManagerFailed = (state, action) => {
  return updateObject(state, {
    isInitiated: false,
    isSuccess: false,
    isFailed: true,
    message: action.msg,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USERS_DATA_INITIATED:
      return usersDataInitiated(state, action);
    case actionTypes.USERS_DATA_SUCCESS:
      return usersDataSuccess(state, action);
    case actionTypes.USERS_DATA_FAILED:
      return usersDataFailed(state, action);
    case actionTypes.MANAGERS_DATA_INITIATED:
      return managersDataInitiated(state, action);
    case actionTypes.MANAGERS_DATA_SUCCESS:
      return managersDataSuccess(state, action);
    case actionTypes.MANAGERS_DATA_FAILED:
      return managersDataFailed(state, action);
    case actionTypes.CREATE_USER_INITIATED:
      return createUserInitiated(state, action);
    case actionTypes.CREATE_USER_SUCCESS:
      return createUserSuccess(state, action);
    case actionTypes.CREATE_USER_FAILED:
      return createUserFailed(state, action);
    case actionTypes.UPDATE_USER_INITIATED:
      return updateUserInitiated(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    case actionTypes.UPDATE_USER_FAILED:
      return updateUserFailed(state, action);
    case actionTypes.DELETE_USER_INITIATED:
      return deleteUserInitiated(state, action);
    case actionTypes.DELETE_USER_SUCCESS:
      return deleteUserSuccess(state, action);
    case actionTypes.DELETE_USER_FAILED:
      return deleteUserFailed(state, action);
    case actionTypes.CREATE_MANAGER_INITIATED:
      return createManagerInitiated(state, action);
    case actionTypes.CREATE_MANAGER_SUCCESS:
      return createManagerSuccess(state, action);
    case actionTypes.CREATE_MANAGER_FAILED:
      return createManagerFailed(state, action);
    case actionTypes.UPDATE_MANAGER_INITIATED:
      return updateManagerInitiated(state, action);
    case actionTypes.UPDATE_MANAGER_SUCCESS:
      return updateManagerSuccess(state, action);
    case actionTypes.UPDATE_MANAGER_FAILED:
      return updateManagerFailed(state, action);
    case actionTypes.DELETE_MANAGER_INITIATED:
      return deleteManagerInitiated(state, action);
    case actionTypes.DELETE_MANAGER_SUCCESS:
      return deleteManagerSuccess(state, action);
    case actionTypes.DELETE_MANAGER_FAILED:
      return deleteManagerFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
