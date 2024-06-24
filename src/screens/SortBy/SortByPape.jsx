import React, { useState, useEffect } from "react";
import { Container, Form, Modal, Button } from "react-bootstrap";
function SortBy({ SortReferesh }) {
  const [showModal, setShowModal] = useState(true);
  const [sort, setSort] = useState (false);
  const handleClose = () => {
    setShowModal(false);
    SortReferesh(sort);
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
          <Modal.Title>Sort By</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              marginBottom: "2%",
              marginTop: "2%",
              width: "70%",
              height: "69%",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {[
              "Rating : High to Low",
              "Experience : High to Low",
              "Experience : Low to High",
              "Price : High to Low",
              "Price : Low to High",
            ].map((radioValue) => (
              <Form.Check
                key={radioValue}
                type="radio"
                label={` ${radioValue}`}
                name="radioGroup"
                id={`radio-${radioValue}`}
                className="custom-radio"
                style={{
                  marginBottom: "5%",
                  borderColor: "green",
                }}
              />
            ))}
          </Form>
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
export default SortBy;