import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from 'react-router-dom';

export const Login = () => {

  const txtEmail = useRef();
  const txtPassword = useRef();

  var num = 0;

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  })

  const handleSubmit = () => {

    const email = txtEmail.current.value;

    const obj = {
      "email": email,
      "password": txtPassword.current.value
    }

    num += 1;

    if (localStorage.getItem('Email') != email){
      num = 0;
    }

    axios.post(`http://localhost:4000/loginEmail`, obj)
      .then(function (response) {

        if (response.data['status'] === "Success") {
          if (num < 3) {
            localStorage.setItem("isLogin", true);
            alert("Logged In Successfully");
            navigate("/view");
          }
          else {
            alert("You've Entered Currect Information But You Can't Login Now");
          }
        }
      })
      .catch(function () {
        if (num <= 3) {
          alert(`Login Failed ! You've ${3 - num} Tries Left To Try`);
          localStorage.setItem("Email", email);
        }
        else {
          alert("You Have Exhaused All Of Your Tries. Come Back Later");
        }
      })
  }

  return (
    <>
      <form method="POST" className="LoginForm">
        <Form className="loginDetails">
          <Row className="mb-3">

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref={txtEmail} name="Email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref={txtPassword} name="Password" />
            </Form.Group>
          </Row>

          <div className="resetStuff">
            <Link to="/emailverify" className="pass" >Forget Password ?</Link>
            <Link to="/mobilelog" className='mobile'>Log In With Mobile</Link>
          </div>

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
