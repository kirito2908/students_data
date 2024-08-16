import axios from 'axios';
import React, { useRef } from 'react'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from 'react-router';

export const ForgetPassword = () => {

    const txtPassword = useRef();
    const txtPass = useRef();

    const navigate = useNavigate();

    const { verificationToken } = useParams();

    let obj = {};

    let samePass = false;

    const passChange = (e) => {
        let confirm_pass = txtPassword.current.value;
        let password = e.target.value;

        if (password === confirm_pass) {
            samePass = true;
        }
        else {
            alert("Both Passwords Aren't Matching");
        }
    }
    
    const PasswordChange = (e) => {
        let pass = txtPass.current.value;
        let confirm_password = e.target.value;

        if (pass === confirm_password) {
            samePass = true;
            obj = {
                "password": confirm_password
            }
        }
        else {
            alert("Both Passwords Aren't Matching");
        }
    }

    const handleSubmit = () => {
        
        if (samePass) {
            
            axios.patch(`http://localhost:4000/passChange/${verificationToken}`, obj)
            .then(function () {
                alert("Your Password Has Been Changed Using Email");
                navigate("/");
            })
            .catch(function () {
                alert("Something Went Wrong");
            })
        }
        else {
            alert("Changing Password Failed");
        }
    }

  return (
    <>
        <form method="POST" className="LoginForm">
          <Form>
            <Row className="mb-3">

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={passChange} ref={txtPass} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name="password" ref={txtPassword} onChange={PasswordChange} />
              </Form.Group>

            </Row>

            <div className="submitbtn">
            <Button variant="primary" type="button" onClick={handleSubmit} >
              Submit
            </Button>
            </div>
          </Form>
        </form>
    </>
  )
}
