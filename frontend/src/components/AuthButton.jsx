import { Button } from 'react-bootstrap';
import { useAuth } from '../hooks';

export const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn && <Button onClick={auth.logOut}>Выйти</Button>
  );
};
