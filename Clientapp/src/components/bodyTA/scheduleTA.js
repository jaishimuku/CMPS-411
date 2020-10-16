import React, { useState, useEffect } from "react";
import { makeStyles, Button, Select } from "@material-ui/core";
import { useDispatch, connect } from "react-redux";

import Container from "@material-ui/core/Container";
import { ToastContainer, toast } from "react-toastify";

import ReactDataGrid from "react-data-grid";
import theme from "../../theme/index";
import baseURL from "../../baseURL";
import LayoutTA from "../../Layout/SidebarTA/indexTA";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(5),
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    margin: 50,
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

const columns = [
  { key: "time", name: "TIME", width: 150 },
  { key: "sun", name: "SUNDAY", width: 175 },
  { key: "mon", name: "MONDAY", width: 175 },
  { key: "tue", name: "TUESDAY", width: 175 },
  { key: "wed", name: "WEDNESDAY", width: 175 },
];

const row = [
  { time: "2:00PM-3:00PM", sun: "", mon: "", tue: "", wed: "" },
  { time: "3:00PM-4:00PM", sun: "", mon: "", tue: "", wed: "" },
  { time: "4:00PM-5:00PM", sun: "", mon: "", tue: "", wed: "" },
  { time: "5:00PM-6:00PM", sun: "", mon: "", tue: "", wed: "" },
  { time: "6:00PM-7:00PM", sun: "", mon: "", tue: "", wed: "" },
];

const scheduleTA = () => {
  const [rows, setRows] = useState(row);

  const classes = useStyles();

  useEffect(() => {
    fetchSchedule();
  });

  const fetchSchedule = async () => {
    const res = await fetch(`${baseURL}/api/Schedule`);

    res
      .json()
      .then((res) => {
        debugger;
        setRows(res);
      })
      .catch((err) => console.log(err));
  };

  let toastProp = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  return (
    <div>
      <ToastContainer />
      <LayoutTA />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Container className={classes.root}>
              <ReactDataGrid
                columns={columns}
                rowGetter={(i) => rows[i]}
                rowsCount={5}
                headerRowHeight={60}
                minWidth={870}
              />
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default scheduleTA;
