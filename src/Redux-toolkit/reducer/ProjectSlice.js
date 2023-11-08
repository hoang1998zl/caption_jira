import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectDetail: null,
}

export const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectDetail: (state, action) => {
      state.projectDetail = action.payload
    }
  }
});

export const {
  setProjectDetail
} = ProjectSlice.actions

export default ProjectSlice.reducer