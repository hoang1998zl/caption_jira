import { https } from "./configURL";

export const userService = {
  getAllUser: (token) => {
    return https.get(`/api/Users/getUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getUser: (token, name) => {
    return https.get(`/api/Users/getUser?keyword=${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getUserByID: (token, id) => {
    return https.get(`/api/User/getUserDetail?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteUser: (token, id) => {
    return https.delete(`/api/Users/deleteUser?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  editUser: (token, data) => {
    return https.put(`/api/Users/editUser`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}