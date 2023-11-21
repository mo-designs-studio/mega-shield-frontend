import { RootState } from "@/store"
import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
  isOpen: boolean
  isSidebarOpen: boolean
  isServiceModalOpen: boolean
  isEditServiceModalOpen: boolean
  isEditSubServiceModalOpen: boolean
}

const initialState: InitialState = {
  isOpen: false,
  isSidebarOpen: false,
  isServiceModalOpen: false,
  isEditServiceModalOpen: false,
  isEditSubServiceModalOpen: false,
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    toggleIsProductOpen: (state, action) => {
      state.isOpen = action.payload
    },
    toggleSidebar: (state, action) => {
      state.isSidebarOpen = action.payload
    },
    toggleServiceModal: (state, action) => {
      state.isServiceModalOpen = action.payload
    },
    toggleEditServiceModal: (state, action) => {
      state.isEditServiceModalOpen = action.payload
    },
    toggleEditSubServiceModal: (state, action) => {
      state.isEditSubServiceModalOpen = action.payload
    },
  },
})

export default productSlice.reducer

export const {
  toggleIsProductOpen,
  toggleSidebar,
  toggleServiceModal,
  toggleEditServiceModal,
  toggleEditSubServiceModal,
} = productSlice.actions

export const IsProductOpenSelector = (state: RootState) =>
  state.product.isOpen
export const IsSidebarOpenSelector = (state: RootState) =>
  state.product.isSidebarOpen
export const IsServiceModalOpenSelector = (
  state: RootState
) => state.product.isServiceModalOpen
export const IsEditServiceModalOpenSelector = (
  state: RootState
) => state.product.isEditServiceModalOpen
export const IsEditSubServiceModalOpenSelector = (
  state: RootState
) => state.product.isEditSubServiceModalOpen
