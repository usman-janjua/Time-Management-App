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
  managersDataInitiated,
  managersDataSuccess,
  managersDataFailed,
  createUserInitiated,
  createUserSuccess,
  createUserFailed,
  updateUserInitiated,
  updateUserSuccess,
  updateUserFailed,
  deleteUserInitiated,
  deleteUserSuccess,
  deleteUserFailed,
  createManagerInitiated,
  createManagerSuccess,
  createManagerFailed,
  updateManagerInitiated,
  updateManagerSuccess,
  updateManagerFailed,
  deleteManagerInitiated,
  deleteManagerSuccess,
  deleteManagerFailed,
} from "./actions";

export const adminUsersData = () => async (dispatch) => {
  dispatch(usersDataInitiated());
  apiGetRequest("auth/getUsersAdmin")
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

export const adminManagersData = () => async (dispatch) => {
  dispatch(managersDataInitiated());
  apiGetRequest("auth/getManagersAdmin")
    .then((res) => {
      if (res.status !== 200) {
        dispatch(managersDataFailed(res.data.error.message));
      }
      if (res.status === 200) {
        dispatch(managersDataSuccess(res.data.managers));
      }
    })
    .catch((err) => {
      dispatch(managersDataFailed(err));
    });
};
export const createUserAdmin = (values) => async (dispatch) => {
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

export const updateUserAdmin = (values) => async (dispatch) => {
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

export const deleteUserAdmin = (values) => async (dispatch) => {
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

export const createManagerAdmin = (values) => async (dispatch) => {
  dispatch(createManagerInitiated());
  try {
    let res = await apiPostRequest("auth/register", values);
    if (res.status !== 200) {
      dispatch(createManagerFailed(res.data.error.message));
    }
    if (res.status === 200) {
      dispatch(createManagerSuccess(res.data.user));
    }
  } catch (err) {
    dispatch(createManagerFailed("Something went wrong!"));
  }
};

export const updateManagerAdmin = (values) => async (dispatch) => {
  dispatch(updateManagerInitiated());
  try {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
    };
    let res = await apiPutRequest(`auth/edit/user/${values._id}`, data);
    if (res.status !== 200) {
      dispatch(updateManagerFailed(res.data.error.message));
    }
    if (res.status === 200) {
      dispatch(updateManagerSuccess(res.data.message, values));
    }
  } catch (err) {
    dispatch(updateManagerFailed("Something went wrong!"));
  }
};

export const deleteManagerAdmin = (values) => async (dispatch) => {
  dispatch(deleteManagerInitiated());
  try {
    let res = await apiDeleteRequest(`auth/delete/${values._id}`);
    if (res.status !== 200) {
      dispatch(deleteManagerFailed(res.data.error.message));
    }
    if (res.status === 200) {
      dispatch(deleteManagerSuccess(res.data.message, values));
    }
  } catch (err) {
    dispatch(deleteManagerFailed("Something went wrong!"));
  }
};
