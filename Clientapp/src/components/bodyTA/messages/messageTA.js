import React, { useEffect, useState } from "react";
import LayoutTA from "../../../Layout/SidebarTA/indexTA";
import baseURL from "../../../baseURL";
import { Container, Divider, makeStyles, Button } from "@material-ui/core";
import moment from "moment";
import ListOfMessages from "./ListOfMessages";
import Compose from "./Compose";

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

const messageTA = (className, staticContext, ...rest) => {
  const [tiers, setTiers] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [inboxActive, setInboxActive] = useState(true);
  const [showCompose, setShowCompose] = useState(false);
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
      <LayoutTA />
      <Container style={{ marginTop: 100, marginLeft: 340, width: 1000 }}>
        <div className="btn-group">
          {inboxActive ? (
            <div>
              <Button
                type="button"
                size="large"
                className="btn btn-success"
                style={{ margin: 5, color: "white" }}
              >
                <i className="fa fa-envelope-open" /> Inbox
              </Button>
              <Button
                className="btn btn-primary"
                size="large"
                style={{ margin: 5 }}
                onClick={() => setInboxActive(false)}
              >
                <i className="fa fa-paper-plane" /> Compose
              </Button>
              <Divider width="98%" />
              <ListOfMessages />
            </div>
          ) : (
            <div>
              <Button
                type="button"
                size="large"
                className="btn btn-success"
                style={{ margin: 5 }}
                onClick={() => setInboxActive(true)}
              >
                <i className="fa fa-envelope-open" /> Inbox
              </Button>
              <Button
                className="btn btn-primary"
                size="large"
                style={{ margin: 5, color: "white" }}
              >
                <i className="fa fa-paper-plane" /> Compose
              </Button>
              <Divider />
              <Compose />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default messageTA;
