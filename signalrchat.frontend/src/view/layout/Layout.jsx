import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { useEffect } from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <div>Header</div>
      <ToastContainer />
      {children}
      <div>Footer</div>
    </>
  );
};

export default Layout;
