import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { statusReducer } from "./statusReducer";

export const Reducers = combineReducers({
  authReducer,
  statusReducer,
});
