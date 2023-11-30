import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1
}
export const CurrentPage = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  }
});

export const {
  setCurrentPage
} = CurrentPage.actions

export default CurrentPage.reducer