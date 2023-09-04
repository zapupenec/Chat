/* eslint-disable import/prefer-default-export */
import {
  createContext, useCallback, useContext, useMemo, useState,
} from 'react';

const AuthContext = createContext({});

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const getToken = () => {
  const userId = JSON.parse(localStorage.getItem('user'));
  return userId && userId.token;
};

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(getToken());
  const [user, setUser] = useState({});
  const logIn = useCallback(() => setLoggedIn(true), []);
  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  }, []);

  const providedData = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
  }), [
    loggedIn,
    logIn,
    logOut,
  ]);

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
