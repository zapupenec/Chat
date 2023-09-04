import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import { App } from './App';
import { i18next } from './i18next';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_POST_CLIENT_ITEM_ACCESS_TOKEN,
  environment: 'production',
};

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <I18nextProvider i18n={i18next}>
        <ReduxProvider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ReduxProvider>
      </I18nextProvider>
    </ErrorBoundary>
  </RollbarProvider>,
);
