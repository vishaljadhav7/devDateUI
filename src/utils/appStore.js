import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../utils/userSlice'
import profileReducer from '../utils/profileSlice'
import coreReducer from '../utils/coreSlice'


 const appStore = configureStore({
    reducer: {
      user: userReducer,
      profile : profileReducer,
      core : coreReducer
    //   connections: connectionReducer,
    //   requests: requestReducer,
    },
  });
  
  export default appStore;