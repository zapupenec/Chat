import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { routes } from './routes';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const fetchData = createAsyncThunk(
  'channels/fetchData',
  async () => {
    const { data } = await axios.get(routes.dataPath(), {
      headers: getAuthHeader(),
    });
    return data;
  },
);

const login = (username, password) => axios.post(routes.loginPath(), { username, password });
const signup = (username, password) => axios.post(routes.signupPath(), { username, password });

export const api = {
  fetchData,
  login,
  signup,
};
