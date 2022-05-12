import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { statusReducer } from "./statusReducer";
import { restaurantReducer } from "./restaurantReducer";

export const Reducers = combineReducers({
  authReducer,
  statusReducer,
  restaurantReducer,
});
