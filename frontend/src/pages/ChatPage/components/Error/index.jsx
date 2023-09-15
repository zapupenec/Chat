/* eslint-disable import/prefer-default-export */
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import { Icon } from '../../../../common-components';

export const Error = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div className="text-center h-75">
      <div className="h-50">
        <Icon name="error" size="100%" />
      </div>
      <h1 className="h4 text-muted">{t('chatPage.error')}</h1>
      <p className="text-muted">
        <Button onClick={handleClick}>{t('buttons.refresh')}</Button>
      </p>
    </div>
  );
};
