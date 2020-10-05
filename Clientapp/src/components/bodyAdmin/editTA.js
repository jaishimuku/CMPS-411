import React , { useState, useEffect } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme } from "@material-ui/core/styles";
import Nav from "../../Layout/Navbar";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  Typography,
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import baseURL from "../../baseURL";
import LayoutAdmin from "../../Layout/SidebarAdmin/indexAdmin";
import { Redirect } from "react-router-dom";


const styles = makeStyles((theme) => ({
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
      height: "175px",
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
    root1: {
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

  const editTA = (props) => {
    const userDetails =JSON.parse(sessionStorage.getItem('updateUserInfo'));
      const [firstName, setFirstName] = useState(userDetails.firstName);
      const [lastName, setLastName] = useState(userDetails.lastName);
      const [username, setUsername] = useState(userDetails.username);
      const [isUpdated, setIsUpdated] = useState(false);
      const [email, setEmail] = useState(userDetails.email);
      const classes = styles();
     
    
     

  function handleSubmit(id, firstName, lastName, username, email) {
    let data = {
      firstName : firstName, 
      lastName : lastName,
      username : username,
      email    : email,
    }
    debugger;
      console.log(id);
      fetch(`${baseURL}/api/Admin/` + id, {
      method: "PUT",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(data),
      }).then((response) => {
        setIsUpdated(true);
        console.log("hello response",response);
        console.log("isUpdated", isUpdated)
          return response.json();
      }) 
      .then ((resData) => { 
        sessionStorage.clear();
        console.log(resData);
      })
      .catch(e => console.error(e))
      
  }
  if (isUpdated) {
    return <Redirect to = "getTA" />
  }  
  return (
        <div>
                 <ToastContainer/>
                 <LayoutAdmin />
                 <div className={classes.wrapper}>
                   <div className={classes.contentContainer}>
                     <div className={classes.content}>
                       <Container className={classes.root1}>
                         <Container component="main" maxWidth="xs">
                           <CssBaseline />
                           <div className={classes.paper}>
                             <form className={classes.form}>
                               <TextField
                                 name="firstName"
                                 margin="normal"
                                 required
                                 fullWidth
                                 id="firstName"
                                 label="FirstName"
                                 autoComplete="firstName"
                                 defaultValue ={firstName}
                                 autoFocus
                                 onChange={(e) => setFirstName(e.target.value)}
                               />
                               <TextField
                                 name="lastName"
                                 margin="normal"
                                 required
                                 fullWidth
                                 id="lastName"
                                 label="LastName"
                                 autoComplete="lastName"
                                 defaultValue={lastName}
                                 onChange={(e) => setLastName(e.target.value)}
                               />
                               <TextField
                                 name="username"
                                 margin="normal"
                                 required
                                 fullWidth
                                 id="username"
                                 label="Username"
                                 autoComplete="username"
                                 defaultValue={username}
                                 onChange={(e) => setUsername(e.target.value)}
                               />
                               <TextField
                                 margin="normal"
                                 required
                                 fullWidth
                                 name="email"
                                 label="Email"
                                 type="email"
                                 id="email"
                                 autoComplete="current-email"
                                 defaultValue={email}
                                 onChange={(e) => setEmail(e.target.value)}
                               />
                               <Button
                                 className="button"
                                 type="submit"
                                 value="Submit"
                                 className={classes.color}
                                 onClick = {() => handleSubmit(userDetails.id, firstName, lastName, username, email)}
                               >
                                 EDIT
                               </Button>
                             </form>
                           </div>
                         </Container>
                       </Container>
                     </div>
                   </div>
                 </div>
                 </div>
      );
    }

    export default editTA;
  