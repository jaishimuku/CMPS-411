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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        {/* <Route path="/signup" component={SignUp} /> */}

        <Route
          path="/dashboardta"
          render={({ match: { url } }) => (
            <>
              <Route path={`${url}/`} component={WelcomeTA} exact />
              <Route path={`${url}/welcome`} component={WelcomeTA} />
            </>
          )}
        />

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
      </Router>
    </ThemeProvider>
  );
};

export default App;
