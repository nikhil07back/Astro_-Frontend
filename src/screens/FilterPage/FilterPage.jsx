import React, { useState, useEffect } from "react";
import { Container, Col, Row, Modal, Button, Nav, Form } from "react-bootstrap";


function FilterPage({ Referesh }) {
  const [showModal, setShowModal] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const languageOptions = [
    <h6>English</h6>,
    <h6>Hindi</h6>,
    <h6>Kannada</h6>,
    <h6>Marathi</h6>,
    <h6>Telugu</h6>,
    <h6>Tamil</h6>,
    <h6>Malayalam</h6>,
    <h6>Urdu</h6>,
    <h6>Sanskrit</h6>,
  ];
  const skillOptions = [
    <h6>Face Reading</h6>,
    <h6>Life Coach</h6>,
    <h6>Nadi</h6>,
    <h6>Numerology</h6>,
    <h6>Palmistry</h6>,
    <h6>Psychic</h6>,
    <h6>Psychologist</h6>,
    <h6>Tarot</h6>,
    <h6>Vastu</h6>,
    <h6>Vedic</h6>,
  ];
  const gender = [<h6>Male</h6>, <h6>Female</h6>, <h6>Other</h6>];
  const country = [<h6>Bharat</h6>, <h6>Out of Bharat</h6>];
  const handleNavItemClick = (section) => {
    setActiveSection(section);
  };
  const [flt, setFlt] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    // setFlt(false)
    Referesh(flt);
  };
  useEffect(() => {
    return () => {
      setShowModal(false);
    };
  }, []);
  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ marginTop: "-3%", marginBottom: "-3%" }}>
          <Row>
            <Col md={5} className="bg-light">
              <Nav
                className="flex-column"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Nav.Link
                  href="#section1"
                  onClick={() => handleNavItemClick("Skill")}
                >
                  Skill
                </Nav.Link>
                <Nav.Link
                  href="#section2"
                  onClick={() => handleNavItemClick("Language")}
                >
                  Language
                </Nav.Link>
                <Nav.Link
                  href="#section3"
                  onClick={() => handleNavItemClick("Gender")}
                >
                  Gender
                </Nav.Link>
                <Nav.Link
                  href="#section4"
                  onClick={() => handleNavItemClick("Country")}
                >
                  Country
                </Nav.Link>
                <Nav.Link
                  href="#section5"
                  onClick={() => handleNavItemClick("Top Astrologers")}
                >
                  Top Astrologers
                </Nav.Link>
              </Nav>
            </Col>
            <Col md={7}>                                                         

              <Form style={{ marginTop: "5%" }}>
                <Form.Group>
                  {activeSection === "Language" &&
                    languageOptions.map((language, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={language}
                        value={language}
                        className="custom-checkbox"
                      />
                    ))}
                </Form.Group>
                <Form.Group>
                  {activeSection === "Skill" &&
                    skillOptions.map((skill, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={skill}
                        value={skill}
                        className="custom-checkbox"
                      />
                    ))}
                </Form.Group>
                <Form.Group>
                  {activeSection === "Gender" &&
                    gender.map((gender, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={gender}
                        value={gender}
                        className="custom-checkbox"
                      />
                    ))}
                </Form.Group>
                <Form.Group>
                  {activeSection === "Country" &&
                    country.map((country, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={country}
                        value={country}
                        className="custom-checkbox"
                      />
                    ))}
                </Form.Group>
                <Form.Group>
                  {activeSection === "Top Astrologers" && (
                    <>
                      <Form.Check
                        type="checkbox"
                        label={
                          <div>
                            <h6>Celebrities</h6>
                            <p>
                              They have the highest fan following & people are
                              crazy about them
                            </p>
                          </div>
                        }
                        id="celebrities-checkbox"
                      />
                      <Form.Check
                        type="checkbox"
                        label={
                          <div>
                            <h6>Top Choice</h6>
                            <p>
                              If you talk to them once, you are their customer
                              for life
                            </p>
                          </div>
                        }
                        id="top-choice-checkbox"
                      />
                      <Form.Check
                        type="checkbox"
                        label={
                          <div>
                            <h6>Rising Star</h6>
                            <p>
                              They are high in demand & have strong customer
                              loyalty
                            </p>
                          </div>
                        }
                        id="rising-star-checkbox"
                      />
                      <Form.Check
                        type="checkbox"
                        label={
                          <div>
                            <h6>All</h6>
                            <p>
                              It includes all verified astrologers, hired after
                              5 rounds of interviews
                            </p>
                          </div>
                        }
                        id="all-checkbox"
                      />
                    </>
                  )}
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Reset
          </Button>
          <Button variant="outline-dark" onClick={handleClose}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
export default FilterPage;
