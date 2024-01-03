import { combineReducers } from "@reduxjs/toolkit";
import callListReducer from "../slices/callListSlice";
import currPageCallListReducer from "../slices/currPageSlice";


const rootReducer = combineReducers({
    callList : callListReducer,
    currPage : currPageCallListReducer
})

export default rootReducer;