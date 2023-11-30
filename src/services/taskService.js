import { https } from "./configURL";

export const taskService = {
  getTaskByID: (token, id) => {
    return https.get(`/api/Project/getTaskDetail?taskId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  },
  getTaskType: (token) => {
    return https.get("/api/TaskType/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  },
  updateTask: (token, data) => {
    return https.post(`/api/Project/updateTask`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  },
  getStatus: (token) => {
    return https.get("/api/Status/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  },
  updateStatus: (token, data) => {
    return https.put("/api/Project/updateStatus", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  },
  getPriority: (token) => {
    return https.get("/api/Priority/getAll")
  },
  updatePriority: (token, data) => {
    return https.put("/api/Project/updatePriority", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  },
  createTask: (token, data) => {
    return https.post("/api/Project/createTask", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  },
  updateDescription: (token, data) => {
    return https.put("/api/Project/updateDescription", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  },
  updateTypeId: (token, data) => {
    return https.post(`/api/Project/updateTask`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  },
  addUserTask: (token, data) => {
    return https.post("/api/Project/assignUserTask", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
}