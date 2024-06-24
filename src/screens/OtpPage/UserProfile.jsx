import React, { useState, useEffect } from "react";
import { Col, Tabs, Tab, Row, Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser, editUser } from "../../API/useRegistrationAPI";
import { MdEdit } from "react-icons/md";
import CallReports from "../CallReports/CallReports";
import ChatReports from "../CallReports/ChatReport";
import Payment from "../CallReports/Payment";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfile = () => {
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    phoneNumber: "", // New field for phone number
    totalAvailableBalance: "",
    wailet: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSave = async () => {
    try {
      const updatedData = {
        name: formData.name,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        timeOfBirth: formData.timeOfBirth,
        placeOfBirth: formData.placeOfBirth,
        phoneNumber: formData.phoneNumber, // Include phone number in the updated data
      };

      const response = await editUser(userId, updatedData);
      console.log("Edit response:", response);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const userId = localStorage.getItem("id");

  useEffect(() => {
    console.log("Executing useEffect with userId:", userId);
    if (userId !== null && userId !== undefined && userId !== "") {
      getUser(userId).then((response) => {
        console.log("Response:", response.data.data);
        setFormData(response.data.data);
        setIsLoading(false);
      });
    }
  }, [userId]);

  const formattedDate = new Date(formData.dateOfBirth).toLocaleDateString();

  return (
    <div>
      <div style={{ backgroundColor: "" }} className="container emp-profile">
        <form method="post">
          <div>
            <Row width="100%">
              <Col
                md={12}
                sm={12}
                lg={3}
                xl={3}
                style={{
                  backgroundColor: "#F0F0F0",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  borderRadius: "10px",
                }}
              >
                {isLoading ? (
                  <SkeletonTheme baseColor="#e9e9e9" highlightColor="#f2f2f2">
                    <div style={{ padding: "20px" }}>
                      <Skeleton
                        height={100}
                        width={100}
                        circle
                        style={{ margin: "0 auto" }}
                      />
                      <Skeleton
                        height={30}
                        width={200}
                        style={{ marginTop: "10px" }}
                      />
                      <div style={{ marginTop: "20px" }}>
                        <Skeleton height={20} width={150} count={7} />
                      </div>
                      <div style={{ marginTop: "20px" }}>
                        <Skeleton height={50} width={200} count={2} />
                      </div>
                    </div>
                  </SkeletonTheme>
                ) : (
                  <>
                    <div
                      style={{ cursor: "pointer", marginLeft: "18rem" }}
                      onClick={() => setShowEditModal(true)}
                    >
                      <MdEdit />
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                        alt=""
                        style={{
                          borderRadius: "50%",
                          height: "9rem",
                          width: "9rem",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      <h4>{formData.name}</h4>
                    </div>

                    <div
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <table>
                        <tbody style={{ padding: "3px 26px" }}>
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                                color: "#6C757D",
                                margin: "auto",
                              }}
                            ></td>
                          </tr>
                          <tr>
                            <td>
                              <b>Name :</b>
                            </td>
                            <td>{formData.name}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Gender :</b>
                            </td>
                            <td>{formData.gender}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Date Of Birth : </b>
                            </td>
                            <td>{formattedDate}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Time Of Birth : </b>
                            </td>
                            <td>{formData.timeOfBirth}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Place Of Birth : </b>
                            </td>
                            <td>{formData.placeOfBirth}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Phone Number : </b>
                            </td>
                            <td>{formData.phoneNumber}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          style={{
                            backgroundColor: "#6C757D",
                            border: "none",
                            borderRadius: "2rem",
                            width: "75%",
                            padding: "2%",
                            fontWeight: 600,
                            color: "#fff",
                            cursor: "pointer",
                            marginTop: "8%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            Total available balance:
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            Rs. {formData.wailet}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          style={{
                            backgroundColor: "#6C757D",
                            border: "none",
                            borderRadius: "2rem",
                            width: "75%",
                            padding: "2%",
                            fontWeight: 600,
                            color: "#fff",
                            cursor: "pointer",
                            marginTop: "8%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            Total amount spent:
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            Rs. 20
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Col>

              <Col md={12} sm={12} lg={9} xl={9}>
                <div className="profile-head">
                  <div>
                  <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                      <Tab eventKey="profile" title="Call Report">
                        {isLoading ? (
                          <SkeletonTheme baseColor="#e9e9e9" highlightColor="#f2f2f2">
                            <div style={{ padding: "20px" }}>
                              <Skeleton height={30} width={200} count={1} />
                              <Skeleton height={20} width={150} count={5} style={{ marginTop: "10px" }} />
                              <Skeleton height={300} style={{ marginTop: "20px" }} />
                            </div>
                          </SkeletonTheme>
                        ) : (
                          <CallReports />
                        )}
                      </Tab>
                      <Tab eventKey="chat" title="Chat Report">
                        {isLoading ? (
                          <SkeletonTheme baseColor="#e9e9e9" highlightColor="#f2f2f2">
                            <div style={{ padding: "20px" }}>
                              <Skeleton height={30} width={200} count={1} />
                              <Skeleton height={20} width={150} count={5} style={{ marginTop: "10px" }} />
                              <Skeleton height={300} style={{ marginTop: "20px" }} />
                            </div>
                          </SkeletonTheme>
                        ) : (
                          <ChatReports />
                        )}
                      </Tab>
                      <Tab eventKey="payment" title="Payment Report">
                        {isLoading ? (
                          <SkeletonTheme baseColor="#e9e9e9" highlightColor="#f2f2f2">
                            <div style={{ padding: "20px" }}>
                              <Skeleton height={30} width={200} count={1} />
                              <Skeleton height={20} width={150} count={5} style={{ marginTop: "10px" }} />
                              <Skeleton height={300} style={{ marginTop: "20px" }} />
                            </div>
                          </SkeletonTheme>
                        ) : (
                          <Payment />
                        )}
                      </Tab>
                    </Tabs>


                  </div>
                </div>
              </Col>
            </Row>
            <div>
              <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formGender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDateOfBirth">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formPlaceOfBirth">
                      <Form.Label>Place of Birth</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your place of birth"
                        name="placeOfBirth"
                        value={formData.placeOfBirth}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your phone number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formTimeOfBirth">
                      <Form.Label>Time of Birth</Form.Label>
                      <Form.Control
                        type="time"
                        name="timeOfBirth"
                        value={formData.timeOfBirth}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    {/* Add more form fields as needed */}
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleEditSave}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
