import React from "react";
import {
  makeStyles,
  Card,
  Typography,
  CardContent,
  Grid,
} from "@material-ui/core";
import { useDispatch, connect } from "react-redux";

import Container from "@material-ui/core/Container";
import { ToastContainer, toast } from "react-toastify";

import LayoutAdmin from "../../Layout/SidebarAdmin/indexAdmin";

import { loginMsg } from "../../module/actions";

const useStyles = makeStyles((theme) => ({
  root: {
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
}));

const WelcomeAdmin = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const hideMsg = () => {
    dispatch(loginMsg(false));
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
      {props.val.loginMsg === true &&
        toast.success("Login Successful", toastProp) &&
        hideMsg()}
      <ToastContainer />
      <LayoutAdmin />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Container className={classes.root}>
              <Card>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    variant="h1"
                    gutterBottom
                  >
                    Welcome Dr. Pao!
                    {/* <ProductCard/> */}
                  </Typography>
                </CardContent>
              </Card>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    val: state.reducer,
  };
};
export default connect(mapStateToProps, null)(WelcomeAdmin);
