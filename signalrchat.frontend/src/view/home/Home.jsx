import { useContext, useEffect, useState } from "react";
import { error as toastError } from "../../module/toast";
import SignalR from "../../module/signalR";
import { ChatContext } from "../../context/friendContext";
import { authorizedRequest } from "../../module/fetch";

let connected = false;
const Home = () => {
  const signalR = SignalR();
  const { chatReceiver, chatMessages } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [menssages, setMessages] = useState([]);
  const [sendDisabled, setSendDisabled] = useState(true);

  useEffect(
    () => setMessages(chatMessages.map((m) => makeMessage(m.receiver, m.text, m.id))),
    [chatMessages]
  );

  useEffect(() => {
    (async () => {
      try {
        if (connected) return;
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

  const makeMessage = (user, message, key) => <li key={key}>{`${user}: ${message}`}</li>;

  const addMessage = async (user, message, id) => {
    if(id) await authorizedRequest(`message/received`, 'POST', id);
    const li = makeMessage(user, message, id);
    setMessages([...menssages, li]);
  };

  const send = async () => {
    try {
      await signalR.sendMessage(chatReceiver, message);
      await addMessage("Me", message);
    } catch (err) {
      toastError(err);
    }
  };

  return (<></>
    // <Container>
    //   <Form>
    //     <Form.Group>
    //       <Form.Label>Message To {chatReceiver}: </Form.Label>
    //       <Form.Control
    //         type={"text"}
    //         value={message}
    //         onChange={({ target }) => setMessage(target.value)}
    //       />
    //     </Form.Group>
    //     <div className="d-flex justify-content-center">
    //       <Button
    //         disabled={sendDisabled || !chatReceiver}
    //         className="w-75 m-2"
    //         onClick={send}
    //       >
    //         Send
    //       </Button>
    //     </div>
    //     <Row>
    //       <div className="col-6">
    //         <ul id="messagesList">{menssages}</ul>
    //       </div>
    //     </Row>
    //   </Form>
    // </Container>
  );
};

export default Home;
