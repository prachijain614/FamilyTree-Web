import { combineReducers } from "redux";
import familyReducer from "./Family/reducer";

const rootReducer = combineReducers({
  familyReducer
});

export default rootReducer;
