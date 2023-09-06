/* eslint-disable import/prefer-default-export */
import {
  createContext, useContext, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children, httpClient }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser?.username || null);

  const [isLogInFailed, setIsLogInFailed] = useState(false);
  const [isSignUpFailed, setIsSignUpFailed] = useState(false);

  const { t } = useTranslation();

  const providedData = useMemo(() => {
    const logIn = async (username, password, cb) => {
      setIsLogInFailed(false);
      setIsSignUpFailed(false);
      try {
        const { data } = await httpClient.login(username, password);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      } catch (error) {
        cb();

        if (error.isHttpClient) {
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

    const signUp = async (username, password, cb) => {
      setIsLogInFailed(false);
      setIsSignUpFailed(false);
      try {
        const { data } = await httpClient.signup(username, password);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      } catch (error) {
        cb();

        if (error.isHttpClient) {
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
  }, [httpClient, isLogInFailed, isSignUpFailed, t, user]);

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
