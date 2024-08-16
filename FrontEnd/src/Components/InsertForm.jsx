import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { PacmanLoader } from "react-spinners";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import { Header } from "./Header";
import axios from "axios";

const InsertForm = () => {
  const txtEmail = useRef();
  const txtPassword = useRef();
  const txtName = useRef();
  const txtMobile = useRef();
  const txtDancing = useRef();
  const txtEating = useRef();
  const txtSinging = useRef();
  const txtSleeping = useRef();
  const txtTraveling = useRef();
  const txtNothing = useRef();
  const txtMale = useRef();
  const txtFemale = useRef();
  const txtNope = useRef();
  const txtDivision = useRef();
  const txtImage = useRef();

  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state);

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
    var genderValue = "";
    var hobbyValue = [];

    if (txtMale.current.checked) {
      genderValue = txtMale.current.value;
    }
    if (txtFemale.current.checked) {
      genderValue = txtFemale.current.value;
    }
    if (txtNope.current.checked) {
      genderValue = txtNope.current.value;
    }

    if (txtDancing.current.checked) {
      hobbyValue.push(txtDancing.current.value);
    }
    if (txtEating.current.checked) {
      hobbyValue.push(txtEating.current.value);
    }
    if (txtNothing.current.checked) {
      hobbyValue.push(txtNope.current.value);
    }
    if (txtSinging.current.checked) {
      hobbyValue.push(txtSinging.current.value);
    }
    if (txtSleeping.current.checked) {
      hobbyValue.push(txtSleeping.current.value);
    }
    if (txtTraveling.current.checked) {
      hobbyValue.push(txtTraveling.current.value);
    }

    const image = txtImage.current.files[0];
    // const removeSpace = image.name.replace(/\s+/g, '');
    console.log(image);
    const formData = new FormData();

    formData.append('name', txtName.current.value);
    formData.append('email', txtEmail.current.value);
    formData.append('mobile', txtMobile.current.value);
    formData.append('gender', genderValue);
    formData.append('hobby', hobbyValue);
    formData.append('division', txtDivision.current.value);
    formData.append('password', txtPassword.current.value);
    formData.append('image', image);

    axios.post('http://localhost:4000/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function () {
        alert("Data Inserted Succesfully");
        navigate("/view");
      })
      .catch(function (error) {
        alert("Data Insertion Failed");
        console.log(error);
      })
  }

  return (
    <>
      <Header />
      <div className="FormContainer">
        {
          localStorage.getItem("isLogin") &&
          <>
            <h1>Welcome Student !</h1>
            <form method="POST" className="theForm" encType="multipart/form-data" >
              <Form>
                <Row className="mb-3">
                  <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control placeholder="Enter Your Full Name" ref={txtName} name="Name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={txtEmail} name="Email" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={txtPassword} name="Password" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Mobile" ref={txtMobile} name="Mobile" />
                  </Form.Group>

                  <Form.Group className="position-relative mb-3">
                    <Form.Label>File</Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      ref={txtImage}
                    />
                  </Form.Group>

                  <div className="standards">
                    <Form.Select className="mt-4" aria-label="Default select example" ref={txtDivision}>
                      <option>Standard</option>
                      <option value="1st" name="division" >First</option>
                      <option value="2nd" name="division" >Second</option>
                      <option value="3rd" name="division" >Third</option>
                      <option value="4th" name="division" >Fourth</option>
                      <option value="5th" name="division" >Fifth</option>
                      <option value="6th" name="division" >Sixth</option>
                      <option value="7th" name="division" >Seventh</option>
                      <option value="8th" name="division" >Eighth</option>
                      <option value="9th" name="division" >Ninth</option>
                    </Form.Select>
                  </div>

                  <Form.Group className="mt-3 checks_radios" controlId="formBasicCheckbox" >
                    <div className="allHobbies">
                      <Form.Label>Hobby :-</Form.Label>
                      <div className="theHobbies">
                        <Form.Check type="checkbox" name="hobby" label="Singing" value="Singing" ref={txtSinging} />
                        <Form.Check type="checkbox" name="hobby" label="Dancing" value="Dancing" ref={txtDancing} />
                        <Form.Check type="checkbox" name="hobby" label="Traveling" value="Traveling" ref={txtTraveling} />
                        <Form.Check type="checkbox" name="hobby" label="Eating" value="Eating" ref={txtEating} />
                        <Form.Check type="checkbox" name="hobby" label="Sleeping" value="Sleeping" ref={txtSleeping} />
                        <Form.Check type="checkbox" name="hobby" label="Nothing" value="Nothing" ref={txtNothing} />
                      </div>
                    </div>

                    <div className="allGenders">
                      <Form.Label>Gender :-</Form.Label>
                      <div className="theGender">
                        <Form.Check type="radio" name="Gender" value="Male" label="Male" ref={txtMale} />
                        <Form.Check type="radio" name="Gender" value="Female" label="Female" ref={txtFemale} />
                        <Form.Check type="radio" name="Gender" value="Not Saying" label="Rather Not Say" ref={txtNope} />
                      </div>
                    </div>
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
        }

      </div>
    </>
  );
};

export default InsertForm;
