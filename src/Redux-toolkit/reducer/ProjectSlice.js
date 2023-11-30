import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lst_project: null,
  projectDetail: null,
  taskDetail: null,
}

export const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setLstProject: (state, action) => {
      state.lst_project = action.payload
    },
    setProjectDetail: (state, action) => {
      state.projectDetail = action.payload
    },
    setTaskDetail: (state, action) => {
      state.taskDetail = action.payload
    }
  }
});

export const {
  setLstProject,
  setProjectDetail,
  setTaskDetail
} = ProjectSlice.actions

export default ProjectSlice.reducer