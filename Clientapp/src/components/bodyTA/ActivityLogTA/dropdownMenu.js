import React from "react";
import { Dropdown, Visibility } from "semantic-ui-react";
import { Container } from "react-bootstrap";
const classOptions = [
  {
    key: "CMPS 161 ",
    text: "CMPS 161",
    value: "CMPS 161",
  },
  {
    key: "CMPS 280",
    text: "CMPS 280",
    value: "CMPS 280",
  },
  {
    key: "CMPS 290",
    text: "CMPS 290",
    value: "CMPS 290",
  },
  {
    key: "CMPS 390",
    text: "CMPS 290",
    value: "CMPS 290",
  },
];

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const DropdownExampleSelection = () => (
  <Container style={{ margin: 30 }}>
    <Dropdown
      placeholder="Select a Class"
      fluid
      selection
      options={classOptions}
    />
  </Container>
);

export default DropdownExampleSelection;
