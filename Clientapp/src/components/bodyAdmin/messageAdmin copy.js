import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../Layout/SidebarAdmin/indexAdmin";
import baseURL from "../../baseURL";
import {
  Box,
  Card,
  Container,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  delete: {
    margin: 20,
    color: "#FF0000",
  },
  update: {
    margin: 20,
    color: "#0000FF",
  },
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
    width: 1000,
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
  actions: {
    justifyContent: "flex-end",
  },
}));

const messageAdmin = (className, staticContext, ...rest) => {
  const [tiers, setTiers] = useState([]);
  const [messageClicked, setMessageClicked] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [inboxActive, setInboxActive] = useState(true);
  const [composeActive, setComposeActive] = useState(false);

  const classes = useStyles();

  function fetchData() {
    fetch(`https://localhost:44300/api/users/1/messages`)
      .then((response) => {
        return response.json();
      })
      .then((res) => setTiers(res))
      .catch((err) => setErrors(err));
  }
  useEffect(() => {
    fetchData();
  }, []);

  
  return (
    <div>
      <LayoutAdmin />
      <Container style={{ marginTop: 100, marginLeft: 400, width: 1000 }}>
        <div className="btn-group">
          {inboxActive ? (<div><Button
              type="button"
              size="large"
              className="btn btn-success"
              style={{ margin: 5, color: "white" }}
              // onClick={() => setShowInbox(true)}
            >
              <i className="fa fa-envelope-open" /> Inbox
            </Button>
            
            </div>
            
          ) : (
            <Button
              type="button"
              size="large"
              className="btn btn-success"
              style={{ margin: 5 }}
              onClick={() => {
                setInboxActive(true);
                setComposeActive(false);
              }}
            >
              <i className="fa fa-envelope-open" /> Inbox
            </Button>
          )}
          {composeActive ? (
            <Button
              className="btn btn-primary"
              size="large"
              style={{ margin: 5, color: "white" }}
            >
              <i className="fa fa-paper-plane" /> Compose
            </Button>
          ) : (
            <Button
              className="btn btn-primary"
              size="large"
              style={{ margin: 5 }}
              onClick={() => {
                setComposeActive(true);
                setInboxActive(false);
              }}
            >
              <i className="fa fa-paper-plane" /> Compose
            </Button>
          )}
        </div>
        <Divider />
        
        ) : (
          <Container style={{ width: 1000, paddingLeft: "0px" }}>
            <Divider />
            <div className="card">
              <div className="card-body">
                {/*<div>*/}
                {/*    <p>No messages yet... Say hi by using the message box below</p>*/}
                {/*</div>*/}
                <ul className="chat">
                  <li>
                    {/*to them*/}
                    <div>
                      <div className="chat-body float-left">
                        <div className="header">
                          <strong className="primary-font float-left">
                            Sender
                          </strong>
                          <br />
                          <small className="text-muted float-right">
                            <span className="fa fa-clock-o">
                              {" "}
                              Sender messageSent Time
                            </span>
                          </small>
                        </div>
                        <p>message content</p>
                      </div>
                    </div>
                    {/*to me */}
                    <div>
                      <div className="chat-body float-right">
                        <div className="header">
                          <strong className="primary-font float-right">
                            Me
                          </strong>
                          <br />
                          <small className="text-muted">
                            <span className="fa fa-clock-o">
                              messageSent Time
                            </span>
                            <span className="text-danger"> (Unread)</span>
                            <span className="text-success">
                              {" "}
                              (Read message dateRead )
                            </span>
                          </small>
                        </div>
                        <p>message content</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card-footer">
                <form>
                  <div className="input-group">
                    <input
                      type="text"
                      name="content"
                      required
                      className="form-control input-sm"
                      placeholder="send a private messaage"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary">Send</button>
                    </div>
                    <div></div>
                  </div>
                </form>
              </div>
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default messageAdmin;
