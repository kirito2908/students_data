import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from 'react-router-dom';

export const ForgetEmail = () => {

    const txtMobile = useRef();
    const txtPassword = useRef();

    var num = 0;

    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.clear();
    })

    const handleSubmit = () => {     

      const mobile = txtMobile.current.value

        num += 1;
        
        const obj = {
          "mobile": mobile,
          "password": txtPassword.current.value
        }

        axios.post(`http://localhost:4000/loginMobile/`, obj)
        .then(function (response) {
            if (response.data['status'] === "Success") {
                if (num < 3) {
                  localStorage.setItem("Mobile", mobile);
                  localStorage.setItem("isLogin", true);
                  alert("Logged In Successfully");
                  navigate("/view");
                }
                else {
                  alert("You've Entered Currect Information But You Can't Login Now");
                }
            }
            else{
              if (num <= 3){
                alert(`Login Failed ! You've ${3 - num} Tries Left To Try`);
              }
              else {
                alert("You Have Exhaused All Of Your Tries. Come Back Later");
              }
            }
        })
    }

  return (
    <>
        <form method="POST" className="LoginForm">
          <Form className="loginDetails">
            <Row className="mb-3">

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Mobile" ref={txtMobile} name="Mobile" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={txtPassword} name="Password" />
              </Form.Group>
            </Row>

            <div className="resetStuff">
              <Link to="/mobileverify" className="pass" >Forget Password ?</Link>
              <Link to="/" className='mobile'>Log In With Email</Link>
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
