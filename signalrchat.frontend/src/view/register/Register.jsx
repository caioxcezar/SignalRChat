import React, { useState } from "react";
import { request } from "../../module/fetch";
import { warning, error, sucess, info } from "../../module/toast";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input";
import Button from "../../components/button";
import Select from "../../components/select";
import "./style.scss";

const Register = () => {
  const navigate = useNavigate();

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
      navigate(`/`);
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
    <div className="register-container">
      <div className="title-register">Create a new account</div>
      <div className="group-login">
        <Input
          isInvalid={isInvalid}
          className={"w-100 me-2"}
          type={"text"}
          label={"Login "}
          value={login}
          onChange={setLogin}
        />
        <Button onClick={checkIsAvailable} text={"Check"} />
      </div>
      <Input
        className={"d-grid"}
        type={"text"}
        label={"Email "}
        isInvalid={!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)}
        value={email}
        onChange={setEmail}
      />
      <Input
        className={"d-grid"}
        type={"text"}
        label={"Name "}
        value={name}
        onChange={setName}
      />
      <Input
        className={"d-grid"}
        type={"text"}
        label={"Password "}
        value={password}
        onChange={setPassword}
      />
      <Select
        text={"Role"}
        value={role}
        className={"d-grid"}
        onChange={setRole}
        options={[
          ["client", "Client"],
          ["dev", "Developer"],
        ]}
      />
      <Button className="w-100" onClick={registerUser} text={"Register"} />
    </div>
  );
};

export default Register;
