/* eslint-disable import/prefer-default-export */
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import notFoundImage from '../../assets/notFound.svg';
import { routes } from '../../routes';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center h-75">
      <Image className="h-50" src={notFoundImage} fluid alt={t('notFoundPage.title')} />
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        <span>{t('notFoundPage.text')}</span>
        <Link to={routes.pages.main}>{t('notFoundPage.link')}</Link>
      </p>
    </div>
  );
};
