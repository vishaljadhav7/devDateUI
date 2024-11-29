import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../utils/userSlice';
import profileReducer from '../utils/profileSlice';
import requestReducer from '../utils/requestSlice';
import coreReducer from '../utils/coreSlice';
import connectionReducer from '../utils/connectionSlice'


 const appStore = configureStore({
    reducer: {
      user: userReducer,
      profile : profileReducer,
      core : coreReducer,
      request : requestReducer,
      connections: connectionReducer,
    },
  });
  
  export default appStore;