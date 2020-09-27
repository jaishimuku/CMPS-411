import React from "react";
import { Box, Container, Typography, makeStyles } from "@material-ui/core";
import * as Image from "../assets/error.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} title="404">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            Please Login to access the resource you are looking for!{"   "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M6 8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm6 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-3 5.5c2.14 0 3.92-1.5 4.38-3.5H4.62c.46 2 2.24 3.5 4.38 3.5zM9 1C4.57 1 1 4.58 1 9s3.57 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.5c-3.59 0-6.5-2.91-6.5-6.5S5.41 2.5 9 2.5s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z" />
            </svg>
          </Typography>

          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src={Image}
            />
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default NotFoundView;
