import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Button from "../button";
import Input from "../input";
import "./style.scss";

const Header = React.forwardRef((_, ref) => {
  const [search, setSearch] = useState("");
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.replace(window.location.origin);
  };
  return (
    <div ref={ref} className="header">
      <a href="/home" className="home-icon header-element">
        <FontAwesomeIcon icon={faMessage} />
      </a>
      <Input
        className="input-search header-element"
        type={"text"}
        label="Search"
        value={search}
        onChange={setSearch}
      />
      <Button className="header-element" onClick={logout} text={"Logout"} />
    </div>
  );
});

export default Header;
