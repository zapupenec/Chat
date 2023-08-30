import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

export const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    auth.loggedIn && <Button onClick={auth.logOut}>{t('buttons.logOut')}</Button>
  );
};
