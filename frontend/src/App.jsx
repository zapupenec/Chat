import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';

import {
  Navbar, Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { AuthButton } from './components';

import {
  ChatPage, LoginPage, NotFoundPage, SignupPage,
} from './pages';

import { LoggedInRoute, PrivateRoute } from './routes';

import { AuthProvider } from './providers';

export const App = () => {
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Navbar className="shadow-sm" bg="white">
            <Container>
              <Navbar.Brand as={Link} to="/">{t('header.logo')}</Navbar.Brand>
              <AuthButton />
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
            <Route path="/login" element={<LoggedInRoute><LoginPage /></LoggedInRoute>} />
            <Route path="/signup" element={<LoggedInRoute><SignupPage /></LoggedInRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};
