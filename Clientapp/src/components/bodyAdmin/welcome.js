import React from "react";
import {
  makeStyles,
  Card,
  Typography,
  CardContent,
  Grid,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";

import Layout from "../../Layout";
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

const Welcome = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Layout />
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

export default Welcome;
