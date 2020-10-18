import React from "react";
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
import { ToastContainer, toast } from "react-toastify";
import {makeStyles} from "@material-ui/core";



import LayoutTA from "../../../Layout/SidebarTA/indexTA";
const useStyles = makeStyles((theme) => ({
    color: {
        margin: 20,
        height: 50,
        width: 100,
        background: "#2f6b25",
        color: "white",
        "&:hover": {
            background: "#ffa500",
            color: "white",
        },
    },
}));

const CreateTicket = () => {





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
        toast.success("Ticket Successfully submitted", toastProp);
    }
    return (
        <div>
            <ToastContainer />
            <LayoutTA/>
        <MDBContainer style={{marginRight:20}}>
            <MDBRow>
                <MDBCol md="10">

                    <MDBCard style={{backgroundColor:'white', marginTop:150}}>
                        <MDBCardHeader className="form-header btn-dark-green font-italic rounded " style={{marginLeft:20, marginTop:-25, marginRight:20}}>
                            <h3 className="my-3 text-left text-white">
                                Add Ticket
                            </h3>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <form>
                                <div className="grey-text" style={{color:"green"}}>
                                    <MDBInput
                                        style={{width:300, marginTop: 25}}
                                        label="Title"
                                        type="text"
                                    />

                                    <MDBInput
                                        type="textarea"
                                        rows="8"
                                        label="Description"
                                    />

                                    <MDBInput
                                        style={{width:300, marginTop: 25}}
                                        label="Submitted By"
                                        type="text"
                                    />

                                </div>

                                <div className="text-left mt-4">
                                    <MDBBtn
                                        color="green"
                                        className="mb-3"
                                        type="button"
                                        onClick={submitData}
                                    >

                                        Submit
                                    </MDBBtn>
                                </div>
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