import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Navbar from "../Navbar";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin"; //either sidebarTA or sideAdmin

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
}));

//this component combines navbar and sidebar
const LayoutAdmin = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Navbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <SidebarAdmin
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
    </div>
  );
};

export default LayoutAdmin;
