import React, { useState } from "react";
import LayoutTA from "../../../Layout/SidebarTA/indexTA";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Box, Container, Grid, makeStyles } from "@material-ui/core";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


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
    content:
    {
        flex: "1 1 auto",
        height: "100%",
        overflow: "auto",
    },
}));




const getScheduleGrid = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([
        { Time: "09:30 - 10:15", Monday: "test1", Tuesday: "test2", Wednesday: "test3", Thursday: "test4" },
        { Time: "09:30 - 10:15", Monday: "test1", Tuesday: "test2", Wednesday: "test3", Thursday: "test4" },
        { Time: "09:30 - 10:15", Monday: "test1", Tuesday: "test2", Wednesday: "test3", Thursday: "test4" },
        { Time: "09:30 - 10:15", Monday: "test1", Tuesday: "test2", Wednesday: "test3", Thursday: "test4" },
        { Time: "09:30 - 10:15", Monday: "test1", Tuesday: "test2", Wednesday: "test3", Thursday: "test4" },
        { Time: "09:30 - 10:15", Monday: "test1", Tuesday: "test2", Wednesday: "test3", Thursday: "test4" }
    ]);

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }
    const classes = useStyles();
    return (
        <div>
        <LayoutTA />
        <div className={classes.wrapper}>
            <div className={classes.contentContainer}>
                <div className={classes.content}>
                    <Container className={classes.root}>
                            <div className={classes.root} title="Customers">
                                <h1>DEPARTMENT OF COMPUTER SCIENCE TUTORING SCHEDULE</h1>
                            <div className="ag-theme-alpine" style={{ height: 600, width: 1200 }}>
                                <AgGridReact
                                    onGridReady={onGridReady}
                                    rowData={rowData}>
                                    <AgGridColumn field="Time"></AgGridColumn>
                                    <AgGridColumn field="Monday"></AgGridColumn>
                                    <AgGridColumn field="Tuesday"></AgGridColumn>
                                    <AgGridColumn field="Wednesday"></AgGridColumn>
                                    <AgGridColumn field="Thursday"></AgGridColumn>
                                </AgGridReact>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    </div >


    );
};


export default getScheduleGrid;