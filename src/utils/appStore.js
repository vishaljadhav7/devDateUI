import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../utils/userSlice'


 const appStore = configureStore({
    reducer: {
      user: userReducer,
    //   feed: feedReducer,
    //   connections: connectionReducer,
    //   requests: requestReducer,
    },
  });
  
  export default appStore;