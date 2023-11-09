import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectDetail: null,
  taskDetail: null,
}

export const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectDetail: (state, action) => {
      state.projectDetail = action.payload
    },
    setTaskDetail: (state, action) => {
      state.taskDetail = action.payload
    }
  }
});

export const {
  setProjectDetail,
  setTaskDetail
} = ProjectSlice.actions

export default ProjectSlice.reducer