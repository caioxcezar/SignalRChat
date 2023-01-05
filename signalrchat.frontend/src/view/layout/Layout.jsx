import React, { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "../../components/header";
import Friends from "../../components/friends";
import { ChatProvider } from "../../context/friendContext";
import './style.scss';

const Layout = ({ children }) => {
  const [height, setHeight] = useState(0);
  const refHeader = useRef(null);

  useEffect(() => {
    const header = refHeader.current ? refHeader.current.clientHeight : 0;
    setHeight(`calc(100vh - ${header}px`);
  }, [refHeader.current]);
  const config = localStorage.getItem("token");
  const theme = localStorage.getItem("colorScheme") === "light" ? "light" : "dark";
  return (
    <div className={`theme-${theme}`}>
      <ChatProvider>
      {config ? <Header ref={refHeader} /> : <></>}
      <ToastContainer />
      <div className="main-container" style={{ height: height }}>
        {config ? (
          <>
            <div className="content-container">{children}</div>
            <div className="border-start">
              <Friends />
            </div>
          </>
        ) : (
          children
        )}
        </div>
      </ChatProvider>
    </div>
  );
};

export default Layout;
