import React, { useEffect, useState } from "react";
import { Card, Container, Button, Form, Alert } from "react-bootstrap";
import { addAstroPrice } from "../../API/AstroPriceApi";
import { getAstroPrice } from "../../API/EditPrice.Api";
import { updatePrice } from "../../API/UpdatePrice";
import { getGeneralSetting } from "../../API/GeneralSett/generalSetting";

function AstologerPrice() {
  const [callPrice, setCallPrice] = useState("");
  const [chatPrice, setChatPrice] = useState("");
  const [symbol, setSymbol] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");



  const handleChatPriceChange = (event) => {
    let inputValue = event.target.value;
    setChatPrice(inputValue);
  };

  const handleCallPriceChange = (event) => {
    let inputValue = event.target.value;
    setCallPrice(inputValue);
  };

  const showAlert = (variant, message) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setTimeout(() => {
      setAlertVariant("");
      setAlertMessage("");
    }, 3000);
  };

  const addPrice = async () => {
    if (!chatPrice || !callPrice) {
      showAlert("danger", "Please fill out all fields");
      return;
    }
    try {
      const data = {
        callPrice: callPrice,
        chatPrice: chatPrice,
      };
      await addAstroPrice(data);
      showAlert("success", "Price added successfully");
    } catch (error) {
      console.log("Error while saving price:", error);
      showAlert("danger", "Error while saving price");
    }
  };

  useEffect(() => {
    getPrice();
  }, []);

  const getPrice = async () => {
    try {
      const response = await getAstroPrice();
      setCallPrice(response.data?.data?.callPrice || "");
      setChatPrice(response.data?.data?.chatPrice || "");
    } catch (error) {
      console.error(error);
    }
  };

  const editPrice = async () => {
    if (!chatPrice || !callPrice) {
      showAlert("danger", "Please fill out all fields");
      return;
    }

    try {
      const data = {
        callPrice: callPrice,
        chatPrice: chatPrice,
      };
      await updatePrice(data);
      showAlert("success", "Price updated successfully");
    } catch (error) {
      console.error("Error editing price:", error);
      showAlert("danger", "Error editing price");
    }
  };

  useEffect(() => {
    getSymbol();
  }, []);

  const getSymbol = async () => {
    try {
      const response = await getGeneralSetting();
      console.log("responseSettingGEt", response.data?.data);
      setSymbol(response.data?.data[0].currencySymbol);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {alertMessage && (
        <Alert
          variant={alertVariant}
          style={{
            position: "fixed",
            top: "14%",
            left: "60%",
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
      <Card>
        <Card.Header>
          <h3>Set Price</h3>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupChartPrice">
              <Form.Label>Chat Price/Chat:</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder=""
                  value={symbol}
                  style={{
                    width: "55px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter Price"
                  value={chatPrice}
                  onChange={handleChatPriceChange}
                  style={{ width: "40%" }}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupCallPrice">
              <Form.Label>Call Price /Call :</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder=""
                  value={symbol}
                  style={{
                    width: "60px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter Price"
                  value={callPrice}
                  onChange={handleCallPriceChange}
                  style={{ width: "40%" }}
                />
              </div>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted d-flex justify-content-end">
          <Button variant="danger" className="mx-2">
            Clear
          </Button>

          <Button variant="info" className="mx-2" onClick={editPrice}>
            Save
          </Button>

   
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default AstologerPrice;
