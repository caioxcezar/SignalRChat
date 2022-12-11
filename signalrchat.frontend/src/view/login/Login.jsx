import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { request } from "../../module/fetch";
import { error } from "../../module/toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loging = async () => {
    try {
      const response = await request("login", "POST", {
        Login: login,
        Password: password,
      });
      if (response.status > 200) throw "Credencial invalida";
      const json = await response.json();
      localStorage.setItem("token", JSON.stringify(json));
      window.location.replace(`${window.location.origin}/home`);
    } catch (e) {
      error(`Não foi possível logar. ${e}`);
    }
  };

  useEffect(() => {
    const res = localStorage.getItem('token');
    if (res) return navigate('/home');
  }, []);

  return (
    <Container className="align-middle">
      <Form>
        <Form.Group>
          <Form.Label>Login: </Form.Label>
          <Form.Control
            type={"text"}
            value={login}
            onChange={({ target }) => setLogin(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type={"password"}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center">
        <Button className="w-50 m-2" onClick={loging}>
          Login
        </Button>
        <Button className="w-50 m-2" onClick={() => navigate("/register")}>
          Register
        </Button>
      </div>
    </Container>
  );
};

export default Login;
