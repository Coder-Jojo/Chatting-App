import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@material-ui/core";
import ScrollToBottom from "react-scroll-to-bottom";
import SendIcon from "@material-ui/icons/Send";
import "./chatbox.css";
import { Messages, axios } from "./";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Chatbox = ({ currentChat, setCurrentChat, user, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatName, setChatName] = useState("");
  const handleLogout = (e) => {
    e.preventDefault();
    cookies.remove("token");
    cookies.remove("username");
    window.location.reload();
  };

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat === null) return;
      try {
        const messages = await axios.get("/messages/" + currentChat._id);
        setMessages(messages.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleClick = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket &&
      socket.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    socket &&
      socket.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
  }, [socket]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const receiverId = currentChat?.members.find(
      (member) => member !== user._id
    );

    const findChatName = async () => {
      try {
        const name = await axios.get("/user/find/" + receiverId);
        setChatName(name.data.username);
      } catch (error) {}
    };

    currentChat && findChatName();
  }, [currentChat, user._id]);

  return (
    <div>
      <Box height="100vh" className="d-flex flex-column">
        <Paper className="topbar bg-primary d-flex justify-content-between">
          <div className="d-flex">
            <a href="/">
              <IconButton aria-label="back">
                <ArrowBackIcon fontSize="large" />
              </IconButton>
            </a>
            <Typography
              variant="h4"
              className="text-center font-weight-bold text-light p-2 "
            >
              {chatName ? chatName.toUpperCase() : "CHAT"}
            </Typography>
          </div>

          <Button onClick={handleLogout} className="d-flex">
            <Typography
              variant="h5"
              className="text-center font-weight-bold text-light p-2 "
            >
              Log out
            </Typography>
            <ExitToAppIcon fontSize="large" />
          </Button>
        </Paper>

        <ScrollToBottom initialScrollBehavior="smooth" className="msg">
          {currentChat ? (
            messages.map((m, i) => (
              <Messages key={i} message={m} own={m.sender === user._id} />
            ))
          ) : (
            <Typography
              variant="h2"
              align="center"
              className="font-weight-bold text-light"
            >
              SELECT A USER TO CHAT WITH
            </Typography>
          )}
        </ScrollToBottom>

        {currentChat ? (
          <div className="d-flex flex-row-reverse p-1">
            <IconButton aria-label="Send" onClick={handleClick}>
              <SendIcon color="primary" fontSize="large" />
            </IconButton>
            <TextField
              id="outlined-multiline-static"
              className="textArea"
              multiline
              rows={3}
              placeholder="Type something..."
              variant="outlined"
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              value={newMessage}
              onKeyPress={(event) =>
                event.key === "Enter" ? handleClick : null
              }
            />
          </div>
        ) : null}
      </Box>
    </div>
  );
};

export default Chatbox;
