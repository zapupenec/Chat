import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export const LoggedInRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? <Navigate to="/" /> : children
  );
};
