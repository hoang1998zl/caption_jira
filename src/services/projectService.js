import { https } from "./configURL";

export const projectService = {
  getAllProject: (token) => {
    return https.get("/api/Project/getAllProject", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getProjectByID: (token, id) => {
    return https.get(`/api/Project/getProjectDetail?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createProject: (token, data) => {
    return https.post("/api/Project/createProjectAuthorize", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getProjectCategory: (token) => {
    return https.get("/api/ProjectCategory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateProject: (token, id, data) => {
    return https.put(`/api/Project/updateProject?projectId=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteProject: (token, id) => {
    return https.delete(`/api/Project/deleteProject?projectId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  assignUserProject: (token, projectId, userId) => {
    return https.post("/api/Project/assignUserProject", {
      projectId: Number(projectId),
      userId: Number(userId)
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  removeUserFromProject: (token, projectId, userId) => {
    return https.post("/api/Project/removeUserFromProject", {
      projectId: Number(projectId),
      userId: Number(userId)
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
}