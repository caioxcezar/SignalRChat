// const signalR = require("@microsoft/signalr");
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

let connection = null;

const SignalR = () => {
  const connect = async () => {
    const { token } = JSON.parse(localStorage.getItem("token"));
    if (connection && connection.state != HubConnectionState.Disconnected) return;
    connection = new HubConnectionBuilder()
      .withUrl("api/chatHub", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .build();
  };
  const start = async () => {
    if(connection && connection.state != HubConnectionState.Disconnected) return;
    return connection.start();
  };
  const receiveMessage = (method) => connection.on("ReceiveMessage", method);
  const onClose = (method) => connect.onClose(method);
  const sendMessage = (sendTo, message) =>
    connection.invoke("SendMessage", sendTo, message);
  return { connect, start, receiveMessage, onClose, sendMessage };
};

export default SignalR;
