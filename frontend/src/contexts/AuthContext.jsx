/* eslint-disable import/prefer-default-export */
import {
  createContext, useContext, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAPI } from './ApiContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser?.username || null);
  const api = useAPI();

  const [isLogInFailed, setIsLogInFailed] = useState(false);
  const [isSignUpFailed, setIsSignUpFailed] = useState(false);

  const { t } = useTranslation();

  const providedData = useMemo(() => {
    const logIn = async (userData, cb) => {
      setIsLogInFailed(false);
      setIsSignUpFailed(false);
      try {
        const { data } = await api.logIn(userData);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      } catch (error) {
        cb();

        if (error.isAPI) {
          const { status } = error.response;
          if (status === 401) {
            setIsLogInFailed(true);
            return;
          }
          toast.error(t('toasts.netWorkError'));
          return;
        }

        throw error;
      }
    };

    const signUp = async (userData, cb) => {
      setIsLogInFailed(false);
      setIsSignUpFailed(false);
      try {
        const { data } = await api.signUp(userData);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      } catch (error) {
        cb();

        if (error.isAPI) {
          const { status } = error.response;
          if (status === 409) {
            setIsSignUpFailed(true);
            return;
          }
          toast.error(t('toasts.netWorkError'));
          return;
        }

        throw error;
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
      isLogInFailed,
      isSignUpFailed,
      user,
      logIn,
      signUp,
      logOut,
      getAuthHeader,
    };
  }, [api, isLogInFailed, isSignUpFailed, t, user]);

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
