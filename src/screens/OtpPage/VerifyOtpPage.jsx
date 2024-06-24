import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { Form, InputGroup } from "react-bootstrap";
import { loginPageApi } from "../../API/loginpageApi";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import "./VerifyOtpPage.css";
const VerifyOtpPage = () => {
  const [country, setCountry] = useState("us");
  // const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phone, setphone] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const passwordVisible = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const navigate = useNavigate();
  const handleSignUpClick = () => {
    //setRightPanelActive(true);

    navigate("/UserRegistration");
  };
  const handleSignInClick = () => {
    setRightPanelActive(false);
  };
  const [errors, setError] = useState("");
  const handleSignInSubmit = async (e) => {
    
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      return;
    }
    if (password.trim().length < 1) {
      setPasswordError("Password must be at least 3 characters");
      return;
    } else {
      try {
        const data = {
          email,
          password,
        };

        const res = await loginPageApi(data);
        // localStorage.setItem("name", res?.data?.data?.name);
        localStorage.setItem("Astroname", res?.data?.data?.name)
        // console.log("jjjjjjjjjjjjjjjjjjjjjj",localStorage.setItem("Astroname", res?.data?.data?.name));
        console.log("ggggg", res);
        if (res.status === 200) {
          localStorage.setItem("accessToken", res?.data?.accessToken);
          localStorage.setItem("userType", res?.data?.data?.userType);
          localStorage.setItem("atrologerName", res?.data?.data?.name);
          


          localStorage.setItem("id", res?.data?.data?._id);
          navigate("/");
        } else {
          // setSuccessMessage(res?.response?.data.message)
          // setEmailError("Invalid email or passwordedf");
          setEmailError(res?.response?.data.message);
          // setShowSuccessModal(true);
        }
      } catch (err) {
        console.log(err);
        setShowSuccessModal(true);
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={`zcontainer ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="zcontainer"
      >
        <div className="form-zcontainer sign-up-zcontainer">
          <form>
            <div className="withphone">
              <h2 className="createheading">Continue with Phone</h2>
            </div>
            <div>
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
                You will receive a 4 digit code for verification
              </p>
            </div>
            <div>
              <p style={{ textAlign: "center" }}>Enter your phone number</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
                marginLeft: "3rem",
              }}
            >
              <PhoneInput
                country={country}
                // value={number}
                // onChange={}
                countryCodeEditable={false}
              />
            </div>
            <Link to="/verifyotp">
              <button type="button" className="getotpbutton">
                Get OTP
              </button>
            </Link>
            <div className="last">
              <p>
                By Signing up, you agree to our <a href="#">Terms of Use</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </p>
            </div>
          </form>
        </div>
        {!isRightPanelActive ? (
          <div className="form-zcontainer sign-in-zcontainer">
            <div>
              <h1>Login Page</h1>
            </div>
            <form style={{textAlign: 'center'}}>
              {errors && <p className="error-message">{errors} </p>}
              <InputGroup>
                <Form.Control
                 
                  autoComplete="off"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                    setPasswordError("");
                  }}
                />
              </InputGroup>
              {/* {emailError && <p className="error-message">{emailError} </p>} */}
              <InputGroup
                className="mb-3"
              >
                <Form.Control
                  aria-label="Password"
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                />
                {/* Eye icon to toggle password visibility */}
                <span
                  onClick={passwordVisible}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "10px",
                    top: "14px",
                    fontSize: "18px",
                    zIndex: "1",
                    color:"black",
                  
                    
                  }}
                >
                  {passwordShown ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </InputGroup>

              {emailError && <p className="error-message">{emailError}</p>}
              <a
                style={{
                  textAlign: "center",
                  // margin: "0 0 0 4.2rem",
                  // marginTop: "2rem",
                  display: "block",
                  height: "auto",
                  lineHeight: "1.5",
                  // marginLeft: "2rem",
                }}
                href="#"
              >
                Forgot your password?
              </a>

              <button
                type="submit"
                style={{
                  border: "none",
                  // marginLeft: "4.68rem",
                  // marginTop: "2rem",
                }}
                className="signbutton"
                onClick={(e) => {
                  handleSignInSubmit(e);
                  // setShowSuccessModal(true);
                }}
              >
                SUBMIT
              </button>

              <div style={{ marginTop: "2rem" }}>
                If you don't have an account{" "}
                <a onClick={handleSignUpClick}>
                  <a href="#">Sign Up</a>
                </a>
              </div>
            </form>
          </div>
        ) : null}
        <div className="overlay-zcontainer">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="createheading">Hello, Friend!</h1>
              Enter your personal details and start the journey with us
              <button
                type="button"
                className="signbutton"
                id="signIn"
                onClick={handleSignInClick}
                style={{ marginLeft: "3rem" }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="createheading">Welcome Back!</h1>
              <p>
                Enter your personal details and continue your journey with us
              </p>
              {/* <button
                type="button"
                className="signbutton"
                id="signUp"
                onClick={handleSignUpClick}
                style={{ marginLeft: ".5rem" }}
              >
                Verify
              </button> */}
            </div>
          </div>
        </div>
        <Modal
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login fail</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "red" }}>{successMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShowSuccessModal(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default VerifyOtpPage;
