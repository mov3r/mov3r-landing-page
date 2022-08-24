import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice';
import loaderSlice from './loaderSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    loader: loaderSlice
  }
})
