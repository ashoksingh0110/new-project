import { combineReducers } from "redux";
import UserReducer from "./UserReducer";

const reducer = combineReducers({
    users:UserReducer
})

export default reducer;

 