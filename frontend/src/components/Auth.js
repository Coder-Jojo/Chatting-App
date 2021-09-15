import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { axios } from "./";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar, InputAdornment, CircularProgress } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Cookies from "universal-cookie";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [find, setFind] = useState(false);
  const [valid, setValid] = useState(0);
  const [severity, setSeverity] = useState("warning");
  const [loading, setLoading] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    const a = !signIn;
    setSignIn(a);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (signIn) {
      if (username === "" || password === "") {
        setMessage("Please fill all the fields!!!");
        setOpen(true);
      } else {
        try {
          const resp = await axios.post("/auth/login", {
            username: username,
            password: password,
          });
          const cookie = new Cookies();
          cookie.set("token", `bearer ${resp.data.jwtToken}`);
          cookie.set("username", username);
          window.location.reload();
        } catch (e) {
          setMessage("Username or password is incorrect!");
          setOpen(true);
        }
      }
    } else {
      if (name === "" || username === "" || email === "" || password === "") {
        setMessage("Please fill all the fields!");
        setOpen(true);
      } else if (valid !== 1) {
        setOpen(true);
        setMessage("Username already taken!!!");
      } else {
        try {
          const resp = await axios.post("/auth/signup", {
            username: username,
            name: name,
            email: email,
            password: password,
          });
          console.log(resp);
          setSignIn(true);
          setSeverity("success");
          setOpen(true);
          setMessage("You have signed in successfully!");
        } catch (e) {
          setMessage("Something went wrong, please try again!");
          setOpen(true);
        }
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
      }
    }
    setLoading(false);
  };

  const handleUsername = async (e) => {
    setUsername(e.target.value);
    const username = e.target.value;

    if (!signIn && username !== "") {
      setFind(true);
      try {
        const resp = await axios.get("/auth/user/" + username);
        if (resp?.data?.value === true) {
          setValid(2);
        } else {
          setValid(1);
        }
      } catch (e) {
        console.log(e);
      }
      setFind(false);
    } else {
      setValid(0);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setSeverity("warning");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {signIn ? "Sign In" : "Sign Up"}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {!signIn ? (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  name="Name"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Grid>
            ) : null}

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={handleUsername}
                value={username}
                InputProps={
                  !signIn
                    ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            {find && <CircularProgress />}
                            {valid === 1 && (
                              <CheckCircleIcon style={{ color: green[500] }} />
                            )}
                            {valid === 2 && <CancelIcon color="secondary" />}
                          </InputAdornment>
                        ),
                      }
                    : null
                }
              />
            </Grid>

            {!signIn ? (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {signIn ? "Sign In" : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              {signIn ? "Don't have an account? " : "Already have an account? "}
              <Button onClick={handleAuth}>
                <Link variant="body2" className="text-primary">
                  <u>{signIn ? "Sign Up" : "Sign In"}</u>
                </Link>
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <div className="d-flex justify-content-center mt-4">
        {loading && <CircularProgress />}
      </div>
    </Container>
  );
}
