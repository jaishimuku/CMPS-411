import React, {useState} from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBBtn,
    MDBInput
} from "mdbreact";

import {Button, makeStyles} from "@material-ui/core";

import LayoutTA from "../../../Layout/SidebarTA/indexTA";
import baseURL from "../../../baseURL";
import { ToastContainer, toast } from "react-toastify";
import {useStyles} from "../ActivityLogTA/Toolbar";

const CreateTicket = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isResolved, setIsResolved] = useState(false);
    const [submittedBy, setSubmittedBy] = useState("");
    const [submittedAt, setAubmittedAt] = useState();
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

    const submitData = () => {
        const  FormData = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
                {
                    title: title,
                    description: description,
                    isResolved: isResolved,
                    submittedBy: submittedBy,
                    submittedAt: submittedAt,
                })
        }

        fetch(`${baseURL}/api/Ticket`,FormData )
            .then((response) => {
                        if (response.ok) {
                            toast.success("Ticket Successfully Added", toastProp);
                            return response.json();
                        } else {
                            toast.error("Error!", toastProp);
                        }
                    })
            .catch((err) => (err));
    }

    return (
        <div>
        <LayoutTA/>
        <MDBContainer style={{marginRight:20}}>
            <ToastContainer/>
            <MDBRow>
                <MDBCol md="10">

                    <MDBCard style={{backgroundColor:'white', marginTop:150}}>
                        <MDBCardHeader className="form-header font-italic rounded " style={{marginLeft:20, marginTop:-25, marginRight:20, backgroundColor:'green'}}>
                            <h3 className="my-3 text-left text-white">
                                Add Ticket
                            </h3>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <form>
                                <div className="grey-text" style={{color:"green"}}>
                                    <MDBInput
                                        style={{width:300, marginTop: 25,}}
                                        label="Title"
                                        type="text"
                                        onChange={(event)=>setTitle(event.target.value)}
                                        required
                                    />

                                    <MDBInput
                                        type="textarea"
                                        rows="8"
                                        label="Description"
                                        onChange={(event)=>setDescription(event.target.value)}
                                        required
                                    />

                                    <MDBInput
                                        style={{width:300, marginTop: 25}}
                                        label="Submitted By"
                                        type="text"
                                        onChange={(event)=>setSubmittedBy(event.target.value)}
                                        required
                                    />

                                </div>

                                <Button
                                    variant="contained"
                                    className={classes.color}
                                    size="large"
                                    type="submit"
                                    onClick={() => {
                                        submitData();
                                    }}
                                >
                                    Submit
                                </Button>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        </div>
    );
};

export default CreateTicket;