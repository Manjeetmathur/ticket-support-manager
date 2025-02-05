import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice/Authslice"
export const store = configureStore({
       reducer :{
              auth : authReducer
       }
})