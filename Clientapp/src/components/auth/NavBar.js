import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: "#047948",
  },
  mini: {
    height: 32,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "white",
    textDecoration: "none",
    fontFamily: "Raleway",
    fontSize: "20px",
    "&:hover": {
      textDecoration: "none",
      color: "#e4e4e4",
    },
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reDirect: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    sessionStorage.clear("userData");
    return <Link to="/login" />;
  }

  render() {
    const { classes } = this.props;
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    console.log(userData);
    return (
      <div>
        <AppBar
          position="static"
          color="primary"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <Link to="/" className={classes.link}></Link>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              <Link to="/" className={classes.link}>
                Selu Cs Lab
              </Link>
            </Typography>
            {/* <nav>
              <Link to="/" className={classes.link}>
                Home
              </Link>

              {userData == null ? (
                <Link to="/login" className={classes.link}>
                  {" "}
                  Login
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={classes.link}
                  onClick={this.handleLogout}
                >
                  Logout
                </Link>
              )}
              {userData == null ? (
                <Link to="/signup" className={classes.link}>
                  Signup
                </Link>
              ) : (
                <div></div>
              )}
            </nav> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(NavBar);
