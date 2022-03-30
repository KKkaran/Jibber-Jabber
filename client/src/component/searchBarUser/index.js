import React, { useState } from "react";
import { TextField, List, ListItem, Button } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../../utils/queries";
import { CREATE_CHANNEL } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import Auth from "../../utils/auth";

function SearchBarUser(props) {
  const [value, setValue] = useState("");
  const [userList, setUserList] = useState([]);

  const [showUserList, setShowUserlist] = useState(false);

  const currentUserId = Auth.getProfile().data._id;
  const currentUsername = Auth.getProfile().data.username;

  const [createChannel, { error }] = useMutation(CREATE_CHANNEL);

  let navigate = useNavigate();

  const { loading, data: userData } = useQuery(QUERY_ALL_USERS, {
    onCompleted: (data) => {
      setUserList(data.users);
    },
  });

  const { chats } = props;

  const users = userData?.users;

  const handleChange = (e) => {
    e.preventDefault();
    setShowUserlist(true);

    setValue(e.target.value);
    const filtered = users.filter((user) => {
      return user.username.includes(e.target.value) || e.target.value === "";
    });
    setUserList(filtered);
  };

  // check if convo exist between user
  const handleUserClick = async (e) => {
    console.log("clicked");
    const userId = e.target.dataset.userid;
    const username = e.target.value;

    console.log("user chats", chats);

    for (let i = 0; i < chats.length; i++) {
      const checkuserlist = chats[i].users.filter(
        (u) => u._id === currentUserId || u._id === userId
      );

      console.log(chats[i].users, checkuserlist);
      if (chats[i].users.length === 2 && checkuserlist.length === 2) {
        // previous chat exists redirect
        console.log("old chat exists", chats[i]._id);
        return navigate(`/chat/${chats[i]._id}`);
      }
    }
    // create a new chat

    const newChannel = await createChannel({
      variables: {
        users: [{ _id: userId }],
        channelName: `${currentUsername} and ${username}`,
      },
    });

    const newChannelId = newChannel.data.createChannel._id;
    console.log("new channel created", newChannelId);

    return navigate(`/chat/${newChannelId}`);
  };

  console.log(showUserList);


  const hideList = () => {
    setShowUserlist(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ClickAwayListener onClickAway={hideList}>
      <div>
        <TextField value={value} onChange={handleChange} />

        {showUserList && (
          <List>
            {userList &&
              userList.map((u) => (
                <ListItem key={u._id}>
                  <Button
                    data-userid={u._id}
                    onClick={handleUserClick}
                    value={u.username}
                  >
                    {u.username}
                  </Button>
                </ListItem>
              ))}
          </List>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default SearchBarUser;
