import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

// hery ohef mure rctq

export const OtpValidation = () => {

    const txtVerify = useRef();

    const navigate = useNavigate();
    
    const { verificationToken } = useParams();

    const obj = {
        "email": verificationToken
    }

    axios.get(`http://localhost:4000/verification/${verificationToken}`, obj)
    .then(function (response) {
        if (response.data['status'] === "Success") {
            alert('Verification Code Sent Successfully !!!!!');
        }
        else {
            alert('Verification Code Failed To Send.')
        }
    })

    const handleSubmit = () => {

        const obj = {
            "otp": txtVerify.current.value
        }

        axios.post(`http://localhost:4000/verifyOTP/`, obj)
        .then (function (response) {
            if (response.data['status'] === "Success") {
                alert('Verified Successfully');
                navigate(`/resetPass/${verificationToken}`)
            }
        })
        .catch(function(){
            alert('Verification Failed');
        })
    
    }

    return (
        <>
            {
                // alert("OTP Verification Code Has Been Sent To Your Entered Email")
            }
            <Form className="loginDetails">
            <Row className="mb-3">

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Verification Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Veryfication Code" ref={txtVerify} name="verify" />
              </Form.Group>

            </Row>

            <div className="submitbtn">
            <Button variant="primary" type="button" onClick={handleSubmit} >
              Submit
            </Button>
            </div>
          </Form>
        </>
    )
}
