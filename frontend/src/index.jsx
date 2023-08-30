import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { store } from './store/index';
import { App } from './App';
import { i18next } from './i18next';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
);
