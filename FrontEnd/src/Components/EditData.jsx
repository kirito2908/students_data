import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { PacmanLoader } from "react-spinners";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Header } from "./Header";

const EditData = () => {
  const txtEmail = useRef();
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
  const txtFirst = useRef();
  const txtSecond = useRef();
  const txtThird = useRef();
  const txtFourth = useRef();
  const txtFifth = useRef();
  const txtSixth = useRef();
  const txtSeventh = useRef();
  const txtEighth = useRef();
  const txtNineth = useRef();

  const { id } = useParams();

  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state);

  useEffect(() => {

    axios.get(`http://localhost:4000/find/${id}`)
      .then(function (response) {

        txtName.current.value = response.data.data['name'];
        txtEmail.current.value = response.data.data['email'];
        txtMobile.current.value = response.data.data['mobile'];

        if (response.data.data['gender'] === "Male") {
          txtMale.current.checked = true;
        }
        if (response.data.data['gender'] === "Female") {
          txtFemale.current.checked = true;
        }
        if (response.data.data['gender'] === "Not Saying") {
          txtNope.current.checked = true;
        }

        var hobbyArray = response.data.data['hobby'];

        for (var i = 0; i < hobbyArray.length; i++) {
          if (hobbyArray[i] === txtSinging.current.value) {
            txtSinging.current.checked = true;
          }
          if (hobbyArray[i] === txtDancing.current.value) {
            txtDancing.current.checked = true;
          }
          if (hobbyArray[i] === txtEating.current.value) {
            txtEating.current.checked = true;
          }
          if (hobbyArray[i] === txtTraveling.current.value) {
            txtTraveling.current.checked = true;
          }
          if (hobbyArray[i] === txtSleeping.current.value) {
            txtSleeping.current.checked = true;
          }
          if (hobbyArray[i] === txtNope.current.value) {
            txtNope.current.checked = true;
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      })

  })

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

    const obj = {
      "email": txtEmail.current.value,
      "name": txtName.current.value,
      "mobile": txtMobile.current.value,
      "gender": genderValue,
      "hobby": hobbyValue,
      "division": txtDivision.current.value
    }

    axios.patch(`http://localhost:4000/update/${id}`, obj)
      .then(function () {
        alert("Data Edited Succesfully");
        navigate('/view');
      })
      .catch(function (error) {
        alert("Data Edited Failed");
        console.log(error);
      })

  };

  return (
    <>
    {
      localStorage.getItem("isLogin") &&
        <>
          <Header />
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

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Mobile" ref={txtMobile} name="Mobile" />
                  </Form.Group>

                  <div className="standards">
                    <Form.Select className="mt-4" aria-label="Default select example" ref={txtDivision}>
                      <option>Standard</option>
                      <option value="1st" name="division" ref={txtFirst} >First</option>
                      <option value="2nd" name="division" ref={txtSecond} >Second</option>
                      <option value="3rd" name="division" ref={txtThird} >Third</option>
                      <option value="4th" name="division" ref={txtFourth} >Fourth</option>
                      <option value="5th" name="division" ref={txtFifth} >Fifth</option>
                      <option value="6th" name="division" ref={txtSixth} >Sixth</option>
                      <option value="7th" name="division" ref={txtSeventh} >Seventh</option>
                      <option value="8th" name="division" ref={txtEighth} >Eighth</option>
                      <option value="9th" name="division" ref={txtNineth} >Ninth</option>
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
          </div>
        </>
    }
    </>
  );
};

export default EditData;
