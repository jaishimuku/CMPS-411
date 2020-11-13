import React, { useEffect, useState } from "react";
import {
  Container,
  Divider,
  Paper,
  makeStyles,
  Button,
  TextField,
} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import baseURL from "./../../../baseURL";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  color: {
    background: "white",
    //color: "white",
    "&:hover": {
      background: "#fac35f",
    },
  },
}));

const Compose = (props) => {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    fetch(`${baseURL}/api/admin`)
      .then((response) => {
        return response.json();
      })

      .then((res) => {
        var obj = [];
        res.map((item) => {
          obj.push({
            id: item.id,
            firstName:
              item.firstName.charAt(0).toUpperCase() + item.firstName.slice(1),
            lastName:
              item.lastName.charAt(0).toUpperCase() + item.lastName.slice(1),
          });
        });
        setList([{ id: 1, firstName: "Dr Pao", lastName: "Yang" }, ...obj]);
      })
      .catch((err) =>
        console.log("Error from fetching users in useeffect", err)
      );
  }, []);

  const handleChange = (item) => {
    setRecipient({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
    });
    console.log(item.firstName);
  };

  const handleSend = () => {
    var tokenFromStorage = JSON.parse(localStorage.getItem("state")).reducer
      .token;

    var decodedUser = jwt_decode(tokenFromStorage);
    var currentUserId = decodedUser.nameid;

    var objToSend = {
      recipientId: recipient.id,
      content: message,
    };

    if (recipient === "" || message === "") alert("Something went wrong");

    fetch(`${baseURL}/api/users/${currentUserId}/Messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objToSend),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage("");
        setRecipient("");
      })
      .catch((err) => console.log("The error is ", err));
  };

  const classes = useStyles();
  return (
    <div style={{ width: 1000 }}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Container>
              <div className="float-left">
                <h4>
                  TO :{" "}
                  {recipient !== ""
                    ? recipient.firstName + " " + recipient.lastName
                    : ""}
                </h4>
                <br />
              </div>
              <br />
              <Divider />

              <form>
                <div className="input-group">
                  <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows={4}
                    value={message}
                    variant="outlined"
                    style={{ width: "85%" }}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                  <div className="input-group-append">
                    <Button
                      className="btn btn-primary"
                      style={{ marginLeft: 20, height: 40 }}
                      onClick={handleSend}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </form>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <h4 style={{ textDecorationLine: "underline" }}>
              <u>Choose Recipient</u>
            </h4>
            <FormControl
              required
              component="fieldset"
              //className={classes.formControl}
            >
              <FormGroup>
                {list !== []
                  ? list.map((item) => {
                      return (
                        <MenuItem
                          className={classes.color}
                          onClick={() => handleChange(item)}
                        >
                          {" "}
                          {item.firstName + " " + item.lastName}
                        </MenuItem>
                      );
                    })
                  : ""}
              </FormGroup>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Compose;
