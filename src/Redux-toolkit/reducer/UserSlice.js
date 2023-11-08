import { createSlice } from '@reduxjs/toolkit'
import { sessionService } from '../../services/sessionServices';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: "",
  loading: true,
}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.accessToken;
      sessionService.setItem(action.payload.accessToken, 'token');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = "";
      sessionService.removeItem('token');
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
});

export const {
  loginSuccess,
  logout,
  setLoading
} = UserSlice.actions


export default UserSlice.reducer