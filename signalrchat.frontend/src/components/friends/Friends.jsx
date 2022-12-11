import { useContext, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { FriendContext } from "../../context/friendContext";
import { authorizedRequest } from "../../module/fetch";
import { error } from "../../module/toast";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useContext(FriendContext);

  const getContacts = async () => {
    try {
      const response = await authorizedRequest(`chat/getall`, "GET");
      if (response.status > 200) return;
      const json = await response.json();
      if (json.length == 0) return;
      setFriends(
        json.map((op) => (
          <ListGroup.Item
            action
            key={op.connectionId}
            onClick={() => setFriend(op.name)}
          >
            {op.name}
          </ListGroup.Item>
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
      Friends: {friend}
      <ListGroup variant="flush">{friends}</ListGroup>
    </div>
  );
};

export default Friends;
