import { createSlice } from "@reduxjs/toolkit";

const coreSlice = createSlice({
    name : "core",
    initialState : null ,
    reducers : {
        addFeed: (state, action) => {
            return action.payload;
          },
          removeUserFromFeed: (state, action) => {
            const newFeed = state.filter((user) => user._id !== action.payload);
            return newFeed;
        },
    }
})

export const {addFeed , removeUserFromFeed} = coreSlice.actions;

export default coreSlice.reducer;