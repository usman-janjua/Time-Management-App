import * as actionTypes from "./constants";
import { updateObject } from "../../helpers/UpdateObject";
import _ from "lodash";

const initialState = {
  isInitiated: false,
  isSuccess: false,
  isFailed: false,
  users: [],
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MANAGER_USERS_DATA_INITIATED:
      return usersDataInitiated(state, action);
    case actionTypes.MANAGER_USERS_DATA_SUCCESS:
      return usersDataSuccess(state, action);
    case actionTypes.MANAGER_USERS_DATA_FAILED:
      return usersDataFailed(state, action);
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
    default:
      return state;
  }
};

export default reducer;
