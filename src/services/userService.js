import { https } from "./configURL";

export const userService = {
  getUser: (name) => {
    return https.get(`/api/Users/getUser?keyword=${name}`);
  },
  getUserByID: (id) => {
    return https.get(`/api/User/getUserDetail?id=${id}`);
  }
}