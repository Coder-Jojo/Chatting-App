import React, { useState, useEffect } from "react";
import {
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { axios } from "./";

const Chat = ({
  conversations,
  currentUser,
  setConversations,
  convos,
  setCurrentChat,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (conversations === undefined) {
          setUser(null);
        } else {
          const friendId = conversations
            ? conversations?.members?.find((m) => m !== currentUser._id)
            : null;
          if (friendId) {
            const res = await axios.get("/user/find/" + friendId);
            setUser(res.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversations]);

  const handleDelete = async () => {
    try {
      console.log(convos);
      await axios.delete("/conversations/" + conversations._id);
      setConversations(convos.filter((c) => c._id !== conversations._id));
      setCurrentChat(null);
    } catch (err) {
      console.log(err);
    }
  };

  const item = (image, name) => {
    return (
      <>
        <ListItem key={name} button>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={image} />
          </ListItemAvatar>
          <ListItemText primary={name} className="text-dark" />
          <IconButton aria-label="delete" onClick={() => handleDelete()}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
        <Divider variant="inset" />
      </>
    );
  };

  return <>{user !== null ? item("", user.username) : null}</>;
};

export default Chat;
