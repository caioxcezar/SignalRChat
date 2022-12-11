const signalR = require("@microsoft/signalr");

let connection = null;

const SignalR = () => {
  const connect = async () => {
    const { token } = JSON.parse(localStorage.getItem("token"));
    if (connection) return;
    connection = new signalR.HubConnectionBuilder()
      .withUrl("api/chatHub", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .build();
  };
  const start = async () => connection.start();
  const receiveMessage = (method) => connection.on("ReceiveMessage", method);
  const onClose = (method) => connect.onClose(method);
  const sendMessage = (sendTo, message) =>
    connection.invoke("SendMessage", sendTo, message);
  return { connect, start, receiveMessage, onClose, sendMessage };
};

export default SignalR;
