import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { PacmanLoader } from "react-spinners";
import "bootstrap/dist/css/bootstrap.min.css";

const InsertForm = () => {
  const txtEmail = useRef();
  const txtPassword = useRef();
  const txtName = useRef();

  const { loading, data, error } = useSelector((state) => state);

  const dispatch = useDispatch();

  if (loading) {
    return (
      <>
        <div className="loading">
          <PacmanLoader color="orange" size={100} speedMultiplier={1} />
        </div>
      </>
    );
  }

  if (error != null) {
    return (
      <>
        <div className="error">
          <h1>{error}</h1>
        </div>
      </>
    );
  }

  const handleSubmit = () => {
    var email = txtEmail.current.value;

    console.log(email);
  };

  return (
    <>
      <div className="FormContainer">
        <h1>Welcome Student !</h1>
        <form method="POST" className="theForm">
          {/* <Form>
            <Row className="mb-3">
              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Fullname</Form.Label>
                <Form.Control
                  placeholder="Enter Your Full Name"
                  ref={txtName}
                  name="Name"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={txtEmail}
                  name="Email"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={txtPassword}
                  name="Password"
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </Form> */}
          <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
        </form>
      </div>
    </>
  );
};

export default InsertForm;
