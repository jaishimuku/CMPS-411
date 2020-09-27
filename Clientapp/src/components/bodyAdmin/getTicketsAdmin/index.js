import React, { useState } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import ProductCard from "./ProductCard";
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
  productCard: {
    height: "100%",
  },
}));

const getTicketsAdmin = () => {
  const classes = useStyles();
  const [products] = useState(data);

  return (
    <div>
      <LayoutAdmin />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Container className={classes.root}>
              <div className={classes.root} title="Products">
                <Box mt={3}>
                  <Grid container spacing={3}>
                    {products.map((product) => (
                      <Grid item key={product.id} lg={4} md={6} xs={12}>
                        <ProductCard
                          className={classes.productCard}
                          product={product}
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
