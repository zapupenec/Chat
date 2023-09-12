/* eslint-disable import/prefer-default-export */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './common-components/Layout';
import {
  ChatPage, LoginPage, NotFoundPage, SignupPage, PrivateRoute, ErrorPage, ErrorRoute,
} from './pages';
import { routes } from './routes';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.pages.main} element={<Layout />}>
        <Route path={routes.pages.main} element={<PrivateRoute />}>
          <Route path="" element={<ChatPage />} />
        </Route>
        <Route path="" element={<PrivateRoute hasAccess />}>
          <Route path={routes.pages.login} element={<LoginPage />} />
          <Route path={routes.pages.signup} element={<SignupPage />} />
        </Route>
        <Route path="" element={<ErrorRoute />}>
          <Route path={routes.pages.error} element={<ErrorPage />} />
        </Route>
        <Route path={routes.pages.notFound} element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
