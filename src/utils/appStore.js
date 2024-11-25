import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../utils/userSlice'
import profileReducer from '../utils/profileSlice'



 const appStore = configureStore({
    reducer: {
      user: userReducer,
      profile : profileReducer
    //   feed: feedReducer,
    //   connections: connectionReducer,
    //   requests: requestReducer,
    },
  });
  
  export default appStore;