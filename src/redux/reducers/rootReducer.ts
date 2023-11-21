import userDataReducer from "./userDataReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userDataReducer,
});

export default rootReducer;