/* eslint-disable import/prefer-default-export */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Navbar } from 'react-bootstrap';

import { AuthButton } from '../../AuthButton';
import { routes } from '../../../routes';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm" bg="white">
      <Container>
        <Navbar.Brand as={Link} to={routes.pages.main}>{t('header.logo')}</Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};
