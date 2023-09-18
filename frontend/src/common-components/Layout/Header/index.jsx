/* eslint-disable import/prefer-default-export */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Navbar } from 'react-bootstrap';

import { routes } from '../../../routes';
import { Icon } from '../../Icon';
import { AuthButton } from '../../AuthButton';
import { LanguageSwitcher } from '../../LanguageSwitcher';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <Navbar as="header" className="shadow-sm" bg="white">
      <Container>
        <Navbar.Brand as={Link} to={routes.pages.main}>
          <Icon name="chat-logo" size={30} />
          {' '}
          {t('header.logo')}
        </Navbar.Brand>
        <div className="d-flex gap-1">
          <LanguageSwitcher />
          <AuthButton />
        </div>
      </Container>
    </Navbar>
  );
};
