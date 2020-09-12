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

import SidebarItem from "./SidebarItem";
import Logo from "../assets/slulogo.png";
import Welcome from "../components/bodyAdmin/welcome";

const user = {
  avatar: "../assets/slulogo.png",
  jobTitle: "TA SELU",
  name: "Test Name",
};

const items = [
  {
    href: "/dashboardadmin/Dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/dashboardadmin/Schedule",
    icon: UsersIcon,
    title: "Schedule",
  },
  {
    href: "/dashboardadmin/Tickets",
    icon: CalendarIcon,
    title: "Tickets",
  },
  {
    href: "/dashboardadmin/Message",
    icon: AlertCircleIcon,
    title: "Message",
  },
  {
    href: "/dashboardadmin/VisitLog",
    icon: MessageIcon,
    title: "Visit Log",
  },
  {
    href: "/login",
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

const Sidebar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();

  //const location = useLocation();
  // useEffect(() => {
  //   if (openMobile && onMobileClose) {
  //     onMobileClose();
  //   }
  // }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={Logo}
          to="/dashboardadmin"
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
            <SidebarItem
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
          onClose={onMobileClose}
          open={openMobile}
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

export default Sidebar;
