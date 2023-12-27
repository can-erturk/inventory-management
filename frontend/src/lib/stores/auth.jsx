import { createSlice } from '@reduxjs/toolkit'

// Use localStorage for remember session to avoid logout when the browser is closed
// Use sessionStorage for not remember session to logout when the browser is closed
const initialState = {
  jwt: localStorage.getItem('jwt') || sessionStorage.getItem('jwt') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setJWT: (state, action) => {
      state.jwt = action.payload
    },
  },
})

export const { setJWT } = authSlice.actions
export default authSlice.reducer
