import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../../module/actions";
import { useEffect } from "react";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
  }, []);

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
