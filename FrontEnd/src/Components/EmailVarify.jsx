import axios from 'axios';
import React, { useRef } from 'react'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from 'react-router-dom';

export const EmailVarify = () => {

  const txtEmail = useRef();
  const txtName = useRef();

  const navigate = useNavigate();

  const handleSubmit = () => {
    const verificationToken = txtEmail.current.value;

    axios.post(`http://localhost:4000/findEmail/`)
      .then(function (response) {
        if (response.data['status'] === "Success"){
          alert(`Your Enter Email ${verificationToken} Has Been Found`);
          navigate(`/verify/${verificationToken}`);
        }
      })
      .catch(function () {
        alert(`There's No Data Found As ${verificationToken}`);
      })
  }

  return (
    <>
      <h3>Please Verify With Your Account With Email</h3>
      <form method="POST" className="LoginForm">
        <Form className="loginDetails">
          <Row className="mb-3">

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Fullname</Form.Label>
              <Form.Control placeholder="Enter Your Full Name" ref={txtName} name="Name" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref={txtEmail} name="Email" />
            </Form.Group>

          </Row>

          <Link to="/mobileverify" className='mobile'>Verify With Mobile</Link>

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
