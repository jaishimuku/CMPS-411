import React from "react";

import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";

import { withStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { ToastContainer } from "react-toastify";

import baseURL from "../../baseURL";
import LayoutAdmin from "../../Layout/SidebarAdmin/indexAdmin";

const styles = () => ({
  color: {
    background: "#2f6b25",
    color: "white",
    paddingleft: "10vw",
    marginLeft: "15vw",

    "&:hover": {
      background: "#ffa500",
      color: "white",
    },
  },
  taScreen: {
    paddingLeft: "15vw",
  },
  delete: {
    background: "#DC143C",
    color: "white",
    "&:hover": {
      background: "#ffa500",
      color: "white",
    },
  },
  update: {
    background: "#1E90FF",
    color: "white",
    "&:hover": {
      background: "#ffa500",
      color: "white",
    },
  },

  title: {
    textAlign: "center",
    margin: 15,
  },
});

class GetTA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      tiers: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isLoaded: true });
  }

  componentDidMount() {
    fetch(`${baseURL}/api/admin`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          tiers: myJson,
        });
        console.log(myJson);
      });
  }

  render() {
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          color: color,
          backgroundColor: color,
          height: 5,
          marginTop: "35px",
        }}
      />
    );
    const { classes } = this.props;
    let { isLoaded, tiers } = this.state;
    if (isLoaded) {
      return <Redirect to="addTA" />;
    } else {
      return (
        <>
          <ToastContainer />

          <Container
            style={{
              paddingTop: "10vh",
            }}
          >
            <LayoutAdmin />
            {tiers.map((tier) => (
              <div className={classes.taScreen}>
                <Card
                  variant="outlined"
                  style={{
                    margin: "10px",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "18px",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    Username: {tier.username}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "18px",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    First Name: {tier.firstName}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "18px",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    Last Name: {tier.lastName}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "18px",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    Email: {tier.email}
                  </Typography>
                </Card>
                <Button
                  className="button"
                  type="submit"
                  value="Submit"
                  className={classes.delete}
                  onClick={this.handleClick}
                >
                  Delete
                </Button>

                <Button
                  className="button"
                  type="submit"
                  value="Submit"
                  className={classes.update}
                  onClick={this.handleClick}
                >
                  Update
                </Button>
                <ColoredLine
                  color="#047923"
                  style={{
                    marginBottom: "20px",
                  }}
                />
              </div>
            ))}

            <Button
              className="button"
              type="submit"
              value="Submit"
              className={classes.color}
              onClick={this.handleClick}
            >
              Add New TA
            </Button>
          </Container>
        </>
      );
    }
  }
}
export default withStyles(styles)(GetTA);
