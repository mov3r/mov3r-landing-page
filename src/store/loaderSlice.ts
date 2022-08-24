import {createSlice} from '@reduxjs/toolkit';

export interface Loading {
  loader: {
    loading: boolean,
  }
}
const userSlice = createSlice({
  name: 'loader',
  initialState: {
    loading: false,
  },
  reducers: {

    setLoading(state, action) {
      state.loading = action.payload
    },
  }
})

export const {setLoading} = userSlice.actions
export default userSlice.reducer
