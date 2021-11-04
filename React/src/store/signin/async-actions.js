import { apiPostRequest } from "../../helpers/Requests";
import { setToken } from "../../helpers/Tokens";
import { loginInitiated, loginSuccess, loginFailed } from "./actions";

export const loginUser = (values, history) => async (dispatch) => {
  dispatch(loginInitiated());
  try {
    let res = await apiPostRequest("auth/login", values);
    if (res.status !== 200) {
      dispatch(loginFailed(res.data.error.message));
    }
    if (res.status === 200) {
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);
      setToken(res.data.token);
      dispatch(loginSuccess());
      history.push("/dashboard");
    }
  } catch (err) {
    dispatch(loginFailed("Network Issue!"));
  }
};
