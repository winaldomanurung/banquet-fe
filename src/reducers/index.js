import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { albumReducer } from "./albumReducer";

export const Reducers = combineReducers({
  authReducer,
  albumReducer,
});
