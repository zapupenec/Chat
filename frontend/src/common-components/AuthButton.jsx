/* eslint-disable import/prefer-default-export */
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../contexts';

export const AuthButton = () => {
  const { logOut, user } = useAuth();
  const { t } = useTranslation();

  return (
    user && <Button onClick={logOut}>{t('buttons.logOut')}</Button>
  );
};
