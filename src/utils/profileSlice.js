import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name : "profile",
    initialState : {
        showEditProfile : false,
    },
    reducers : {
       toggleEditProfileView : (state, action) => {
          state.showEditProfile = action.payload 
       }
    }
})


export const  {toggleEditProfileView} = profileSlice.actions;

export default profileSlice.reducer