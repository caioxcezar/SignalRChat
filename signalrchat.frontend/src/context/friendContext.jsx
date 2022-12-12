import React, { createContext, useState } from "react";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const [chatReceiver, setChatReceiver] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  return (
    <ChatContext.Provider
      value={{ chatReceiver, setChatReceiver, chatMessages, setChatMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export { ChatContext, ChatProvider };
