import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from 'react-router-dom';

export const MobileVarify = () => {

  const navigate = useNavigate();

  const txtMobile = useRef();
  const txtName = useRef();

  const handleSubmit = () => {

    const obj = {
      "mobile": txtMobile.current.value,
      "name": txtName.current.value
    }
    const verificationToken = txtMobile.current.value

    axios.post(`http://localhost:4000/findMobile/`, obj)
      .then(function (response) {
        if (response.data['status'] === "Success") {
          alert(`Your Enter Mobile Number ${verificationToken} Has Been Found`);
          // navigate(`/resetPass/${verificationToken}`);
          navigate(`/verify/${verificationToken}`)
        }
      })
      .catch(function () {
        alert(`There's No Data Found As ${verificationToken}`);
      })
  }

  return (
    <>
      <h3>Please Verify With Your Account With Mobile Number</h3>
      <form method="POST" className="LoginForm">
        <Form className="loginDetails">
          <Row className="mb-3">

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Fullname</Form.Label>
              <Form.Control placeholder="Enter Your Full Name" ref={txtName} name="Name" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" placeholder="Enter Mobile" ref={txtMobile} name="Mobile" />
            </Form.Group>

          </Row>

          <Link to="/emailVerify" className='mobile'>Verify With Email</Link>

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
