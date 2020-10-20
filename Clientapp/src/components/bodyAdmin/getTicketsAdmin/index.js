import React, {useEffect, useState} from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import ProductCard from "./ProductCard";
import LayoutAdmin from "../../../Layout/SidebarAdmin/indexAdmin";
import baseURL from "../../../baseURL";
import {forEach} from "react-bootstrap/ElementChildren";

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
  productCard: {
    height: "100%",
  },
}));

const getTicketsAdmin = () => {
  const [tiers, setTiers] = useState([]);
  const [hasError, setErrors] = useState(false);
  const classes = useStyles();
  const data = JSON.parse(JSON.stringify(tiers));

  function fetchData() {
    fetch(`${baseURL}/api/Ticket`)
        .then((response) => { return response.json()})
        .then((res) => setTiers(res))
        .catch((err) => setErrors(err));
  }
  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      <LayoutAdmin />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Container className={classes.root}>
              <div className={classes.root} >
                <Box mt={3}>
                  <Grid container spacing={3}>
                    {data.map((ticket) => (
                      <Grid item key={ticket.id} lg={4} md={6} xs={12}>
                        <ProductCard
                          className={classes.productCard}
                          ticket={ticket}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Box mt={3} display="flex" justifyContent="center"></Box>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default getTicketsAdmin;
