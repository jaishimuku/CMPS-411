import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Container,
  Divider,
  Avatar,
  makeStyles,
  Typography,
} from "@material-ui/core";
import getInitials from "../../bodyTA/ActivityLogTA/getInitials";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import baseURL from "./../../../baseURL";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "30px",
    height: "30px",
  },
}));

const message = (props) => {
  const [messages, setMessages] = useState();
  const classes = useStyles();

  useEffect(() => {
    console.log(props);
    debugger;
    fetchMessages();
  });

  function fetchMessages() {
    fetch(
      `${baseURL}/api/users/${props.message[0].senderId}/Messages/thread/${props.message[0].receiverId}`
    )
      .then((response) => {
        debugger;
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessages("");
      })
      .catch((err) => console.log("The error is ", err));
  }

  return (
    <div>
      <Container style={{ width: 1000, paddingLeft: "0px" }}>
        <div className="card">
          <ArrowBackIcon
            style={{ margin: 15 }}
            onClick={() => window.location.reload()}
          />
          <div className="card-body">
            {props.message.map((item) => {
              return (
                <div className="chat-body">
                  <div className="header">
                    <strong className="primary-font">
                      <Avatar className={classes.avatar}>
                        {item.senderName !== null
                          ? getInitials(item.senderName)
                          : ""}
                      </Avatar>
                      {item.senderName}{" "}
                    </strong>

                    <small className="text-muted">
                      <span className="fa fa-clock-o">{item.time}</span>
                    </small>
                  </div>
                  <p>{item.message}</p>
                  <br />
                  <Divider />
                </div>
              );
            })}
          </div>
          <div>
            <form>
              <div className="input-group">
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  rows={2}
                  //value={message}
                  variant="outlined"
                  style={{ width: "85%", margin: 10 }}
                  //onChange={(event) => setMessage(event.target.value)}
                />
                <div className="input-group-append">
                  <Button
                    className="btn btn-primary"
                    style={{ margin: 20, height: 40 }}
                    // onClick={handleSend}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default message;
