import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../../module/actions";
import { useEffect } from "react";
import baseURL from "../../baseURL";

const Logout = (props) => {
  useEffect(() => {
    timeOutAllStudents(props.val.firstName);
    props.logout();
  }, []);

  const timeOutAllStudents = async (firstName) => {
    await fetch(`${baseURL}/api/ActivityLog/` + firstName, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(firstName),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.error(err));
  };

  return <Redirect to="/login" />;
};

const mapStateToProps = (state) => {
  return {
    val: state.reducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
