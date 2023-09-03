/* eslint-disable import/prefer-default-export */
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from './locales';

i18next
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export { i18next };
