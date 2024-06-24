import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Table, Form, Alert } from "react-bootstrap";
import { postExcpertise } from "../../API/addExpertiseApi";
import { getAllSkill } from "../../API/astrologerregAPI";
import { deleteExpertise } from "../../API/deleteExpertiseApi";
import { editExpertise } from "../../API/addExpertiseApi";

export default function AddExpertise() {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [expertise, setExpertise] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    allSkills();
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

  const allSkills = async () => {
    try {
      const response = await getAllSkill();
      setItems(response.data?.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const deleteExpert = async (item) => {
    try {
      setSelectedExpertise(item);
      setShowDeleteConfirmation(true);
    } catch (error) {
      console.error("Error deleting expertise:", error);
    }
  };

  const editExpert = async (item) => {
    setEditStatus(true);
    setExpertise(item.skills);
    setSelectedExpertise(item);
    setShowModal(true);
  };

  const confirmDeleteExpertise = async () => {
    try {
      await deleteExpertise(selectedExpertise._id);
      console.log(`Expertise with ID ${selectedExpertise._id} deleted.`);
      await allSkills();
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting expertise:", error);
    }
  };

  const addExpertise = () => {
    setEditStatus(false);
    setExpertise("");
    setShowModal(true);
  };

  const editApi = async () => {
    if (!expertise) {
      showAlertMessage("danger", "Please enter an expertise");
      return;
    }
    try {
      const data = {
        skills: expertise,
        active: true,
      };
      const response = await editExpertise(selectedExpertise._id, data);
      console.log("Edit response:", response);
      showAlertMessage("success", "Edited Successfully");
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
      allSkills();
    } catch (error) {
      console.error("Error editing expertise:", error);
      showAlertMessage("danger", "Failed to edit Expertise");
    }
  };

  const saveAstroData = async () => {
    if (!expertise) {
      showAlertMessage("danger", "Please enter an expertise");
      return;
    }
    try {
      const data = {
        skills: expertise,
        active: true,
      };
      const response = await postExcpertise(data);
      console.log("Response from saving expertise:", response);
      showAlertMessage("success", "Added Successfully");
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
     allSkills();
    } catch (error) {
      console.error("Error saving expertise:", error);
      showAlertMessage("danger", "Failed to add Expertise");
    }
  };










  return (
    <div>
     
      <div>
        <Button
          variant="primary"
          onClick={addExpertise}
          style={{ marginBottom: "1%", marginLeft: "1%" }}
        >
          Add Expertise +
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th> Sl.Number</th>
            <th>Expertise</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.skills}</td>
              <td>
                <Button variant="info" onClick={() => editExpert(item)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => deleteExpert(item)}>
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
            {editStatus ? (
              <Modal.Title>Edit Expertise</Modal.Title>
            ) : (
              <Modal.Title>Add Expertise</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Expertise</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Enter Expertise"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                editStatus ? editApi() : saveAstroData();
               
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
        <Modal.Body>Are you sure you want to delete this expertise?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteExpertise}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


</div>

  );
}

