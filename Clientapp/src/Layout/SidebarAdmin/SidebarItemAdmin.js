import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { Button, ListItem, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
    "&:hover": {
      // backgroundColor: "#D3D3D3",
      color: "green",
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: "auto",
  },

  active: {
    color: theme.palette.primary.main,
    backgroundColor: "#fac35f !important",
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}));

const SidebarItemAdmin = ({ className, href, icon: Icon, title, ...rest }) => {
  const classes = useStyles();

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={href}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};

export default SidebarItemAdmin;
