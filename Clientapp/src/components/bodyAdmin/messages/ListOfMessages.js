import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Container,
  Card,
  TableRow,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";

import moment from "moment";
import Message from "./message";
import jwt_decode from "jwt-decode";
import baseURL from "../../../baseURL";

const ListOfMessages = (props) => {
  const [message, setMessage] = useState(null);
  const [messageRow, setMessageRow] = useState(null);

  useEffect(() => {
    fetchListOfMessages();
  });

  const fetchListOfMessages = () => {
    console.log(
      "value of props.val.first",
      props.val.firstName + props.val.lastName
    );
    var tokenFromStorage = JSON.parse(localStorage.getItem("state")).reducer
      .token;
    var decodedUser = jwt_decode(tokenFromStorage);
    var id = decodedUser.nameid;

    fetch(`${baseURL}/api/user/MessagesTest/lastMessage/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessageRow(data);
      })
      .catch((err) => console.log("The error is ", err));
  };

  const deleteMessages = (senderId, receiverId) => {
    fetch(`${baseURL}/api/user/MessagesTest/${senderId}/${receiverId}`, {
    method: "DELETE",
  })
.then((response) => {
  return response.json();
})
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log("The error is ", err));
};

  return (
    <Container style={{ width: 1000, paddingLeft: 0 }}>
      <Box>
        {message !== null ? (
          <Message message={message} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>From / To</strong>
                </TableCell>
                <TableCell>
                  <strong>Message</strong>
                </TableCell>
                <TableCell>
                  <strong>Sent / Received</strong>
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {messageRow != null
                ? messageRow.map((message) => {
                    return (
                      <TableRow
                        hover
                        style={{ cursor: "pointer" }}
                        onClick={(event) => {
                          setMessage(message);
                        }}
                      >
                        <TableCell>
                          {/*{msg.SenderFirstName}*/}
                          {props.val.firstName === message.senderFirstName
                            ? message.recipientFirstName
                            :   message.senderFirstName
                            }
                        </TableCell>
                        <TableCell>{message.content} </TableCell>
                        <TableCell>
                          {/*{moment(msg.messageSent).fromNow()} */}
                          {moment(message.messageSent).fromNow()}
                        </TableCell>
                        <TableCell>
                          <Button
                            className="btn btn-danger"
                            size="small"
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteMessages(
                                message.senderId,
                                message.recipientId
                              );
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    );
                  })
                : ""}
            </TableBody>
          </Table>
        )}
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    val: state.reducer,
  };
};
export default connect(mapStateToProps, null)(ListOfMessages);
