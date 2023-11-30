import { createSlice } from '@reduxjs/toolkit'
import { sessionService } from '../../services/sessionServices';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: "",
  loading: true,
  lst_user: null,
  selectedUser: null
}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.accessToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = "";
      sessionService.removeItem('token');
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setLstUser: (state, action) => {
      state.lst_user = action.payload
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    }
  }
});

export const {
  loginSuccess,
  logout,
  setLoading,
  setLstUser,
  setSelectedUser
} = UserSlice.actions


export default UserSlice.reducer