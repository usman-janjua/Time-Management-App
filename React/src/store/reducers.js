import { combineReducers } from "redux";
import signinReducer from "./signin/reducer";
import signupReducer from "./signup/reducer";
import adminReducer from "./admin/reducer";
import managerReducer from "./manager/reducer";
import userReducer from "./user/reducer";

const reducers = combineReducers({
  signin: signinReducer,
  signup: signupReducer,
  admin: adminReducer,
  manager: managerReducer,
  user: userReducer,
});

export default reducers;
