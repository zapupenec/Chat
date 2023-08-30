import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';

import {
  Navbar, Container,
} from 'react-bootstrap';

import { AuthButton } from './components';

import {
  ChatPage, LoginPage, NotFoundPage, SignupPage,
} from './pages';

import { LoggedInRoute, PrivateRoute } from './routes';

import { AuthProvider } from './providers';

export const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Navbar className="shadow-sm" bg="white">
          <Container>
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
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
