import { https } from "./configURL";

export const projectService = {
  getAllProject: (da) => {
    return https.get("/api/Project/getAllProject");
  },
  getProjectByID: (id) => {
    return https.get(`/api/Project/getProjectDetail?id=${id}`);
  },
  createProject: (data) => {
    return https.post("/api/Project/createProjectAuthorize", data)
  },
  getProjectCategory: () => {
    return https.get("/api/ProjectCategory");
  },
  updateProject: (id, data) => {
    return https.put(`/api/Project/updateProject?projectId=${id}`, data);
  },
  deleteProject: (id) => {
    return https.delete(`/api/Project/deleteProject?projectId=${id}`);
  },
  assignUserProject: (projectId, userId) => {
    return https.post("/api/Project/assignUserProject", {
      projectId: Number(projectId),
      userId: Number(userId)
    });
  },
  removeUserFromProject: (data) => {
    return https.post("/api/Project/removeUserFromProject", data);
  },
}