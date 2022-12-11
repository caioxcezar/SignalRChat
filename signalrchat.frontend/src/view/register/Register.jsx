import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { request } from "../../module/fetch";
import { warning, error, sucess, info } from "../../module/toast";
import { redirect } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const checkIsAvailable = async () => {
    let isValid = await isAvailable(login);
    if (isValid) info("valid login");
    else warning("Invalid login");
    setIsInvalid(!isValid);
  };

  const registerUser = async () => {
    try {
      const isValid = await isAvailable(login);
      if (!isValid) throw "Login invalido";
      const body = { name, password, login, role };
      await request(`login/register`, "POST", body);
      if (request.status > 200) throw "Login invalido";
      sucess("Successfully registered");
      redirect(`login`);
    } catch (e) {
        error(`Não foi possível logar. ${e}`);
    }
  };

  const isAvailable = async (login) => {
    if (!login.trim()) return false;
    const response = await request(`login/isAvailable/${login}`);
    if (response.status > 200) return false;
    return response.json();
  };

  return (
    <Container className="align-middle">
      <Form>
        <Form.Group>
          <Form.Label>Login: </Form.Label>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              isInvalid={isInvalid}
              type={"text"}
              value={login}
              onChange={({ target }) => setLogin(target.value)}
            />
            <Button onClick={checkIsAvailable}>Check</Button>
          </Stack>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type={"email"}
            value={email}
            isInvalid={!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)}
            onChange={({ target }) => setEmail(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type={"text"}
            value={name}
            onChange={({ target }) => setName(target.value)}
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
        <Form.Group>
          <Form.Label>Role: </Form.Label>
          <Form.Select onChange={({ target }) => setRole(target.value)}>
            <option value="client">Client</option>
            <option value="dev">Developer</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center">
        <Button className="w-75 m-2" onClick={registerUser}>Register</Button>
      </div>
    </Container>
  );
};

export default Register;
