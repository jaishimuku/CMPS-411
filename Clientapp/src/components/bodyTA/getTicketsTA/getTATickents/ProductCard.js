import React from "react";
import clsx from "clsx";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core";
import baseURL from "../../../../baseURL";
import {Button} from "@material-ui/core";
import moment from "moment";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import {toast, ToastContainer} from "react-toastify";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    statsItem: {
        alignItems: "center",
        display: "flex",
        color:"black"
    },
    statsIcon: {
        marginRight: theme.spacing(1),
    },
}));

const ProductCard = ({ className, ticket, ...rest }) => {
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


    return (
        <>
            <Card className={clsx(classes.root, className)} {...rest}>
                <ToastContainer/>
                <Card style={{backgroundColor:"green", marginLeft:20, marginRight:20, height:50, marginTop:-10, marginBottom:10, fontStyle:'italic'}}>
                    <h3 className="my-3 text-md-center text-white">
                        Ticket
                    </h3>
                </Card>
                <CardContent>
                    <Typography
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                    >
                        {ticket.title}
                    </Typography>
                    <Typography align="center" color="textPrimary" variant="body1">
                        {ticket.description}
                    </Typography>
                </CardContent>
                <Box flexGrow={1} />
                <Divider />
                <Box p={2}>
                    <Grid container justify="space-between" spacing={2}>
                        <Grid className={classes.statsItem} item>
                            <Typography color="inherit" display="inline" variant="body2">
                                SubmittedBy:
                                <strong> { ticket.submittedBy}
                                    <br/>
                                    {moment(ticket.submittedAt).format("MM/DD/YYYY")}</strong>
                            </Typography>
                        </Grid>
                        <Grid className={classes.statsItem} item>
                            <Typography color="textSecondary" display="inline" variant="body2">
                                {/*ternery operator*/}
                                {
                                    ticket.isResolved !== true ?

                                        (
                                            <>
                                                <ClearIcon color="error" className={classes.icon}
                                                />
                                                <span className={classes.text} style={{color:'red'}}>Unresolved</span>
                                            </>
                                        ) : <>
                                            <DoneAllIcon color="primary"
                                                         className={classes.icon}
                                            />
                                            <span className={classes.number}>Resolved</span>
                                        </>
                                }


                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </>
    );
};

export default ProductCard;
