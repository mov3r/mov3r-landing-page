import {createSlice} from '@reduxjs/toolkit';

export interface Service {
  service: {
    loading: boolean,

    error?: string
  }
}
const userSlice = createSlice({
  name: 'service',
  initialState: {
    loading: false,
    error: undefined
  },
  reducers: {

    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
  }
})

export const {setLoading, setError} = userSlice.actions
export default userSlice.reducer
