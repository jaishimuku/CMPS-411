import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import Nav from "../../Layout/Navbar";
import { withStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";

import baseURL from "../../baseURL";
import LayoutAdmin from "../../Layout/SidebarAdmin/indexAdmin";

const styles = (theme) => ({
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
    height: "175px",
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
  root1: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(3),
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
  title: {
    textAlign: "center",
    margin: 15,
  },
});

class CreateTA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      isCreated: false,
    };
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleFirstName(event) {
    this.setState({ firstName: event.target.value });
  }
  handleLastName(event) {
    this.setState({ lastName: event.target.value });
  }
  handleUsername(event) {
    this.setState({ username: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick() {
    let FormData = {
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      Username: this.state.username,
      Email: this.state.email,
      Password: this.state.password,
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

    fetch(`${baseURL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FormData),
    })
        .then((response) => {
          if (response.ok) {
            this.setState({ isCreated: true });
            toast.success("Successfully added new TA!", toastProp);
            return response.json();
          } else {
            toast.error("Error, Please try again!!!", toastProp);
            console.log(response.status);
            console.log(FormData);
          }
        })
        .catch((error) => {
          console.error("error:", error);
        });
  }
  render() {
    const { classes } = this.props;
    const { firstName, lastName, username, password, email } = this.state;
    if (this.state.isCreated) {
      return <Redirect to="getTA" />;
    }
    return (
        <div>
          <ToastContainer />
          <LayoutAdmin />
          <div className={classes.wrapper}>
            <div className={classes.contentContainer}>
              <div className={classes.content}>
                <Container className={classes.root1}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                      <form className={classes.form} onSubmit={this.handleSubmit}>
                        <TextField
                            name="firstName"
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="FirstName"
                            autoComplete="firstName"
                            value={firstName}
                            autoFocus
                            onChange={this.handleFirstName}
                        />
                        <TextField
                            name="lastName"
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="LastName"
                            autoComplete="lastName"
                            value={lastName}
                            onChange={this.handleLastName}
                        />
                        <TextField
                            name="username"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            autoComplete="username"
                            value={username}
                            onChange={this.handleUsername}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
                            id="email"
                            autoComplete="current-email"
                            value={email}
                            onChange={this.handleEmail}
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
                            value={password}
                            onChange={this.handlePassword}
                        />

                        <Button
                            className="button"
                            type="submit"
                            value="Submit"
                            className={classes.color}
                            onClick={this.handleClick}
                        >
                          ADD
                        </Button>
                      </form>
                    </div>
                  </Container>
                </Container>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default withStyles(styles)(CreateTA);
