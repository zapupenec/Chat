/* eslint-disable import/prefer-default-export */
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from './Header';

export const Layout = () => (
  <>
    <div className="d-flex flex-column h-100">
      <Header />
      <Outlet />
    </div>
    <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
  </>
);
