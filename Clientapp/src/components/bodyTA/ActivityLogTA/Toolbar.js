import React, { useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import baseURL from "../../../baseURL";
import { Dropdown } from "semantic-ui-react";
import DropdownMenu from "./dropdownMenu";
import { Container, Header, List } from "semantic-ui-react";
//import { Search as SearchIcon } from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "95ch",
    },
    display: "flex",
    flexDirection: "row",
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  color: {
    margin: 20,
    height: 50,
    width:100,
    background: "#2f6b25",
    color: "white",
    "&:hover": {
      background: "#ffa500",
      color: "white",
    },
  },
}));

const Toolbar = (props) => {
  const [wNumber, setWNumber] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [topic, setTopic] = useState("");

  const classes = useStyles();

  let toastProp = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  // async function fetchData() {
  //   const res = await fetch(`${baseURL}/api/admin`);
  //   res
  //     .json()
  //     .then((res) => setTiers(res))
  //     .catch((err) => setErrors(err));
  // }

  const handleSubmit = () => {
    let FormData = {
      wNumber: wNumber,
      name: name,
      course: course,
      topic: topic,
      tutor: props.val.firstName,
    };

    fetch(`${baseURL}/api/ActivityLog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FormData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Successfully added log!", toastProp);
          return response.json();
        } else {
          toast.error("Error!", toastProp);
        }
      })
      .catch((error) => {
        console.error("error:", error);
      });
  };

  return (
    <div>
      <Card>
        <CardContent>
          <ToastContainer />

          <Box maxWidth={1000}>
            {/* <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search customer"
                variant="outlined"
              /> */}

            <form className={classes.root}>
              <TextField
                id="standard-textarea"
                label="WNumber"
                required
                onChange={(event) => setWNumber(event.target.value)}
              />
              <TextField
                id="standard-textarea"
                label="Name"
                required
                onChange={(event) => setName(event.target.value)}
              />
              {/* <TextField
                id="standard-textarea"
                label="Course"
                required
                onChange={(event) => setCourse(event.target.value)}
              /> */}

              {/*  <Dropdown
                              id="standard-textarea"
                              label="Course"
                               placeholder="Select Class"
                               required
                              onChange={(event) => setCourse(event.target.value)}
                            />*/}
              <DropdownMenu />
              <TextField
                id="standard-textarea"
                label="Topic"
                required
                onChange={(event) => setTopic(event.target.value)}
              />
              <Button
                color="primary"
                variant="contained"
                className={classes.color}
                size="large"
                type="submit"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    val: state.reducer,
  };
};
export default connect(mapStateToProps, null)(Toolbar);
