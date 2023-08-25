import {
  useCallback, useMemo, useState,
} from 'react';
import { AuthContext } from '../contexts';

const hasToken = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return userId && userId.token;
};

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(hasToken());

  const logIn = useCallback(() => setLoggedIn(true), []);
  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
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
