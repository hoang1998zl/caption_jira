import { https } from "./configURL";

export const authService = {
  dangKy: (data) => {
    return https.post('/api/Users/signup', data);
  },
  dangNhap: (data) => {
    return https.post('/api/Users/signin', data);
  },
  checkToken: () => {
    return https.post('/api/Users/TestToken'); 
  }
}