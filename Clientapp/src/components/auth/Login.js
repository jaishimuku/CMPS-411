import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
// import { createMuiTheme } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import { withStyles } from "@material-ui/core/styles";

// import NavBar from "./NavBar";
import NavBar from "../../Layout/Navbar";
import Logo from "../../assets/slulogo.png";

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
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      islogin: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlepassword = this.handlepassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }
  handlepassword(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick() {
    let FormData = {
      Username: this.state.username,
      Password: this.state.password,
    };
    console.log(FormData);
    fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FormData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("invalid login");
        }
      })
      .then((response) => {
        this.setState({ islogin: true });
        // window.location.reload();
        sessionStorage.setItem("userData", JSON.stringify(response));
      })
      .catch((error) => {
        console.error("error:", error);
        alert(error);
      });
  }
  render() {
    // const theme = createMuiTheme();
    const { username, password } = this.state;
    const { classes } = this.props;
    if (this.state.islogin) {
      return <Redirect to="/dashboardadmin" />;
    }
    return (
      <div>
        <NavBar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
          <img src={Logo} className={classes.logo} alt="Logo" />
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <TextField
                name="userName"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoComplete="username"
                value={username}
                autoFocus
                onChange={this.handleChange}
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
                onChange={this.handlepassword}
              />
              <Button
                className="button"
                type="submit"
                value="Submit"
                className={classes.color}
                onClick={this.handleClick}
              >
                Login
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
