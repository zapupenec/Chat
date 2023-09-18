/* eslint-disable import/prefer-default-export */
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-top py-3 bg-white shadow-sm">
      <Container>
        <div className="text-center">
          {t('footer.createdBy')}
          {' '}
          <a href="https://github.com/zapupenec" target="_blank" rel="noreferrer">zapupenec</a>
          {' '}
          {t('footer.basedOnProject')}
          {' '}
          <a href="https://ru.hexlet.io/programs/frontend/projects/12" target="_blank" rel="noreferrer">Hexlet</a>
        </div>
      </Container>
    </footer>
  );
};
