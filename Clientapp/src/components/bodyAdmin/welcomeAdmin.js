import React, {useState, useEffect} from "react";
import {
  makeStyles,
  Card,
  Typography,
  CardContent,
} from "@material-ui/core";
import GroupIcon from '@material-ui/icons/Group';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";
import Store from "@material-ui/icons/Store";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { useDispatch, connect } from "react-redux";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import Container from "@material-ui/core/Container";
import { ToastContainer, toast } from "react-toastify";

import LayoutAdmin from "../../Layout/SidebarAdmin/indexAdmin";

import { loginMsg } from "../../module/actions";
import baseURL from "../../baseURL";





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
  paper: {
    marginTop:20,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  contents: {
    padding: '5px 10px',
    marginLeft: 120,
    marginTop: 30,
    height: 60
  },
  number: {
    display: 'block',
     fontWeight: "medium",
    fontSize: 18,
    color: "grey"
  },
  text: {
    fontSize: 20,
     fontWeight: 'normal',
    color: "black"
  },
  iconSpan: {
    float: 'left',
    height: 90,
    width: 90,
    textAlign: 'center',
    backgroundColor: "white"
  },
  icon: {
    height: 40,
    width: 40,
    maxWidth: '100%'

  }
  
}));

const WelcomeAdmin = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [hasError, setErrors] = useState(false);
  const[tas, setTa] = useState([]);

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

  const fetchTA = () => {
    fetch(`${baseURL}/api/Schedule/current`)
      .then((response) => response.json())
      .then((res) => setTa(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTA();
  });

//console.log("hello",tas);
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

<MDBContainer style={{marginRight:20}}>
            <MDBRow>
                <MDBCol xs="5">

                    <MDBCard style={{backgroundColor:'white', marginTop:90}}>
                        <MDBCardHeader className="form-header font-italic rounded " style={{marginLeft:20, marginTop:-25, marginRight:20, backgroundColor: "#ffa500" }}>
                            <h3 className="my-3 text-left text-white">
                                Currently Working TAS
                            </h3>
                        </MDBCardHeader>
                        <MDBCardBody>
                        {/* <Paper> */}
        <div className={classes.iconSpan}>
          <GroupIcon color="primary"
                className={classes.icon}
          />
          <span className={classes.text}>{tas.taToReturn}</span>
        </div>
        <div className={classes.contents}>
          <span className={classes.number}>{tas.timeToReturn}</span>
        </div>
      {/* </Paper> */}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

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
