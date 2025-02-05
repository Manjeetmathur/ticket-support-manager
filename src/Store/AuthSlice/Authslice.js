import { createSlice } from "@reduxjs/toolkit";

const initialState={
       status : false,
       userData : {},
}

const authSlice = createSlice({
       name : "auth",
       initialState,
       reducers : {
              userDetails(state,action) {
                     console.log(action.payload)
                     state.userData=action.payload
                     state.status=true
                     console.log(state.userData)


              }
       }
})

export const  {userDetails,userData} = authSlice.actions
export default authSlice.reducer