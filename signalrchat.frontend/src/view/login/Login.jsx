import React, { useEffect, useState } from "react";
import { request } from "../../module/fetch";
import { error } from "../../module/toast";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input";
import Button from "../../components/button";
import "./style.scss";

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
      if (response.status > 500) throw response.statusText;
      if (response.status > 200) throw "Wrong Credentials";
      const json = await response.json();
      localStorage.setItem("token", JSON.stringify(json));
      window.location.replace(`${window.location.origin}/home`);
    } catch (e) {
      error(`Unable to login. ${e}`);
    }
  };

  useEffect(() => {
    const res = localStorage.getItem("token");
    if (res) return navigate("/home");
  }, []);

  return (
    <div className="login-container">
      <div className="login-title">Login</div>
      <Input
        className={"d-grid"}
        type={"text"}
        label={"Login "}
        value={login}
        onChange={setLogin}
      />
      <Input
        className={"d-grid"}
        type={"password"}
        label={"password "}
        value={password}
        onChange={setPassword}
      />
      <div className="d-flex justify-content-center">
        <Button className="w-50 me-2" onClick={loging} text={"Login"} />
        <Button className="w-50" onClick={() => navigate("/register")} text={"Register"}/>
      </div>
    </div>
  );
};

export default Login;
