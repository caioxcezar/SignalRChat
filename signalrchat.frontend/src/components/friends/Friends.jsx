import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/friendContext";
import { authorizedRequest } from "../../module/fetch";
import { error } from "../../module/toast";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const { setChatReceiver, setChatMessages } = useContext(ChatContext);

  const onClick = async (friend) => {
    setChatReceiver(friend);
    const response = await authorizedRequest(`message/messages/${friend}`);
    if (response.status > 200) return;
    const json = await response.json();
    setChatMessages(json);
  };

  const getContacts = async () => {
    try {
      const response = await authorizedRequest(`chat/all`, "GET");
      if (response.status > 200) return;
      const json = await response.json();
      if (json.length == 0) return;
      setFriends(
        json.map((op) => (
          <li action key={op.connectionId} onClick={() => onClick(op.name)}>
            {op.name}
          </li>
        ))
      );
    } catch (err) {
      error(err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="mt-2">
      Friends:
      <ul>{friends}</ul>
    </div>
  );
};

export default Friends;
