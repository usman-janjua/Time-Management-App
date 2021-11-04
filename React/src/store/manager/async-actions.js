import {
  apiGetRequest,
  apiPostRequest,
  apiPutRequest,
  apiDeleteRequest,
} from "../../helpers/Requests";
import {
  usersDataInitiated,
  usersDataSuccess,
  usersDataFailed,
  createUserInitiated,
  createUserSuccess,
  createUserFailed,
  updateUserInitiated,
  updateUserSuccess,
  updateUserFailed,
  deleteUserInitiated,
  deleteUserSuccess,
  deleteUserFailed,
} from "./actions";

export const managerUsersData = () => async (dispatch) => {
  dispatch(usersDataInitiated());
  apiGetRequest("auth/getUsersManager")
    .then((res) => {
      if (res.status !== 200) {
        dispatch(usersDataFailed(res.data.error.message));
      }
      if (res.status === 200) {
        dispatch(usersDataSuccess(res.data.users));
      }
    })
    .catch((err) => {
      dispatch(usersDataFailed(err));
    });
};

export const createUserManager = (values) => async (dispatch) => {
  dispatch(createUserInitiated());
  try {
    let res = await apiPostRequest("auth/register", values);
    if (res.status !== 200) {
      dispatch(createUserFailed(res.data.error.message));
    }
    if (res.status === 200) {
      dispatch(createUserSuccess(res.data.user));
    }
  } catch (err) {
    dispatch(createUserFailed("Something went wrong!"));
  }
};

export const updateUserManager = (values) => async (dispatch) => {
  dispatch(updateUserInitiated());
  try {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
    };
    let res = await apiPutRequest(`auth/edit/user/${values._id}`, data);
    if (res.status !== 200) {
      dispatch(updateUserFailed(res.data.error.message));
    }
    if (res.status === 200) {
      dispatch(updateUserSuccess(res.data.message, values));
    }
  } catch (err) {
    dispatch(updateUserFailed("Something went wrong!"));
  }
};

export const deleteUserManager = (values) => async (dispatch) => {
  dispatch(deleteUserInitiated());
  try {
    let res = await apiDeleteRequest(`auth/delete/${values._id}`);
    if (res.status !== 200) {
      dispatch(deleteUserFailed(res.data.error.message));
    }
    if (res.status === 200) {
      dispatch(deleteUserSuccess(res.data.message, values));
    }
  } catch (err) {
    dispatch(deleteUserFailed("Something went wrong!"));
  }
};
