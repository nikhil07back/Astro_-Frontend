import React, { useState, useEffect } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { Form, Modal, Container, Row, Col } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import {editAstro,getAllLanguage,getAllSkill,} from "../../API/astrologerregAPI";
import { getAllAstrologer, deleteAstro } from "../../API/astrologerregAPI";
import { postaddAstrologer } from "../../API/adminpageAPI";
import { editVisible } from "../../API/astrologerregAPI";
import { getGeneralSetting } from "../../API/GeneralSett/generalSetting";
import config from "../../config/config";

function AdminPage() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null);
  const [language, setLanguage] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [edit, setEdit] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [allLanguage, setAllLanguage] = useState([]);
  const [allSkill, setAllSkill] = useState([]);
  const [Email, SetEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [aboutAstro, setAboutAstrto] = useState("");
  const [siteName, setSiteName] = useState("");
  const [selectedAstrologer, setSelectedAstrologer] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    getAllAstrologers();
    getAllSkills();
    newLanguages();
    gethtyudddu();
  }, []);

  const gethtyudddu = async () => {
    try {
      const response = await getGeneralSetting();
      console.log("responseSettingGEt", response.data?.data);
      setSiteName(response.data?.data[0].siteName);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value;
    const phoneNumberRegex = /^\d{0,10}$/;
    if (phoneNumberRegex.test(inputValue) || inputValue === "") {
      setContact(inputValue);
    } else {
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    SetEmail(emailValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (confirmPasswordValue !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const File = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const showAlertMessage = (variant, message) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);
  };

  const saveAstroData = async () => {
    if (
      !name ||
      !gender ||
      !contact ||
      !experience ||
      !image ||
      !language.length ||
      !expertise.length ||
      !Email ||
      !aboutAstro ||
      !password ||
      !confirmPassword
    ) {
      showAlertMessage("danger", "Please fill the required field");
      return;
    }
  
    if (password !== confirmPassword) {
      showAlertMessage("danger", "Passwords do not match");
      return;
    }
  
    try {
      const formData = new FormData();
      const data = {
        name: name,
        gender: gender,
        contactNo: contact,
        experience: experience,
        languages: language,
        expertise: expertise,
        password: password,
        confirmPassword: confirmPassword,
        email: Email,
        aboutAstrologer: aboutAstro,
      };
      formData.append("data", JSON.stringify(data));
      formData.append("file", image);
  
      const response = await postaddAstrologer(formData);
      console.log("Response from saving :", response);
      showAlertMessage("success", "Added Successfully");
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
       getAllAstrologers();
    } catch (error) {
      console.error("Error saving data:", error);
      showAlertMessage("danger", "Error saving data");
    }
  };
  
  const resetFormFields = () => {
    setName("");
    SetEmail("");
    setGender("");
    setContact("");
    setExperience("");
    setAboutAstrto("");
    setImage("");
    setLanguage([]);
    setExpertise([]);
    setPassword("");
    setConfirmPassword("");

  };

  const getAllAstrologers = async () => {
    try {
      const response = await getAllAstrologer();
      console.log("response.data.data", response.data.data);
      if (response.data?.data) {
        setItems(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const newLanguages = async () => {
    try {
      const response = await getAllLanguage();
      if (response.data?.data) {
        const languages = response.data.data.map((item) => ({
          lang: item.lang,
        }));
        setAllLanguage(languages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSkills = async () => {
    try {
      const response = await getAllSkill();
      if (response.data?.data) {
        const skills = response.data.data.map((item) => ({
          name: item.skills,
        }));
        setAllSkill(skills);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const astroDataDelete = (id) => {
    setSelectedAstrologer(id);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteAstro(selectedAstrologer._id);
      console.log(`Astrologer with ID ${selectedAstrologer._id} deleted.`);

      const updatedAstrologers = await getAllAstrologers();
      console.log("Updated astrologers:", updatedAstrologers);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting astrologer:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const editAstroData = (id) => {
    setEditStatus(true);
    setEdit(id._id);
    console.log("edit", edit);
    setShowModal(true);
    setName(id.name);
    setGender(id.gender);
    setContact(id.contactNo);
    setExperience(id.experience);
    setImage(id.image);
    setLanguage(id.languages);
    setExpertise(id.expertise);
    setAboutAstrto(id.aboutAstrologer);
  };

  const editApi = async () => {
    setShowModal(true);
    if (
      !name ||
      !gender ||
      !contact ||
      !experience ||
      !image ||
      !language.length ||
      !expertise.length ||
      !aboutAstro
    ) {
      showAlertMessage("danger", "Please fill the required field");
      return;
    }
    try {
      const formData = new FormData();
      const data = {
        name: name,
        gender: gender,
        contactNo: contact,
        experience: experience,
        languages: language,
        expertise: expertise,
        aboutAstrologer: aboutAstro,
      };
      console.log("data", data);
      formData.append("data", JSON.stringify(data));
      formData.append("file", image);
      console.log("formData", formData);

      const response = await editAstro(edit, formData);
      console.log("responseqqq", response);

      console.log("Edit response:", response);

      showAlertMessage("success", "Edited Successfully");
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
       getAllAstrologers();
    } catch (error) {
      console.error("Error editing :", error);
      showAlertMessage("danger", "Please fill the required field");
    }
  };

  const Visibile = async (item) => {
    console.log("id234", item);
    const data = {
      astrologerId: item._id,
      visibility: item.visibility === true ? false : true,
    };
    console.log("data", data);
    try {
      const response = await editVisible(data);
      getAllAstrologers();
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };
  // const siteUrls="http://localhost:5000/astrologerImages"

  return (
    <div>
      <div>
        <Button
          variant="primary"
          onClick={() => {
            setShowModal(true);
            resetFormFields();
            setEditStatus(false)
          }}
          style={{ marginBottom: "1%", marginLeft: "1%" }}
        >
          Add {siteName} +
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Experience</th>
            <th>Language</th>
            <th>Expertise</th>
            <th>Images</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.contactNo}</td>
              <td>{item.experience}</td>
              <td>{item.languages.join(" , ")}</td>
              <td>{item.expertise.join(" , ")}</td>
              <td>
                <div
                  style={{

                    width: "60px",
                    height: "70px",

                    overflow: "hidden",
                  }}
                >
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={config.siteUrl +"astrologerImages/" +`${item.image}`}
                    alt="Item Image"
                  />
                </div>
              </td>

              <td>
                <Button
                  variant="info"
                  onClick={() => editAstroData(item)}
                  style={{ marginBottom: "5%",width: "100%", height: "100%"  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => astroDataDelete(item)}
                  style={{ marginBottom: "5%",width: "100%", height: "100%"  }}
                >
                  Delete
                </Button>
                {showDeleteConfirmation && selectedAstrologer === item && (
                  <handleDeleteConfirm
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                  />
                )}
              </td>

              <td>
                {" "}
                <Form.Check
                  type="switch"
                  id={`custom-switch-${item._id}`}
                  checked={item.visibility}
                  onChange={() => Visibile(item)}
                />
                {item.visibility ? "Visible" : "In-Visible"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Container>
        <Modal
          show={showModal}
          onHide={() => (
            setShowModal(false)
          )}
          size="xl"
        >
          {showAlert && (
            <Alert
              variant={alertVariant}
              style={{
                position: "fixed",
                top: "5%",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: "999",
                width: "30%",
                border: "1px solid green",
                borderRadius: "6rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "25px",
              }}
            >
              {alertMessage}
            </Alert>
          )}
          <Modal.Header closeButton>
            {editStatus ? (
              <Modal.Title>Edit {siteName}</Modal.Title>
            ) : (
              <Modal.Title>Add {siteName}</Modal.Title>
            )}
          </Modal.Header>
          
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group controlId="formPrName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="Text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>{" "}
              </Col>
              <Col>
                {" "}
                <Form.Group controlId="formGender">
                  <Form.Label>Select Gender</Form.Label>
                  <Form.Select
                    defaultValue={"Choose..."}
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option>Choose...</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group controlId="formFile">
                  <Form.Label>Select Image</Form.Label>
                  <Form.Control
                    label="File Name"
                    name="fileName"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Group controlId="formLanguages">
                  <Form.Label>Languages</Form.Label>
                  <Multiselect
                    options={allLanguage}
                    displayValue="lang"
                    value={language}
                    onSelect={(selectedList) => {
                      setLanguage(selectedList.map((item) => item.lang));
                    }}
                    onRemove={(selectedList) => {
                      setLanguage(selectedList.map((item) => item.lang));
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formExpertise">
                  <Form.Label>Expertise</Form.Label>
                  <Multiselect
                    options={allSkill}
                    displayValue="name"
                    value={expertise}
                    onSelect={(selectedList) => {
                      setExpertise(selectedList.map((item) => item.name));
                    }}
                    onRemove={(selectedList) => {
                      setExpertise(selectedList.map((item) => item.name));
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group controlId="formExperience">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter experience"
                    value={experience}
                    onChange={(e) => {
                      setExperience(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Group controlId="formContact">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Contact Number"
                    value={contact}
                    onChange={(e) => {
                      handlePhoneNumberChange(e);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>About Astrologer</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    value={aboutAstro}
                    onChange={(e) => {
                      setAboutAstrto(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                {editStatus ? null : (
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={Email}
                      onChange={handleEmailChange}
                      isInvalid={!!emailError}
                    />
                    <Form.Control.Feedback type="invalid">
                      {emailError}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {editStatus ? null : (
                  <Form.Group
                    controlId="formPassword"
                    style={{ maxWidth: "65%" }}
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={handlePasswordChange}
                      isInvalid={!!passwordError}
                    />
                    <Form.Control.Feedback type="invalid">
                      {passwordError}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
              </Col>
              <Col>
                {" "}
                {editStatus ? null : (
                  <Form.Group
                    controlId="formConfirmPassword"
                    style={{ marginLeft: "-35%", maxWidth: "100%" }}
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      isInvalid={!!confirmPasswordError}
                      style={{ maxWidth: "65%" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {confirmPasswordError}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => (editStatus ? editApi() : saveAstroData())}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this astrologer?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminPage;