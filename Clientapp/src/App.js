import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./custom.css";
import { ThemeProvider } from "@material-ui/core";

import theme from "./theme";
import Login from "./components/auth/Login";
import GlobalStyles from "./theme/GlobalStyles";
import WelcomeAdmin from "../src/components/bodyAdmin/welcomeAdmin";
import WelcomeTA from "./components/bodyTA/welcomeTA";
import CreateTA from "./components/bodyAdmin/CreateTA";
import GetTA from "./components/bodyAdmin/GetTA";
import Logout from "./components/auth/Logout";
import { connect } from "react-redux";

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        {props.val.isAdmin ? ( //route according to role
          <Route
            path="/dashboardadmin"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={WelcomeAdmin} exact />
                <Route path={`${url}/welcome`} component={WelcomeAdmin} />
                <Route path={`${url}/TA`} component={GetTA} />
                <Route path={`${url}/addTA`} component={CreateTA} />
              </>
            )}
          />
        ) : (
          <Route
            path="/dashboardta"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={WelcomeTA} exact />
                <Route path={`${url}/welcome`} component={WelcomeTA} />
              </>
            )}
          />
        )}

        <Route path="/logout" component={Logout} />
      </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    val: state.reducer,
  };
};

export default connect(mapStateToProps, null)(App);
