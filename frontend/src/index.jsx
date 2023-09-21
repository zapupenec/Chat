import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import ReactDOM from 'react-dom/client';

import { init } from './init';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(init());
};

app();
