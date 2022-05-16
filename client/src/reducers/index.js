import {combineReducers} from "redux";
import auth from "./auth";
import ticket from "./ticket";
export default combineReducers({
    auth,
    ticket
})