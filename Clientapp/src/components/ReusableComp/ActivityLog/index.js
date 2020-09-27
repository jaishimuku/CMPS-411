import React, { useState } from "react";
import { Box, Container, makeStyles, Button } from "@material-ui/core";
import Results from "./Results";
import Toolbar from "./Toolbar";
import data from "./data";
import LayoutAdmin from "../../../Layout/SidebarAdmin/indexAdmin";

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

const ActivityLog = () => {
  const classes = useStyles();
  const [customers] = useState(data);

  return (
    <div>
      <LayoutAdmin />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Container className={classes.root}>
              <div className={classes.root} title="Customers">
                <Toolbar />
                <Box mt={3}>
                  <Results customers={customers} />
                </Box>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
