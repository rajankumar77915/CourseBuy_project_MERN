import {combineReducers} from "@reduxjs/toolkit";

import authReducer from '../slics/authSlice'
import profileReducer from "../slics/profileSlice";
import cartReducer from "../slics/cartSlice"

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
})

export default rootReducer