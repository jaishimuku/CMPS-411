import React, {useEffect, useState} from 'react';
import LayoutAdmin from "../../Layout/SidebarAdmin/indexAdmin";
import baseURL from "../../baseURL";
import {
    Box,
    Card,
    Container,
    Divider, makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button
} from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    delete: {
        margin: 20,
        color: "#FF0000",
    },
    update: {
        margin: 20,
        color: "#0000FF",
    },
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
        width: 1000,
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
    actions: {
        justifyContent: "flex-end",
    },
}));

const messageAdmin = (className, staticContext, ...rest) => {
    const [tiers, setTiers] = useState([]);
    const [hasError, setErrors] = useState(false);
    const classes = useStyles();

    function fetchData() {
        fetch(`https://localhost:44300/api/users/1/messages`)
            .then((response) => { return response.json()})
            .then((res) => setTiers(res))
            .catch((err) => setErrors(err));
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <LayoutAdmin />
            <Container style={{marginTop:100, marginLeft:400, width:1000}}>
                <div className="btn-group">
                    <button className="btn btn-warning" style={{margin:5}}>
                        <i className="fa fa-envelope"/> InBox
                    </button>
                    <button className="btn btn-primary" style={{margin:5}}>
                        <i className="fa fa-paper-plane"/> Compose
                    </button>
                </div>
                <div className="row">

                    <br/>
                    <h3>No messages</h3>
                    <br/>
                </div>

                <Divider />
                <Box maxWidth={1000}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>Message</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>From / To</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Sent / Received</strong>
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*{tiers.map((msg) => (*/}
                            {/*    <TableRow hover style={{cursor:'pointer'}} key={msg.id}>*/}
                                <TableRow hover style={{cursor:'pointer'}}>
                                    <TableCell>
                                        {/*{msg.content} */}
                                        This is sample message
                                    </TableCell>
                                    <TableCell>
                                        {/*{msg.SenderFirstName} */}
                                        Mukunda
                                    </TableCell>
                                    <TableCell>
                                        {/*{moment(msg.messageSent).fromNow()} */}
                                        2 min ago
                                    </TableCell>
                                    <TableCell>
                                        <button className="btn btn-danger">Delete</button>
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                            {/*))}*/}
                        </TableBody>
                    </Table>
                </Box>

            </Container>
            {/*<Container style={{marginLeft:400, width:1000}}>*/}
            {/*    <div className="card">*/}
            {/*        <div className="card-body">*/}
            {/*            /!*<div>*!/*/}
            {/*            /!*    <p>No messages yet... Say hi by using the message box below</p>*!/*/}
            {/*            /!*</div>*!/*/}
            {/*            <ul className="chat">*/}
            {/*                <li>*/}
            {/*                    /!*to them*!/*/}
            {/*                    <div>*/}
            {/*                        <div className="chat-body float-left">*/}
            {/*                            <div className="header">*/}
            {/*                                <strong className="primary-font float-left">Sender</strong>*/}
            {/*                                <br/>*/}
            {/*                                <small className="text-muted float-right">*/}
            {/*                                    <span className="fa fa-clock-o">  Sender messageSent Time</span>*/}
            {/*                                </small>*/}
            {/*                            </div>*/}
            {/*                            <p>message content</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    /!*to me *!/*/}
            {/*                    <div>*/}
            {/*                        <div className="chat-body float-right">*/}
            {/*                            <div className="header">*/}
            {/*                                <strong className="primary-font float-right">Me</strong>*/}
            {/*                                <br/>*/}
            {/*                                <small className="text-muted">*/}
            {/*                                    <span className="fa fa-clock-o">messageSent Time</span>*/}
            {/*                                    <span className="text-danger"> (Unread)</span>*/}
            {/*                                    <span  className="text-success">  (Read  message dateRead )</span>*/}
            {/*                                </small>*/}
            {/*                            </div>*/}
            {/*                            <p>message content</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*        <div className="card-footer">*/}
            {/*            <form>*/}
            {/*                <div className="input-group">*/}
            {/*                    <input type="text"*/}
            {/*                           name="content"*/}
            {/*                           required*/}
            {/*                           className="form-control input-sm"*/}
            {/*                           placeholder="send a private messaage"/>*/}
            {/*                    <div className="input-group-append">*/}
            {/*                        <button className="btn btn-primary">Send</button>*/}
            {/*                    </div>*/}
            {/*                    <div>*/}

            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </form>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Container>*/}
        </div>
    )
}

export default messageAdmin;