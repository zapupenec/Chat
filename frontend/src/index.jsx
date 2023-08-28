import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
