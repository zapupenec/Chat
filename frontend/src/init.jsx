/* eslint-disable import/prefer-default-export */
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { setLocale } from 'yup';
import profanityFilter from 'leo-profanity';

import { ApiProvider, AuthProvider } from './contexts';
import { store } from './store';
import { locale, resources } from './locales';
import { App } from './App';

export const init = () => {
  profanityFilter.add(profanityFilter.getDictionary('fr'));
  profanityFilter.add(profanityFilter.getDictionary('ru'));

  const lastSelectedLng = localStorage.getItem('lastSelectedLng');
  i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: lastSelectedLng || 'ru',
      interpolation: {
        escapeValue: false,
      },
    });
  setLocale(locale);

  const { origin } = window.location;
  const socket = io(origin, {
    autoConnect: false,
    reconnectionDelay: 7000,
    reconnectionDelayMax: 7000,
  });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_POST_CLIENT_ITEM_ACCESS_TOKEN,
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18next}>
          <ReduxProvider store={store}>
            <ApiProvider socket={socket}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </ApiProvider>
          </ReduxProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
