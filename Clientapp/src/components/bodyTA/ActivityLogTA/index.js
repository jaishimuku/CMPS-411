import React, { useState } from "react";
import { Box, Container, makeStyles, Button } from "@material-ui/core";
import Results from "./Results";
import Toolbar from "./Toolbar";
import data from "./data";
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

const ActivityLogTA = (props) => {
  const classes = useStyles();
  const [students] = useState(data);

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
                  <Results students={students} />
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
