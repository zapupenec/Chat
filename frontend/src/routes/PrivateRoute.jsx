/* eslint-disable import/prefer-default-export */
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { routes } from './routes';

export const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to={routes.login} />
  );
};
