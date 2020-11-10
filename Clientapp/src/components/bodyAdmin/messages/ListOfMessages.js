import React, { useState } from "react";
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
import moment from "moment";
import Message from "./message";

const ListOfMessages = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(null);

  var messageRow = [
    //if this is louis
    [
      {
        id: 1,
        senderId: 1,
        senderName: "Pao",
        receiverId: 2,
        receiverName: "Louis",
        message: "Hello this is Pao",
        time: "15 min ago",
      },
      {
        id: 2,
        senderId: 2,
        senderName: "Louis",
        receiverId: 1,
        receiverName: "Pao",
        message: "Hello this is Louis",
        time: "5 min ago",
      },
    ],
    [
      {
        id: 1,
        senderId: 1,
        senderName: "Pao",
        receiverId: 3,
        receiverName: "Subash",
        message: "Hello there Subash",
        time: "1 min ago",
      },
    ],
  ];
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
              {messageRow.map((message) => {
                return (
                  <TableRow
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setMessage(message);
                      setShowMessage(true);
                    }}
                  >
                    <TableCell>
                      {/*{msg.SenderFirstName}*/}
                      {message[0].senderName}
                    </TableCell>
                    <TableCell>
                      {message[message.length - 1].message}{" "}
                    </TableCell>
                    <TableCell>
                      {/*{moment(msg.messageSent).fromNow()} */}
                      {message[message.length - 1].time}
                    </TableCell>
                    <TableCell>
                      <Button className="btn btn-danger" size="small">
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Box>
    </Container>
  );
};

export default ListOfMessages;
