import React, { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "../../components/header";
import { Col, Container, Row } from "react-bootstrap";
import Friends from "../../components/friends";
import { ChatProvider } from "../../context/friendContext";

const Layout = ({ children }) => {
  const [height, setHeight] = useState(0);
  const refHeader = useRef(null);

  useEffect(() => {
    const header = refHeader.current ? refHeader.current.clientHeight : 0;
    setHeight(`calc(100vh - ${header}px`);
  }, [refHeader.current]);
  const config = localStorage.getItem("token");
  return (
    <ChatProvider>
      {config ? <Header ref={refHeader} /> : <></>}
      <ToastContainer />
      <Container fluid>
        {config ? (
          <Row>
            <Col xs={10}>{children}</Col>
            <Col style={{ height: height }} className="border-start">
              <Friends />
            </Col>
          </Row>
        ) : (
          children
        )}
      </Container>
    </ChatProvider>
  );
};

export default Layout;
