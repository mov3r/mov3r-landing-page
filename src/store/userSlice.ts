import {createSlice} from '@reduxjs/toolkit';

export interface User {
  user: {
    isEmailSent: boolean,
    slug?: string,
    secret?: string,
    rank?: number,
    verified: boolean,
    referralLink?: string
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isEmailSent: false,
    slug: undefined,
    rank: undefined,
    secret: undefined,
    confirmed: false,
    referralLink: undefined
  },
  reducers: {
    isEmailSent(state, action) {
      state.isEmailSent = action.payload
    },
    setSlug(state, action) {
      state.slug = action.payload
    },
    setRank(state, action) {
      state.rank = action.payload
    },
    setSecret(state, action) {
      state.secret = action.payload
    },
    setConfirmed(state, action) {
      state.confirmed = action.payload
    },
    setReferralLink(state, action) {
      state.referralLink = action.payload
    },
  }
})

export const {
  isEmailSent,
  setSlug,
  setSecret,
  setRank,
  setConfirmed,
  setReferralLink
} = userSlice.actions
export default userSlice.reducer
