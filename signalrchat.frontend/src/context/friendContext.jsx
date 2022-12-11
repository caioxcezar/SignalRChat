import React, { createContext, useState } from "react";

const FriendContext = createContext();
const FriendProvider = ({ children }) => {
  const [friend, setFriend] = useState("");
  return (
    <FriendContext.Provider value={[friend, setFriend]}>
      {children}
    </FriendContext.Provider>
  );
};
export { FriendContext, FriendProvider };
