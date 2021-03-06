import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

import NavBar from "../../Layout/Navbar";
import Logo from "../../assets/slulogo.png";
import { useDispatch } from "react-redux";

import { loginThunk, setErrorToNull, loginMsg } from "../../module/actions";

const styles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  logo: {
    height: "220px",
    marginTop: theme.spacing(3),
  },
  color: {
    background: "#2f6b25",
    color: "white",
    "&:hover": {
      background: "#ffa500",
      color: "white",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const classes = styles();

  const dispatch = useDispatch();

  const handleClick = () => {
    props.login(inputUsername, inputPassword);
  };

  const hideMsg = () => {
    dispatch(loginMsg(false));
  };

  const redirectCheck = () => {
    if (props.val.isAdmin === true) {
      return <Redirect to="/dashboardadmin" />;
    } else if (props.val.isAdmin === false) {
      return <Redirect to="/dashboardta" />;
    }
  };

  const clearError = () => {
    dispatch(setErrorToNull());
  };

  let toastProp = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  return (
    <div>
      {props.val.error !== null &&
        toast.error(props.val.error, toastProp) &&
        clearError()}
      <ToastContainer />
      <NavBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
          <img src={Logo} className={classes.logo} alt="Logo" />
          <form
            className={classes.form}
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <TextField
              name="userName"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              value={inputUsername}
              autoFocus
              onChange={(event) => {
                setInputUsername(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={inputPassword}
              onChange={(event) => {
                setInputPassword(event.target.value);
              }}
            />
            <Button
              type="submit"
              value="Submit"
              className={classes.color}
              onClick={handleClick}
            >
              Login
            </Button>
            {props.val.isLoggedIn !== false && redirectCheck()}
          </form>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    val: state.reducer,
  };
};

const mapDispatchToProps = {
  login: loginThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

//usedispatch
