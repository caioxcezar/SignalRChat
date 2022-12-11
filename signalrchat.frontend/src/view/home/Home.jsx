import { useEffect, useState } from "react";
import { authorizedRequest } from "../../module/fetch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { error } from "../../module/toast";
const signalR = require("@microsoft/signalr");

let connection = null; 

const Home = () => {
  const [sendTo, setSendTo] = useState("");
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [menssages, setMessages] = useState([]);
  const [sendDisabled, setSendDisabled] = useState(true);

  const getContacts = async () => {
    const response = await authorizedRequest(`chat/getall`, "GET");
    if (response.status > 200) return;
    const json = await response.json();
    setOptions(
      json.map((op) => (
        <option key={op.connectionId} value={op.name}>
          {op.name}
        </option>
      ))
    );
  };

  useEffect(() => {
    if(connection) return;
    getContacts();
    const { token } = JSON.parse(localStorage.getItem("token"));
    connection = new signalR.HubConnectionBuilder()
      .withUrl("api/chatHub", { headers: { Authorization: `Bearer ${token}` } })
      .build();
    connection.on("ReceiveMessage", addMessage);
    connection.start().then(() => {
      console.log('aqui')
      setSendDisabled(false);
  }).catch(err => {
    console.log(err);
    error(err);
  });
  }, []);

  const addMessage = (user, message) => {
    const li = (
      <li>
        `${user}: ${message}`
      </li>
    );
    setMessages([...menssages, li]);
  };

  const send = async () => {
    try {
      const {name} = JSON.parse(localStorage.getItem('token'));
      if(connection) {
        await connection.invoke("SendMessage", sendTo, message);
        addMessage(name, message);
      }
    } catch (err) {
      error(err);
    }
}

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Send to: </Form.Label>
          <Form.Select onChange={({ target }) => setSendTo(target.value)}>
            {options}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Message: </Form.Label>
          <Form.Control
            type={"text"}
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
            <Button disabled={sendDisabled} className="w-75 m-2" onClick={send}>
              Send
            </Button>
          </div>
        <Row>
          <div className="col-6">
            <ul id="messagesList">{menssages}</ul>
          </div>
        </Row>
      </Form>
    </Container>
  );
};

export default Home;
