import { createSlice } from "@reduxjs/toolkit";


const connectionSlice = createSlice({
    name : "connections",
    initialState : [],
    reducers : {
        addConnections : (state, action) => {
            return action.payload
        },
        removeConnection : (state, action) => {
            const allConnections = state.filter(connection => connection._id !== action.payload)
            return allConnections
        }
    } 
})

export const {addConnections, removeConnection} = connectionSlice.actions

export default connectionSlice.reducer