/* eslint-disable import/prefer-default-export */
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../contexts';
import { routes } from '../routes';

export const PrivateRoute = ({ hasAccess }) => {
  const { user } = useAuth();

  if (hasAccess) {
    return (
      user ? <Navigate to={routes.pages.main} /> : <Outlet />
    );
  }

  return (
    user ? <Outlet /> : <Navigate to={routes.pages.login} />
  );
};
