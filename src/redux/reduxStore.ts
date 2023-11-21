import rootReducer from "./reducers/rootReducer";
import { legacy_createStore } from "redux";


const reduxStore = legacy_createStore(rootReducer);

export default reduxStore;