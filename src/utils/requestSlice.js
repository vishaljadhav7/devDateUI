import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name : "request",
    initialState : [],
    reducers : {
        addRequest : (state, action) => {
            return action.payload
        },
        removeRequest : (state, action) => {
            const allRequests = state.filter((request) => request._id !== action.payload) 
            return allRequests
        },
        clearRequests : () => {
            return []
        }
    }
})

export const {addRequest, removeRequest, clearRequests} = requestSlice.actions

export default requestSlice.reducer