/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { routes } from '../routes';

const fetchData = async (authHeader) => {
  try {
    const response = await axios.get(routes.api.data, { headers: authHeader });
    return response;
  } catch (error) {
    error.isHttpClient = true;
    throw error;
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(routes.api.login, { username, password });
    return response;
  } catch (error) {
    error.isHttpClient = true;
    throw error;
  }
};

const signup = async (username, password) => {
  try {
    const response = await axios.post(routes.api.signup, { username, password });
    return response;
  } catch (error) {
    error.isHttpClient = true;
    throw error;
  }
};

export const httpClient = {
  fetchData,
  login,
  signup,
};
