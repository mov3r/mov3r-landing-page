import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice';
import serviceSlice from './serviceSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    service: serviceSlice
  }
})
