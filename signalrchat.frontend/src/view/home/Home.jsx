import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { error as toastError } from "../../module/toast";
import SignalR from "../../module/signalR";
import { FriendContext } from "../../context/friendContext";

let connected = false;
const Home = () => {
  const signalR = SignalR();
  const [friend, _] = useContext(FriendContext);
  const [message, setMessage] = useState("");
  const [menssages, setMessages] = useState([]);
  const [sendDisabled, setSendDisabled] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if(connected) return;
        connected = true;
        await signalR.connect();
        signalR.receiveMessage(addMessage);
        await signalR.start();
        setSendDisabled(false);
      } catch (err) {
        toastError(err);
      }
    })();
  }, []);

  const addMessage = (user, message) => {
    const li = (
      <li>
        {`${user}: ${message}`}
      </li>
    );
    setMessages([...menssages, li]);
  };

  const send = async () => {
    try {
      await signalR.sendMessage(friend, message);
      addMessage('Me', message);
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <Container>
      <Form>
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
