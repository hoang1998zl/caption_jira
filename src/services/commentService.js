import { https } from "./configURL";

export const commentService = {
  getAllComment: (token, taskId) => {
    return https.get(`/api/Comment/getAll?taskId=${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createComment: (token, data) => {
    return https.post("/api/Comment/insertComment", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateComment: (token, id, content) => {
    return https.put(`/api/Comment/updateComment?id=${id}&contentComment=${content}`, '', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteComment: (token, id) => {
    return https.delete(`/api/Comment/deleteComment?idComment=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}