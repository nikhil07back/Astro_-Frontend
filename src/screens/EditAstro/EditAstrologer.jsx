import React, { useEffect, useRef, useState } from "react";
import photo from "../../images/Regestreti.png";
import "../../css/Regstristyle.css";
import { Card, Container, Form, Col, Row, Button } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import {
  editAstro,
  getAllLanguage,
  getAllSkill,
} from "../../API/astrologerregAPI";
import { getDynamic } from "../../API/astroProfile";
import config from "../../config/config";

// Skeleton loader component
const SkeletonLoader = () => (
    <div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          backgroundColor: "#ccc", // Placeholder color
          marginBottom: "20px",
        }}
      >
        <h1 style={{ color: "#fff", fontWeight: "bold" }}>Edit Astrologer</h1>
      </div> */}
  
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              borderRadius: "100%",
              width: "198px",
              height: "198px",
              marginTop: "5px",
              marginLeft: "-10px",
              backgroundColor: "#ccc", // Placeholder color
            }}
          ></div>
        </div>
        <button
          style={{
            marginTop: "10px",
            backgroundColor: "#003175",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "100px",
            cursor: "pointer",
          }}
          disabled
        >
          Select New Image
        </button>
      </div>
  
      <div style={{ marginTop: "1%" }}>
        <Row className="mt-3">
          <Col sm={6}>
            <div
              style={{
                width: "100%",
                height: "38px",
                backgroundColor: "#ccc", // Placeholder color
              }}
            ></div>
          </Col>
  
          <Col sm={6}>
            <div
              style={{
                width: "100%",
                height: "38px",
                backgroundColor: "#ccc", // Placeholder color
              }}
            ></div>
          </Col>
        </Row>
  
        <Row className="mt-3">
          <Col sm={6}>
            <div
              style={{
                width: "100%",
                height: "38px",
                backgroundColor: "#ccc", // Placeholder color
              }}
            ></div>
          </Col>
  
          <Col sm={6}>
            <div
              style={{
                width: "100%",
                height: "38px",
                backgroundColor: "#ccc", // Placeholder color
              }}
            ></div>
          </Col>
        </Row>
  
        <Row className="mt-3">
          <Col sm={6}>
            <div
              style={{
                width: "100%",
                height: "38px",
                backgroundColor: "#ccc", // Placeholder color
              }}
            ></div>
          </Col>
  
          <Col sm={6}>
            <div
              style={{
                width: "100%",
                height: "38px",
                backgroundColor: "#ccc", // Placeholder color
              }}
            ></div>
          </Col>
        </Row>
  
        <Row className="mt-3">
          <Col sm={12}>
            <div
              style={{
                width: "100%",
                height: "100px",
                backgroundColor: "#ccc", // Placeholder color
              }}
            ></div>
          </Col>
        </Row>
      </div>
  
      <Button
        style={{
          marginTop: "5%",
          width: "30%",
          marginLeft: "35%",
          backgroundColor: "#ccc", // Placeholder color
          borderRadius: "100px",
        }}
        disabled
      >
        Save
      </Button>
    </div>
  );

