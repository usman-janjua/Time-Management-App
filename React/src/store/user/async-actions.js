import {
  apiGetRequest,
  apiPostRequest,
  apiPutRequest,
  apiDeleteRequest,
} from "../../helpers/Requests";
import {
  workLogsDataInitiated,
  workLogsDataSuccess,
  workLogsDataFailed,
  createWorkLogInitiated,
  createWorkLogSuccess,
  createWorkLogFailed,
  updateWorkLogInitiated,
  updateWorkLogSuccess,
  updateWorkLogFailed,
  deleteWorkLogInitiated,
  deleteWorkLogSuccess,
  deleteWorkLogFailed,
  searchWorkLogInitiated,
  searchWorkLogSuccess,
  searchWorkLogFailed,
  getHoursInitiated,
  getHoursSuccess,
  getHoursFailed,
  addHoursInitiated,
  addHoursSuccess,
  addHoursFailed,
  changeHoursInitiated,
  changeHoursSuccess,
  changeHoursFailed,
} from "./actions";

export const workLogData = () => async (dispatch) => {
  dispatch(workLogsDataInitiated());
  apiGetRequest("worklog")
    .then((res) => {
      if (res.status !== 200) {
        dispatch(workLogsDataFailed(res.data.error.message));
      }
      if (res.status === 200) {
        dispatch(workLogsDataSuccess(res.data.worklogs));
      }
    })
    .catch((err) => {
      dispatch(workLogsDataFailed(err));
    });
};

export const createWorkLog = (values) => async (dispatch) => {
  dispatch(createWorkLogInitiated());
  try {
    let res = await apiPostRequest("worklog/add", values);
    if (res.status !== 200) {
      dispatch(createWorkLogFailed(res.data.error.message));
    }
    if (res.status === 200) {
      dispatch(createWorkLogSuccess(res.data.message));
    }
  } catch (err) {
    dispatch(createWorkLogFailed("Something Went Wrong"));
  }
};

export const updateWorkLog = (values) => async (dispatch) => {
  dispatch(updateWorkLogInitiated());
  const data = {
    hours: values.hours,
    date: values.date,
    note: values.note,
  };
  try {
    let res = await apiPutRequest(`worklog/edit/${values._id}`, data);
    if (res.status !== 200) {
      dispatch(updateWorkLogFailed(res.data.error.message));
    } else if (res.status === 200) {
      dispatch(updateWorkLogSuccess(res.data.message, values));
    }
  } catch (err) {
    dispatch(updateWorkLogFailed("Something Went Wrong"));
  }
};

export const deleteWorkLog = (values) => async (dispatch) => {
  dispatch(deleteWorkLogInitiated());
  try {
    let res = await apiDeleteRequest(`worklog/delete/${values._id}`);
    if (res.status !== 200) {
      dispatch(deleteWorkLogFailed(res.data.error.message));
    } else if (res.status === 200) {
      dispatch(deleteWorkLogSuccess(res.data.message, values));
    }
  } catch (err) {
    dispatch(deleteWorkLogFailed("Something Went Wrong"));
  }
};

export const searchWorkLog = (values) => async (dispatch) => {
  dispatch(searchWorkLogInitiated());
  try {
    let res = await apiPostRequest(`worklog/filterworklog`, values);
    if (res.status !== 200) {
      dispatch(searchWorkLogFailed(res.data.error.message));
    } else if (res.status === 200) {
      dispatch(searchWorkLogSuccess(res.data.worklogs));
    }
  } catch (err) {
    dispatch(searchWorkLogFailed("Something Went Wrong"));
  }
};

export const getHours = () => async (dispatch) => {
  dispatch(getHoursInitiated());
  try {
    let res = await apiGetRequest(`setting/`);
    // console.log(res);
    if (res.status !== 200) {
      dispatch(getHoursFailed(res.data.error.message));
    } else if (res.status === 200) {
      dispatch(getHoursSuccess(res.data.setting));
    }
  } catch (err) {
    dispatch(getHoursFailed("Something Went Wrong"));
  }
};

export const addHours = (values) => async (dispatch) => {
  dispatch(addHoursInitiated());
  try {
    let res = await apiPostRequest(`setting/add`, values);
    if (res.status !== 200) {
      dispatch(addHoursFailed(res.data.error.message));
    } else if (res.status === 200) {
      dispatch(addHoursSuccess(res.data.user.hours));
    }
  } catch (err) {
    dispatch(addHoursFailed("Something Went Wrong"));
  }
};

export const changeHours = (values) => async (dispatch) => {
  dispatch(changeHoursInitiated());
  const data = {
    hours: values.hours,
  };
  try {
    let res = await apiPutRequest(`setting/edit/${values.id}`, data);
    console.log(res);

    if (res.status !== 200) {
      dispatch(changeHoursFailed(res.data.error.message));
    } else if (res.status === 200) {
      dispatch(changeHoursSuccess(res.data.message, values.hours));
    }
  } catch (err) {
    dispatch(changeHoursFailed("Something Went Wrong"));
  }
};
