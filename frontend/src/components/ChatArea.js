import React, { useState, useEffect } from "react";
import { Container, Grid, ButtonGroup, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { io } from "socket.io-client";
import { Chatbox, Online, Chats, axios } from "./";
import Cookies from "universal-cookie";
import { Switch, Route } from "react-router-dom";

let socket;
const cookies = new Cookies();

const ChatArea = () => {
  const user = cookies?.get("username");

  const [currentChat, setCurrentChat] = useState(null);
  const [me, setMe] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [mobileView, setMobileView] = useState(false);
  const endpoint = "https://jojo-chat-app.herokuapp.com";

  useEffect(() => {
    socket = io(endpoint);
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [endpoint]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/user/" + user);
        setMe(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, [user]);

  useEffect(() => {
    socket.emit("addUser", me._id);
    socket.on("getUsers", (users) => {
      setOnlineUsers(users.map((user) => user.userId));
    });
  }, [me]);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    cookies.remove("token");
    cookies.remove("username");
    window.location.reload();
  };

  const Desktop = () => {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={0}>
          <Grid item sm={3}>
            <Chats
              userName={user}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
            />
          </Grid>
          <Grid item sm={6}>
            <Chatbox
              userName={user}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
              user={me}
              socket={socket}
            />
          </Grid>
          <Grid item sm={3}>
            <Online
              onlineUsers={onlineUsers}
              currentUserId={me._id}
              setCurrentChat={setCurrentChat}
            />
          </Grid>
        </Grid>
      </Container>
    );
  };

  const Mobile = () => {
    const buttonGroups = () => {
      return (
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          fullWidth="true"
        >
          <Button fullWidth="true" onClick={() => (window.location.href = "/")}>
            Messages
          </Button>

          <Button
            fullWidth="true"
            onClick={() => (window.location.href = "/online")}
          >
            Online
          </Button>

          <Button onClick={handleLogout} className="d-flex" fullWidth="true">
            <div>Log out</div>
            <ExitToAppIcon fontSize="large" />
          </Button>
        </ButtonGroup>
      );
    };

    return (
      <>
        <Switch>
          <Route path="/" exact>
            {buttonGroups()}
            <Chats
              userName={user}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
            />
          </Route>
          <Route path="/online" exact>
            {buttonGroups()}
            <Online
              onlineUsers={onlineUsers}
              currentUserId={me._id}
              setCurrentChat={setCurrentChat}
            />
          </Route>
          <Route path="/chatbox" exact>
            <Chatbox
              userName={user}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
              user={me}
              socket={socket}
            />
          </Route>
        </Switch>
      </>
    );
  };

  return <>{mobileView ? Mobile() : Desktop()}</>;
};

export default ChatArea;
