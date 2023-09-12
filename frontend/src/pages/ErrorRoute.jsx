/* eslint-disable import/prefer-default-export */
import { Navigate, Outlet } from 'react-router-dom';

import { useAPI } from '../contexts';
import { routes } from '../routes';

export const ErrorRoute = () => {
  const { error } = useAPI();

  return (
    error ? <Outlet /> : <Navigate to={routes.pages.main} />
  );
};
