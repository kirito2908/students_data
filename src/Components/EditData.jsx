import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { PacmanLoader } from "react-spinners";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataEdit, InsertData, SingleData } from "./Store";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const EditData = () => {
  const txtEmail = useRef();
  const txtPassword = useRef();
  const txtName = useRef();
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

  const { id } = useParams();

  const navigate = useNavigate();

  const { loading, data, error } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect( () => {
    var params = new FormData();

    params.set("Id", id);

    axios.post("http://localhost/students_data/student_single_api.php", params)
    .then(function (response) {
        txtName.current.value = response.data['Name'];
        txtEmail.current.value = response.data['Email'];
        txtPassword.current.value = response.data['Password'];

        if (response.data['Gender'] == "Male"){
            txtMale.current.checked = true;
        }
        if (response.data['Gender'] == "Female") {
            txtFemale.current.checked = true;
        }
        if (response.data['Gender'] == "Not Saying") {
            txtNope.current.checked = true;
        } 

        var hobbyArray = response.data['Hobby'].split(",");

        for (var i=0; i < hobbyArray.length; i++) {
            if (hobbyArray[i] == txtDancing.current.value) {
                txtDancing.current.checked = true;
            }
            if (hobbyArray[i] == txtSinging.current.value) {
                txtSinging.current.checked = true;
            }
            if (hobbyArray[i] == txtEating.current.value) {
                txtEating.current.checked = true;
            }
            if (hobbyArray[i] == txtTraveling.current.value) {
                txtTraveling.current.checked = true;
            }
            if (hobbyArray[i] == txtSleeping.current.value) {
                txtSleeping.current.checked = true;
            }
            if (hobbyArray[i] == txtNothing.current.value) {
                txtNothing.current.checked = true;
            }
        }

    })
  } )

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
    var name = txtName.current.value;
    var password = txtPassword.current.value;
    var gender = "";
    var division = txtDivision.current.value;
    var hobby = [];

    if (txtMale.current.checked) {
      gender = txtMale.current.value;
    }
    if (txtFemale.current.checked) {
      gender = txtFemale.current.value;
    }
    if (txtNope.current.checked) {
      gender = txtNope.current.value;
    }

    if (txtDancing.current.checked) {
      hobby.push(txtDancing.current.value);
    }
    if (txtEating.current.checked) {
      hobby.push(txtEating.current.value);
    }
    if (txtNothing.current.checked) {
      hobby.push(txtNope.current.value);
    }
    if (txtSinging.current.checked) {
      hobby.push(txtSinging.current.value);
    }
    if (txtSleeping.current.checked) {
      hobby.push(txtSleeping.current.value);
    }
    if (txtTraveling.current.checked) {
      hobby.push(txtTraveling.current.value);
    }

    var hobbyString = hobby.toString();

    var params = new FormData();

    params.set("Id", id);
    params.set("Name", name);
    params.set("Email", email);
    params.set("Password", password);
    params.set("Gender", gender);
    params.set("Hobby", hobbyString);
    params.set("Division", division);

    dispatch(DataEdit(params));

    navigate("/");

  };

  return (
    <>
      <div className="FormContainer">
        <h1>Welcome Student !</h1>
        <form method="POST" className="theForm">
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
                  <Form.Check type="checkbox" name="hobby" label="Nothing" value="Nothing"  ref={txtNothing} />
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
      </div>
    </>
  );
};

export default EditData;
