import React, { useState } from "react";
import {
  Navbar,
  Container,
  Col,
  Row,
  Card,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import {
  postCustomField,
  getUserCustomField,
} from "../../API/GeneralSett/generalSetting";
// import deleteButton from 'react-bootstrap/Button';
import { deleteCustomField } from "../../API/GeneralSett/generalSetting";

function CustomField() {
  const [selectedField, setSelectedField] = useState("");
  const [open, setOpen] = useState(false);
  // const [customFieldById, setCustomFieldById] = useState([]);

  const [customFieldsUser, setCustomFieldsUser] = useState([]);
  const [customFieldsConsultant, setCustomFieldsConsultant] = useState([]);
  const [opens, setOpens] = useState(false);
  const [formData, setFormData] = useState({
    // fieldBelongsTo: "",
    // fieldName: "",
    // fieldType: "",
    // fieldValues: "",
    // gridColumn: "",
    // isRequired: false,
    // isVisible: false,
  });
  const [customFields, setCustomFields] = useState([
    {
      fieldName: "Email Address",
      fieldType: "email",
      fieldBelongsTo: "consultant",
    },
    { fieldName: "Website", fieldType: "link", fieldBelongsTo: "consultant" },
    { fieldName: "Contact Email", fieldType: "email", fieldBelongsTo: "user" },
    { fieldName: "Social Media", fieldType: "link", fieldBelongsTo: "user" },
  ]);

  // const id = localStorage.getItem("id");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    console.log("API response:", formData);
    e.preventDefault();

    try {
      //   const cfiels = {
      //     fieldBelongs: "user",
      //     fieldName: "nikiu",
      //     fieldType: "Textarea",
      //     fieldValues: "option1",
      //     grid:"3",
      //     Validation: true,
      //     Visibility: false
      // }
      const response = await postCustomField(formData);
      // console.log(response);
      return response;
    } catch (error) {
      console.error("API error:", error);
    }
  };
  // geting the data from getusercustomfieldbyid
  const handleBar = async () => {
    try {
      const response = await getUserCustomField();
      const customFields = response.data.data;
      console.log("customFields", customFields);
      const userFields = customFields.filter(
        (field) => field.fieldBelongs === "user"
      );
      const consultantFields = customFields.filter(
        (field) => field.fieldBelongs === "consultant"
      );

      setCustomFieldsUser(userFields);
      setCustomFieldsConsultant(consultantFields);
      console.log("sssssssssssssss", consultantFields);
    } catch (error) {
      console.error("API error:", error);
    }
  };
  // const deleteCustomField = async (item) => {
  //   try {
  //     setSelectedField(item);
  //     await deleteCustomField(selectedField._id);
  //     console.log(`Language with ID ${selectedField._id} deleted.`);

  //   } catch (error) {
  //     console.error("error deleting field", error);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      await deleteCustomField(id);
      // Refresh custom fields after deletion
      await handleBar();
    } catch (error) {
      console.error("Error deleting field:", error);
    }
  };

  return (
    <Container>
      <Navbar
        style={{
          backgroundColor: "#003175",
          border: "1px solid green",
          borderRadius: "6rem",
          position: "relative",
          zIndex: "1",
        }}
      >
        <Navbar.Brand style={{ color: "white", marginLeft: "4%" }}>
          Custom Field
        </Navbar.Brand>
      </Navbar>
      <div style={{ marginTop: "2%", marginBottom: "5%" }}>
        <Row>
          <Col sm={4}>
            <Card
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Header
                style={{
                  fontSize: "1.5em",
                  background: "none",
                }}
              >
                <h4>Field Information</h4>
              </Card.Header>
              <Card.Body>
                <Form style={{ fontSize: "0.9em" }} onSubmit={handleSubmit}>
                  <Form.Label>
                    <h6>Field Belongs to</h6>{" "}
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      boxShadow: "none",
                      fontSize: "0.9em",
                    }}
                    name="fieldBelongs"
                    value={formData.fieldBelongs}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="consultant">Consultant</option>
                    <option value="user">User</option>
                  </Form.Select>
                  <Form.Label style={{ marginTop: "5%" }}>
                    <h6>fieldName </h6>{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      boxShadow: "none",
                      fontSize: "0.9em",
                    }}
                    name="fieldName"
                    value={formData.fieldName}
                    onChange={handleChange}
                  />
                  <Form.Label style={{ marginTop: "5%" }}>
                    <h6>Field Type</h6>{" "}
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      boxShadow: "none",
                      fontSize: "0.9em",
                    }}
                    name="fieldType"
                    value={formData.fieldType}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Inputs">Inputs</option>
                    <option value="Numbers">Numbers</option>
                    <option value="Buttons">Buttons</option>
                    <option value="Textarea">Textarea</option>
                    <option value="DropDowns">DropDowns</option>
                    <option value="Check Box">Check Box</option>
                    <option value="Multi Select">Multi Select</option>
                    <option value="datepicker">Date Picker</option>
                    <option value="datetimepicker">Date&Time Picker</option>
                    <option value="colorpicker">Colour Picker</option>
                    <option value="hyperlinks">Hyper Links</option>
                    <option value="email">Email</option>
                    <option value="password">Password</option>
                    <option value="radio">Radio</option>
                  </Form.Select>

                  <Form.Label style={{ marginTop: "5%" }}>
                    <h6>Field Values (Separate By Comma) </h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter here"
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      boxShadow: "none",
                      fontSize: "0.9em",
                    }}
                    name="fieldValues"
                    value={formData.fieldValues}
                    onChange={handleChange}
                  />
                  <Form.Label style={{ marginTop: "5%", display: "block" }}>
                    <h6>Grid (Bootstrap Column eg. 6) Max is 12 </h6>
                  </Form.Label>
                  <Row style={{ marginTop: "7%" }}>
                    <Col sm={3}>
                      <span>Col-md-</span>
                    </Col>
                    <Col sm={9}>
                      {" "}
                      <Form.Control
                        type="number"
                        placeholder="Enter here"
                        style={{
                          border: "none",
                          borderBottom: "1px solid #ced4da",
                          borderRadius: "0",
                          boxShadow: "none",
                          fontSize: "0.9em",
                          marginLeft: "5px",
                          marginTop: "-4%",
                        }}
                        name="grid"
                        value={formData.grid}
                        onChange={handleChange}
                      />{" "}
                    </Col>
                  </Row>

                  <Form.Label style={{ marginTop: "5%" }}>
                    Validation
                  </Form.Label>
                  <Form.Check
                    label={`Required `}
                    name="Validation"
                    checked={formData.Validation}
                    onChange={handleCheckboxChange}
                  />
                  <Form.Label style={{ marginTop: "5%" }}>
                    Visibility
                  </Form.Label>
                  <Form.Check
                    label={`On Table `}
                    name="Visibility"
                    checked={formData.Visibility}
                    onChange={handleCheckboxChange}
                  />
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#003175",
                      borderRadius: "100px",
                      fontSize: "0.9em",
                      marginTop: "10px",
                    }}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={8}>
            <Card
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Header
                style={{
                  fontSize: "1.5em",
                  background: "none",
                }}
              >
                <h4>Custom Field List</h4>
              </Card.Header>
              <Card.Body>
                <Form>
                  <div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          backgroundColor: "#f0f0f0",
                          padding: "8px 12px",
                        }}
                      >
                        <div>
                          <h6>Consultant</h6>
                        </div>
                        <div
                          onClick={() => setOpen(!open)}
                          style={{ cursor: "pointer" }}
                        >
                          <span
                            style={{
                              fontSize: "0.9em",
                              fontWeight: "bold",
                              color: open ? "red" : "green",
                            }}
                            onClick={(e) => handleBar()}
                          >
                            {open ? "Hide" : "Open"}
                          </span>
                        </div>
                      </div>

                      <Collapse in={open}>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              {/* <th>Field Belongs to </th> */}
                              <th>Field Name </th>
                              <th>Field Type </th>
                              <th>Field Values </th>
                              <th>Visibility </th>
                              <th>Validation</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {customFieldsConsultant.map((field, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{field?.fieldBelongs}</td>
                                <td>{field?.fieldName}</td>
                                <td>{field?.fieldType}</td>
                                <td>{field?.fieldValues}</td>
                                <td>
                                  {field?.Visibility !== undefined
                                    ? String(field.Visibility)
                                    : ""}{" "}
                                </td>
                                <td>
                                  {field?.Validation !== undefined
                                    ? String(field.Validation)
                                    : ""}{" "}
                                </td>
                                <td>
                                  <Button
                                    variant="danger"
                                    onClick={() => handleDelete(field._id)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Collapse>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          backgroundColor: "#f0f0f0",
                          padding: "8px 12px",
                        }}
                      >
                        <div>
                          <h6>User</h6>
                        </div>
                        <div
                          onClick={() => setOpens(!opens)}
                          style={{ cursor: "pointer" }}
                        >
                          <span
                            style={{
                              fontSize: "0.9em",
                              fontWeight: "bold",
                              color: open ? "red" : "green",
                            }}
                            onClick={(e) => handleBar()}
                          >
                            {open ? "Hide" : "Open"}
                          </span>
                        </div>
                      </div>
                      <Collapse in={opens}>
                        <Table>
                          <thead>
                            <tr>
                              <th>Sl.</th>
                              {/* <th>Field Belongs to</th> */}
                              <th>Field Name</th>
                              <th>Field Type</th>
                              <th>Field Values </th>
                              <th>Visibility </th>
                              <th>Validation </th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {customFieldsUser.map((field, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{field?.fieldBelongs}</td>

                                <td>{field?.fieldName}</td>
                                <td>{field?.fieldType}</td>
                                <td>{field?.fieldValues}</td>
                                <td>
                                  {field?.Visibility !== undefined
                                    ? String(field.Visibility)
                                    : ""}{" "}
                                </td>
                                <td>
                                  {field?.Validation !== undefined
                                    ? String(field.Validation)
                                    : ""}{" "}
                                </td>
                                <td>
                                  <Button
                                    variant="danger"
                                    onClick={() => handleDelete(field._id)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Collapse>
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default CustomField;
