import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './Redux-toolkit/reducer/UserSlice';
import ProjectSlice from './Redux-toolkit/reducer/ProjectSlice';


export const store = configureStore({
  reducer: {
    user: UserSlice,
    project: ProjectSlice,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);