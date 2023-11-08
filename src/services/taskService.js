import { https } from "./configURL";

export const taskService = {
  getTaskByID: (id) => {
    return https.get(`/api/Project/getTaskDetail?taskId=${id}`);
  },
  getTaskType: () => {
    return https.get("/api/TaskType/getAll");
  },
  updateTask: (id, data) => {
    return
  },
  getStatus: () => {
    return https.get("/api/Status/getAll");
  },
  updateStatus: (data) => {
    return https.put("/api/Project/updateStatus", data);
  },
  getPriority: () => {
    return https.get("/api/Priority/getAll")
  },
  updatePriority: (data) => {
    return https.put("/api/Project/updatePriority", data);
  },
}