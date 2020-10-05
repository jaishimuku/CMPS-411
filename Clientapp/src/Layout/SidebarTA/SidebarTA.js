import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Users as UsersIcon,
  LogOut as LogOutIcon,
  Calendar as CalendarIcon,
  MessageSquare as MessageIcon,
  BookOpen as BookLogIcon,
} from "react-feather";

import SidebarItemTA from "./SidebarItemTA";
import Logo from "../../assets/slulogo.png";
import { connect } from "react-redux";

const items = [
  {
    href: "/dashboardta/welcome",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/dashboardta/scheduleTA",
    icon: CalendarIcon,
    title: "Schedule",
  },
  {
    href: "/dashboardta/ticketsTA",
    icon: AlertCircleIcon,
    title: "Tickets",
  },
  {
    href: "/dashboardta/welcome",
    icon: MessageIcon,
    title: "Message",
  },
  {
    href: "/dashboardta/activityLogTA",
    icon: UsersIcon,
    title: "Visit Log",
  },
  {
    href: "/logout",
    icon: LogOutIcon,
    title: "Log Out",
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const SidebarTA = (props) => {
  const classes = useStyles();

  const user = {
    avatar: Logo,
    jobTitle: "TA",
    name: `${props.val.firstName} ${props.val.lastName}`,
  };

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={Logo}
          to="/dashboardta"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <SidebarItemTA
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={props.onMobileClose}
          open={props.openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    val: state.reducer,
  };
};
export default connect(mapStateToProps, null)(SidebarTA);
