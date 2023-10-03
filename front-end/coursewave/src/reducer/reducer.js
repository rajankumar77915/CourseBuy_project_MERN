import {combineReducers} from "@reduxjs/toolkit";

import authReducer from '../slics/authSlice'
import profileReducer from "../slics/profileSlice";
import cartReducer from "../slics/cartSlice"
import courseReducer from "../slics/courseSlice"
import viewCourseReducer from "../slics/viewCourseSlice"

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer
})

export default rootReducer