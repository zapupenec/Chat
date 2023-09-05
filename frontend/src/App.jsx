/* eslint-disable import/prefer-default-export */
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { setLocale } from 'yup';

import { AuthButton } from './common-components';
import {
  ChatPage, LoginPage, NotFoundPage, SignupPage,
} from './pages';
import { LoggedInRoute, PrivateRoute, routes } from './routes';
import { locale } from './locales';

export const App = () => {
  setLocale(locale);
  const { t } = useTranslation();

  return (
    <>
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Navbar className="shadow-sm" bg="white">
            <Container>
              <Navbar.Brand as={Link} to={routes.main}>{t('header.logo')}</Navbar.Brand>
              <AuthButton />
            </Container>
          </Navbar>
          <Routes>
            <Route
              path={routes.main}
              element={<PrivateRoute><ChatPage /></PrivateRoute>}
            />
            <Route path={routes.login} element={<LoggedInRoute><LoginPage /></LoggedInRoute>} />
            <Route path={routes.signup} element={<LoggedInRoute><SignupPage /></LoggedInRoute>} />
            <Route path={routes.notFound} element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
};
