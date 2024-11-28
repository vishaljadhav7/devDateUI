import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name : "request",
    initialState : null,
    reducers : {
        addRequest : (state, action) => {
            return action.payload
        },
        removeRequest : (state, action) => {
            const allRequests = state.filter((request) => request._id !== action.payload) 
            return allRequests
        }
    }
})

export const {addRequest, removeRequest} = requestSlice.actions

export default requestSlice.reducer