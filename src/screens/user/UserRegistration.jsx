import React, { useState } from "react";
import { Container, Row, Col, Tab } from "react-bootstrap";
import { postUserReg } from "../../API/useRegistrationAPI";
import "../../css/Registration.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRegistration = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    phoneNumber: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [load, setLoad] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setErrors({ ...errors, registration: "" });
    setShowSuccessMessage(false);

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async () => {
    const errors = {};
    if (!values.firstname.trim()) {
      errors.firstname = "First Name is required";
    }
    if (!values.lastname.trim()) {
      errors.lastname = "Last Name is required";
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
    if (!values.dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of Birth is required";
    }
    if (!values.timeOfBirth.trim()) {
      errors.timeOfBirth = "Time of Birth is required";
    }
    if (!values.placeOfBirth.trim()) {
      errors.placeOfBirth = "Place of Birth is required";
    }
    if (!values.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(values.phoneNumber.trim())) {
      errors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.password.trim()) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!values.rePassword.trim()) {
      errors.rePassword = "Please re-enter your password";
    } else if (values.rePassword !== values.password) {
      errors.rePassword = "Passwords do not match";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        let name = values.firstname + " " + values.lastname;
        setValues({ ...values, name: name });

        setLoad(true);
        const response = await postUserReg(values);

        if (response?.status === 201) {
          const toastId = toast.success("Registration successful");
          setTimeout(() => {
            toast.update(toastId, {
              render: "",
              type: "",
              isLoading: false,
              closeButton: false,
              pauseOnHover: false,
              draggable: false,
              closeOnClick: false,
            });
          }, 50000);

          setShowSuccessMessage(true);
          window.location.href = "/VerifyOtpPage";
          // setValues({
          //   firstname: "",
          //   lastname: "",
          //   gender: "",
          //   dateOfBirth: "",
          //   timeOfBirth: "",
          //   placeOfBirth: "",
          //   phoneNumber: "",
          //   email: "",
          //   password: "",
          //   rePassword: "",
          // });
        } else if (response?.response?.status === 400) {
          if (
            response?.response?.data?.message === "Registration already exists"
          ) {
            toast.error("User already exists");
            setShowSuccessMessage(true);
            // setErrors({ ...errors, registration: "Email already exists" });

            setValues({
              firstname: "",
              lastname: "",
              gender: "",
              dateOfBirth: "",
              timeOfBirth: "",
              placeOfBirth: "",
              phoneNumber: "",
              email: "",
              password: "",
              rePassword: "",
            });
          }
        }
      } catch (error) {
        console.log("Error while Registering:", error);
      } finally {
        setLoad(false);
      }
    }
  };

  return (
    <Container className="register">
      <Row>
        <Col md={3} className="register-left">
          <img src="" alt="" />
          <div style={{ marginTop: "10rem" }}>
            <h3>Welcome</h3>
            <p>You are 30 seconds away from earning your own money!</p>
          </div>
        </Col>
        <Col md={9} className="register-right">
          <Tab.Container id="myTab" className="">
            <div className="fromcontainer">
              <h4 className="headingofform">User Registration</h4>
              {showSuccessMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}

              <h6>
                {errors.registration && showSuccessMessage && (
                  <p className="error" style={{ color: "red" }}>
                    {errors.registration}
                  </p>
                )}
              </h6>

              <div className="formr">
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                  />
                  {errors.firstname && (
                    <p className="error" style={{ color: "red" }}>
                      {errors.firstname}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                  />
                  {errors.lastname && (
                    <p className="error" style={{ color: "red" }}>
                      {errors.lastname}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="error" style={{ color: "red" }}>
                      {errors.gender}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Date of Birth:</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={values.dateOfBirth}
                    onChange={handleChange}
                  />
                  {errors.dateOfBirth && (
                    <p className="error" style={{ color: "red" }}>
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Time of Birth:</label>
                  <input
                    type="time"
                    name="timeOfBirth"
                    value={values.timeOfBirth}
                    onChange={handleChange}
                  />
                  {errors.timeOfBirth && (
                    <p className="error" style={{ color: "red" }}>
                      {errors.timeOfBirth}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Place of Birth:</label>
                  <input
                    type="text"
                    name="placeOfBirth"
                    value={values.placeOfBirth}
                    onChange={handleChange}
                  />
                  {errors.placeOfBirth && (
                    <p className="error" style={{ color: "red" }}>
                      {errors.placeOfBirth}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && (
                    <p className="error" style={{ color: "red" }}>
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="error" style={{ color: "red" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="text"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="error" style={{ color: "red" }}>
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label>Re-Password:</label>
                  <input
                    type="text"
                    name="rePassword"
                    value={values.rePassword}
                    onChange={handleChange}
                  />
                  {errors.rePassword && (
                    <p className="error" style={{ color: "red" }}>
                      {errors.rePassword}
                    </p>
                  )}
                </div>
              </div>

              <div style={{textAlign:"center"}}>
                <button onClick={handleSubmit} className="submitbtn">
                  Submit
                </button>
              </div>
            </div>
          </Tab.Container>
        </Col>
      </Row>

      {/* {showSuccessMessage && (
        <div
          style={{
            width: "30rem",
            backgroundColor: "white",
            height: "2rem",
            padding: "3rem",
            color: "green",
          }}
        >
          <span>User registration successful!</span>
          <button onClick={() => setShowSuccessMessage(false)}>OK</button>
        </div>
      )} */}
      <ToastContainer />
    </Container>
  );
};

export default UserRegistration;
