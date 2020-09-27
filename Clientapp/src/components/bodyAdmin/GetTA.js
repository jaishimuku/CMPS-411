import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ToastContainer } from "react-toastify";
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
  actions: {
    justifyContent: "flex-end",
  },
}));

const GetTA = ({ className, staticContext, ...rest }) => {
  //const [isLoaded, setIsLoaded] = useState(false);
  const [tiers, setTiers] = useState([]);
  const [hasError, setErrors] = useState(false);
  const data = JSON.parse(JSON.stringify(tiers));
  const classes = useStyles();

  async function fetchData() {
    const res = await fetch(`${baseURL}/api/admin`);
    res
      .json()
      .then((res) => setTiers(res))
      .catch((err) => setErrors(err));
  }
  useEffect(() => {
    fetchData();
  });

  const showAddTAPage = () => {
    return <Redirect to="/addTA" />;
  };

  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Container className={classes.root}>
              <LayoutAdmin />
              <Button
                color="primary"
                variant="contained"
                style={{ margin: 20 }}
                size="large"
                onClick={showAddTAPage()} //button not redirecting issue!!!!
              >
                Add TA
              </Button>
              <Card className={clsx(classes.root, className)} {...rest}>
                <Typography variant="h2" component="h2" style={{ padding: 20 }}>
                  TUTORS
                </Typography>
                <Divider />
                <PerfectScrollbar>
                  <Box minWidth={800}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <strong>Username</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Name</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Email</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((ta) => (
                          <TableRow hover key={ta.id}>
                            <TableCell>{ta.username}</TableCell>
                            <TableCell>
                              {ta.firstName} {ta.lastName}
                            </TableCell>
                            <TableCell>{ta.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </PerfectScrollbar>
              </Card>
            </Container>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GetTA;
