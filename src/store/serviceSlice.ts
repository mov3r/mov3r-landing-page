import {createSlice} from '@reduxjs/toolkit';

export interface Service {
  service: {
    loading: boolean,
    error?: string,
    linkType?: string
  }
}
const userSlice = createSlice({
  name: 'service',
  initialState: {
    loading: false,
    error: undefined,
    linkType: undefined
  },
  reducers: {

    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    setLinkType(state, action) {
      state.linkType = action.payload
    },
  }
})

export const {setLoading, setError, setLinkType} = userSlice.actions
export default userSlice.reducer
