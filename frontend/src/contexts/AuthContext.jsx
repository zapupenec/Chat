/* eslint-disable import/prefer-default-export */
import {
  createContext, useContext, useMemo, useState,
} from 'react';

import { useAPI } from './ApiContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser?.username || null);
  const api = useAPI();

  const providedData = useMemo(() => {
    const handleAPI = (func) => async (userData) => {
      try {
        const { data } = await func(userData);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        return true;
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const logOut = () => {
      localStorage.removeItem('user');
      setUser(null);
    };

    const getAuthHeader = () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
    };

    return {
      user,
      logIn: handleAPI((userData) => api.logIn(userData)),
      signUp: handleAPI((userData) => api.signUp(userData)),
      logOut,
      getAuthHeader,
    };
  }, [api, user]);

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