export default function EditAstrologer() {
  const [userData, setUserData] = useState("");
  const hiddenFileInput = useRef(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null);
  const [altrImage, setAlterImage] = useState("");
  const [language, setLanguage] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [aboutAstro, setAboutAstrto] = useState("");
  const userId = localStorage.getItem("id");
  const [allLanguage, setAllLanguage] = useState();
  const [allSkill, setAllSkill] = useState();
  const [contactNumber, setContactNumber] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^[0-9]+$/;

    if (
      inputValue === "" ||
      (regex.test(inputValue) && inputValue.length <= 10)
    ) {
      setContactNumber(inputValue);
    }
  };

  const getAllLanguages = async () => {
    try {
      const response = await getAllLanguage();
      setAllLanguage(response.data?.data.map((item) => [item?.lang]));
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSkills = async () => {
    try {
      const response = await getAllSkill();
      setAllSkill(response.data?.data.map((item) => [item?.skills]));
    } catch (error) {
      console.log(error);
    }
  };

  const getAstrologer = async () => {
    try {
      const response = await getDynamic(userId);
      setUserData(response.data?.data);
      setName(response.data?.data?.name);
      localStorage.setItem("astrologerName", response.data.data.name);
      setExperience(response.data?.data?.experience);
      setContact(response.data?.data?.contactNo);
      setAboutAstrto(response.data?.data?.aboutAstrologer);
      setLanguage(response.data?.data?.languages);
      setGender(response.data?.data?.gender);
      setExpertise(response.data?.data?.expertise);
      setImage(response.data?.data?.image);
    } catch (error) {
      console.log(error);
    }
  };

  const editAstrologer = async () => {
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

    formData.append("data", JSON.stringify(data));
    formData.append("file", image);

    try {
      const response = await editAstro(userId, formData);

      if (response && response.status === 200) {
      } else {
        console.error("Unexpected response:", response);
      }
      getAstrologer();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLanguages();
    getAllSkills();
    getAstrologer();
  }, []);

  return (
    <div>
      <Container>
        <Card>
          <Card.Header>
            <Card.Title>
              <b>Edit Astrologer</b>
            </Card.Title>
          </Card.Header>
          <Form>
            {userData ? (
              <>
                <Form.Group controlId="formImageUpload">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <img
                        src={
                          altrImage !== ""
                            ? altrImage
                            : config.siteUrl +
                              (userData?.image ? userData.image : photo)
                        }
                        alt="upload image"
                        className="img-display-after"
                        style={{
                          borderRadius: "100%",
                          width: "198px",
                          height: "198px",
                          marginTop: "5px",
                          marginLeft: "-10px",
                        }}
                      />

                      <input
                        id="image-upload-input"
                        type="file"
                        ref={hiddenFileInput}
                        style={{ display: "none" }}
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          setAlterImage(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        hiddenFileInput.current.click();
                      }}
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#003175",
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "100px",
                        cursor: "pointer",
                      }}
                    >
                      Select New Image
                    </button>
                  </div>
                </Form.Group>

                <div style={{ marginTop: "1%" }}>
                  <Row className="mt-3">
                    <Col sm={6}>
                      <Form.Group controlId="formGenerateName">
                        <Form.Label>Enter Name</Form.Label>
                        <Form.Control
                          className="text-start"
                          placeholder="Enter Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group controlId="formGenerateGender">
                        <Form.Label>Select Gender</Form.Label>
                        <Form.Select
                          defaultValue="Choose..."
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option>Choose...</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col sm={6}>
                      <Form.Group controlId="formGenerateExperince">
                        <Form.Label>Experience</Form.Label>
                        <Form.Control
                          className="text-start"
                          placeholder="Enter Experince"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group controlId="formGenerateGender">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          className="text-start"
                          placeholder="Enter number"
                          value={contact}
                          onChange={(e) => {
                            handleInputChange(e);
                            setContact(e.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col sm={6}>
                      <Form.Group controlId="formGenerateGender">
                        <Form.Label>Language</Form.Label>
                        <Multiselect
                          isObject={false}
                          options={allLanguage}
                          value={language}
                          onSelect={(selectedList) =>
                            setLanguage(selectedList.map((item) => item[0]))
                          }
                          onRemove={(selectedList) => setLanguage(selectedList)}
                        />
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group controlId="formGenerateGender">
                        <Form.Label>Skills</Form.Label>
                        <Multiselect
                          options={allSkill}
                          isObject={false}
                          value={expertise}
                          onSelect={(selectedList) => {
                            setExpertise(selectedList.map((item) => item[0]));
                          }}
                          onRemove={(selectedList) => setExpertise(selectedList)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col sm={12}>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>About Astrologer</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={aboutAstro}
                          onChange={(e) => setAboutAstrto(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <Button
                  style={{
                    marginTop: "5%",
                    width: "30%",
                    marginLeft: "35%",
                    backgroundColor: "#003175",
                    borderRadius: "100px",
                  }}
                  onClick={editAstrologer}
                >
                  Save
                </Button>
              </>
            ) : (
              <SkeletonLoader />
            )}
          </Form>
          <Card.Footer>Have A Good Day.</Card.Footer>
        </Card>
      </Container>
    </div>
  );
}
