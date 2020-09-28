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
import NotFoundView from "./components/error";
import getTicketsAdmin from "./components/bodyAdmin/getTicketsAdmin/index";
import getTicketsTA from "./components/bodyTA/getTicketsTA/index";
import ActivityLogAdmin from "./components/bodyAdmin/ActivityLogAdmin/index";
import ActivityLogTA from "./components/bodyTA/ActivityLogTA/index";
import getScheduleGrid from "./components/bodyTA/Schedule/index";

//FOR EASIER DEVELOPING EXPERIENCE,USE(1) AND COMMENT (2).(2) HAS ROLE ACCESS AND WILL GIVE 404 ERROR WHENEVER REFRESHED
//ALSO PLEASE MAKE CHANGES IN BOTH (1) and (2) ACCORDINGLY
//(1)-------->
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} exact />
          <Route path="/login" component={Login} exact />
          <Route
            path="/dashboardadmin"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={WelcomeAdmin} exact />
                <Route path={`${url}/welcome`} component={WelcomeAdmin} />
                <Route path={`${url}/getTA`} component={GetTA} />
                <Route path={`${url}/addTA`} component={CreateTA} />
                <Route
                  path={`${url}/ticketsAdmin`}
                  component={getTicketsAdmin}
                />
                <Route
                  path={`${url}/activityLogAdmin`}
                  component={ActivityLogAdmin}
                />
              </>
            )}
          />
          <Route
            path="/dashboardta"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={WelcomeTA} exact />
                <Route path={`${url}/schedule`} component={getScheduleGrid} />
                <Route path={`${url}/ticketsTA`} component={getTicketsTA} />
                <Route
                  path={`${url}/activityLogTA`}
                  component={ActivityLogTA}
                />
              </>
            )}
          />
          <Route path="/logout" component={Logout} />
          <Route component={NotFoundView} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
export default App;

//(2)------------->
// const App = (props) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <GlobalStyles />
//       <Router>
//         <Switch>
//           <Route exact path="/" component={Login} exact />
//           <Route path="/login" component={Login} exact />
//           {props.val.isAdmin === true && ( //route according to role
//             <Route
//               path="/dashboardadmin"
//               render={({ match: { url } }) => (
//                 <>
//                   <Route path={`${url}/`} component={WelcomeAdmin} exact />
//                   <Route path={`${url}/welcome`} component={WelcomeAdmin} />
//                   <Route path={`${url}/getTA`} component={GetTA} />
//                   <Route path={`${url}/addTA`} component={CreateTA} />
//                 <Route path={`${url}/ticketsAdmin`} component={getTicketsAdmin} />
//                  <Route path={`${url}/activityLogAdmin`} component={ActivityLogAdmin}/>
//                 </>
//               )}
//             />
//           )}
//           {props.val.isAdmin === false && (
//             <Route
//               path="/dashboardta"
//               render={({ match: { url } }) => (
//                 <>
//                   <Route path={`${url}/`} component={WelcomeTA} exact />
//                   <Route path={`${url}/welcome`} component={WelcomeTA} />
//
//                        <Route path={`${url}/ticketsTA`} component={getTicketsTA} />
//                      <Route path={`${url}/activityLogTA`} component={ActivityLogTA} />
//                 </>
//               )}
//             />
//           )}
//           <Route path="/logout" component={Logout} />
//           <Route component={NotFoundView} />
//         </Switch>
//       </Router>
//     </ThemeProvider>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     val: state.reducer,
//   };
// };

// export default connect(mapStateToProps, null)(App);
