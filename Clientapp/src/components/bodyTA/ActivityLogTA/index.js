 import React, { useState } from "react";
import { Box, Container, makeStyles, Button } from "@material-ui/core";
import Results from "./Results";
import Toolbar from "./Toolbar";
import LayoutTA from "../../../Layout/SidebarTA/indexTA";


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
    overflow: "visible",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "visible",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "visible",
  },
  title: {
    textAlign: "center",
    margin: 15,
  },
}));

const ActivityLogTA = (props) => {
  const classes = useStyles();

  return (
    <div>
      <LayoutTA />

      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Container className={classes.root}>
              <div className={classes.root}>
                <Toolbar />
                <Box mt={3}>
                  <Results />
                </Box>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogTA;
