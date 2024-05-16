import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import interviewReducer from "../reducers/interviewReducer";
import scheduleReducer from "../reducers/scheduleReducer";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        schedule:scheduleReducer,
        interview:interviewReducer
    }
})