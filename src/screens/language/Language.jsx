import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table, Alert } from "react-bootstrap";
import { postAllLanguage } from "../../API/addLanguageApi";
import { getAllLanguage } from "../../API/astrologerregAPI";
import { deleteLanguage, editLanguage } from "../../API/addLanguageApi";

export default function Language() {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [language, setLanguage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    allLanguage();
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const showAlertMessage = (variant, message) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);
  };

  const allLanguage = async () => {
    try {
      const response = await getAllLanguage();
      console.log("response", response.data.data);
      setItems(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLang = async (item) => {
    try {
      setSelectedLanguage(item);
      setShowDeleteConfirmation(true);
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  const confirmDeleteLanguage = async () => {
    try {
      await deleteLanguage(selectedLanguage._id);
      console.log(`Language with ID ${selectedLanguage._id} deleted.`);
      await allLanguage();
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  const addLanguage = () => {
    setEditStatus(false);
    setLanguage("");
    setShowModal(true);
  };

  const fetchApi = async () => {
    if (!language) {
      showAlertMessage("danger", "Please enter  language");
      return;
    }
    try {
      const data = {
        lang: language,
      };
      const response = await postAllLanguage(data);
      console.log("response", response);
      showAlertMessage("success", "Added Successfully");
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
      allLanguage();
    } catch (error) {
      console.error("Error saving Language:", error);
      showAlertMessage("danger", "Failed to add language");
    }
  };

  const editLang = async (item) => {
    setLanguage(item.lang);
    setSelectedLanguage(item);
    setShowModal(true);
    setEditStatus(true);
  };

  const editApi = async () => {
    if (!language) {
      showAlertMessage("danger", "Please enter  language");
      return;
    }
    try {
      const data = {
        lang: language,
      };
      const response = await editLanguage(selectedLanguage._id, data);
      console.log("Edit response:", response);
      showAlertMessage("success", "Edited Successfully");
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
      allLanguage();
    } catch (error) {
      console.error("Error editing language:", error);
      showAlertMessage("danger", "Failed to edit language");
    }
  };

  return (
    <div>
      <div>
        <Button
          variant="primary"
          onClick={addLanguage}
          style={{ marginBottom: "1%", marginLeft: "1%" }}
        >
          Add Language +
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sl.Number</th>
            <th>Language</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.lang}</td>
              <td>
                <Button variant="info" onClick={() => editLang(item)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => deleteLang(item)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Container>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
         
        {showAlert && (
        <Alert
          variant={alertVariant}
          style={{
            position: "fixed",
            top: "5%",
            left: "54%",
            transform: "translateX(-50%)",
            zIndex: "999",
            width: "20%",
            border: "1px solid green",
            borderRadius: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
          }}
        >
          {alertMessage}
        </Alert>
      )}

          <Modal.Header closeButton>
            <Modal.Title>
              {editStatus ? "Edit Language" : "Add Language"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Enter Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" 
            onClick= {() =>{
              editStatus ? editApi() : fetchApi();
             
            }}
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
        <Modal.Body>Are you sure you want to delete this Language?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteLanguage}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
