import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { ToastContainer } from "react-toastify";
import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';

import baseURL from "../../baseURL";
import LayoutAdmin from "../../Layout/SidebarAdmin/indexAdmin";

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const GetTA = ({className, staticContext, ...rest}) => {
  //const [isLoaded, setIsLoaded] = useState(false);
  const [tiers, setTiers] = useState([]);
  const [hasError, setErrors] = useState(false);
  const data = JSON.parse(JSON.stringify(tiers));
  const classes = useStyles();


  async function fetchData(){
   const res = await fetch(`${baseURL}/api/admin`);
      res
      .json()
      .then(res => setTiers(res))
      .catch(err => setErrors(err));
      }
  useEffect(() => {
    fetchData();
  });


  return (
    <>
    <ToastContainer/>
    <Container
            style={{
              paddingTop: "10vh"
            }}
          >
       <LayoutAdmin/> 
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Tutors" />
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
                <TableRow
                  hover
                  key={ta.id}
                  // {...console.log(ta.id)}
                >
                  <TableCell>
                    {ta.username}
                  </TableCell>
                  <TableCell>
                    {ta.firstName} {ta.lastName}
                  </TableCell>
                  <TableCell>
                    {ta.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
    </Container>
    </>
  );
};

GetTA.propTypes = {
  className: PropTypes.string
};
export default GetTA;