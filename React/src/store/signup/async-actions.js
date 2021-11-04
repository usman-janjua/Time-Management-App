import { apiPostRequest } from "../../helpers/Requests";
import { signupInitiated, signupSuccess, signupFailed } from "./actions";

export const signupUser = (values) => async (dispatch) => {
  dispatch(signupInitiated());
  apiPostRequest("auth/register", values)
    .then((res) => {
      if (res.status !== 200) {
        dispatch(signupFailed(res.data.error.message));
      }
      if (res.status === 200) {
        dispatch(signupSuccess(res.data.message));
      }
    })
    .catch((err) => {
      dispatch(signupFailed(err));
    });
};
