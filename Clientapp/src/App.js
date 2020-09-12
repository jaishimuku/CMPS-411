import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./custom.css";
import { ThemeProvider } from "@material-ui/core";

import theme from "./theme";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import GlobalStyles from "./theme/GlobalStyles";
import Welcome from "./components/bodyAdmin/welcome";
import WelcomeTa from "./components/bodyAdmin/welcome_ta";
import Layout from "./Layout";
import LayoutTa from "./LayoutTa";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/dashboardTa" component={WelcomeTa} />
        {/* <Route path="/signup" component={SignUp} /> */}

        <Route
          path="/dashboardadmin"
          render={({ match: { url } }) => (
            <>
              <Route path={`${url}/`} component={Welcome} exact />
              <Route path={`${url}/welcome`} component={Welcome} />
            </>
          )}
        />
      </Router>
    </ThemeProvider>
  );
};

export default App;
