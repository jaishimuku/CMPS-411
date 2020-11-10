import React, { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import getInitials from "./getInitials";
import baseURL from "../../../baseURL";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  delete: {
    margin: 5,
    color: "#FF0000",
  },
  color: {
    color: "black",
    "&:hover": {
      background: "#ffa500",
      color: "white",
    },
  },
}));

const Results = () => {
  const classes = useStyles();
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [students, setStudents] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedStudentIds;

    if (event.target.checked) {
      newSelectedStudentIds = students.map((student) => student.id);
    } else {
      newSelectedStudentIds = [];
    }

    setSelectedStudentIds(newSelectedStudentIds);
  };
  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedStudentIds.indexOf(id);
    let newSelectedStudentIds = [];

    if (selectedIndex === -1) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds.slice(1)
      );
    } else if (selectedIndex === selectedStudentIds.length - 1) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds.slice(0, selectedIndex),
        selectedStudentIds.slice(selectedIndex + 1)
      );
    }

    setSelectedStudentIds(newSelectedStudentIds);
  };
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    fetchDailyLog();
  });

  const fetchDailyLog = () => {
    fetch(`${baseURL}/api/ActivityLog`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.log(error));
  };

  const timeOut = (id) => {
    fetch(`${baseURL}/api/ActivityLog/` + id, {
      method: "PUT",
    }).catch((err) => console.error(err));
  };

  function deleteLog(id) {
    fetch(`${baseURL}/api/ActivityLog/` + id, {
      method: "DELETE",
    }).catch((err) => console.error(err));
  }

  return (
    <Card>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedStudentIds.length === students.length}
                    color="primary"
                    indeterminate={
                      selectedStudentIds.length > 0 &&
                      selectedStudentIds.length < students.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}

                <TableCell>
                  <Box fontWeight="fontWeightBold">WNumber</Box>
                </TableCell>
                <TableCell>
                  {" "}
                  <Box fontWeight="fontWeightBold">Name</Box>
                </TableCell>
                <TableCell>
                  {" "}
                  <Box fontWeight="fontWeightBold">Course</Box>
                </TableCell>
                <TableCell>
                  {" "}
                  <Box fontWeight="fontWeightBold">Topic</Box>
                </TableCell>
                <TableCell>
                  {" "}
                  <Box fontWeight="fontWeightBold">TA</Box>
                </TableCell>
                <TableCell>
                  {" "}
                  <Box fontWeight="fontWeightBold">Time IN</Box>
                </TableCell>
                <TableCell>
                  <Box fontWeight="fontWeightBold">Time OUT</Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.slice(0, limit).map((student) => (
                <TableRow
                  hover
                  key={student.id}
                  selected={selectedStudentIds.indexOf(student.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedStudentIds.indexOf(student.id) !== -1}
                      onChange={(event) => handleSelectOne(event, student.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>{student.wNumber}</TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      {student.name}
                    </Box>
                  </TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.topic}</TableCell>
                  <TableCell>
                    {" "}
                    <Box alignItems="center" display="flex">
                      <Avatar
                        className={classes.avatar}
                        //src={student.avatarUrl}
                      >
                        {student.tutor !== null ? (
                          getInitials(student.tutor)
                        ) : (
                          <div></div>
                        )}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {student.tutor}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {moment(student.timeIn).format("MM/DD h:mm a")}
                  </TableCell>
                  <TableCell>
                    {moment(student.timeIn).format("MM/DD h:mm a") !==
                    moment(student.timeOut).format("MM/DD h:mm a") ? (
                      moment(student.timeOut).format("MM/DD h:mm a")
                    ) : (
                      <div></div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={students.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[10, 15, 20]}
      />
    </Card>
  );
};

export default Results;
