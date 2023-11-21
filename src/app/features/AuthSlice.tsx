import { RootState } from "@/store"
import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
  isOpen: boolean
}

const initialState: InitialState = {
  isOpen: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuth: (state, action) => {
      state.isOpen = action.payload
    },
  },
})

export const { toggleAuth } = authSlice.actions
export default authSlice.reducer

export const authSelector = (state: RootState) =>
  state.auth.isOpen
