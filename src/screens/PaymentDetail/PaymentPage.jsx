import React, { useState } from "react";
import { Row, Col, Button, Alert, Modal } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { postPayment } from "../../API/useRegistrationAPI";
import { postVerifyPayment } from "../../API/useRegistrationAPI";



function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false); // State to control success message visibility
  const [showError, setShowError] = useState(false); // State to control error message visibility
  const amount = location.state ? location.state.value : 0;


  const PaymentPage = () => {
    navigate("/");
  };

  const [orderId, setOrderId] = useState("");

  const createOrder = async () => {
    try {
      if (amount) {
        const data = {
          amount: amount
        };
        console.log("GGFDFGFDGFDS", localStorage.getItem("accessToken"));
        const response = await postPayment(data);
        //  console.log('recharge', response);
        console.log('recharge', response?.data?.data?.id);
        setOrderId(response?.data?.data?.id);

        // paymentHandler.open();
        openPayment(response?.data?.data?.id)

      } else {
        //setOrderId("kjfjkfjkfkjf");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const verifyPayment = async (responseData) => {
    console.log('razor pay res', responseData);
    try {
      const datas = {
        "razorpay_order_id": responseData?.razorpay_order_id,
        "razorpay_payment_id": responseData?.razorpay_payment_id,
        "razorpay_signature": responseData?.razorpay_signature,
        "amount": amount + amount * 0.18
      }

      const verifyResponse = await postVerifyPayment(datas);
      console.log('verifyResponsesdjksdjsjkdsf', verifyResponse.data);
      if (verifyResponse?.status === 200) {
        setTimeout(() => navigate("/"), 5000); // Navigate to front page after 5 seconds

        // console.log("successfully paid")  
        setShowSuccess(true);
      } else {
        setShowError(true);
        // console.log("Failure paid")
      }

    } catch (error) {
      console.error(error);
    }
  };

  const openPayment = async (order) => {

    const options = {
      key: "rzp_test_8Mwd3fMnBoZO1G",
      amount: amount + amount * 0.18 + "00",
      currency: "INR",
      name: "AstroTalk",
      description: "Test Payment",
      image:
        "https://sumerudigital.com/wp-content/uploads/2020/05/SUMERU-LOGO-01-Final-Logo-01-2-e1641031221161-1024x204.png",
      handler: function (response) {
        console.log("", response);
        verifyPayment(response);
      },
      order_id: order,
      theme: {
        color: "#3399cc",
      },
    };

    window.Razorpay(options).open();

  }



  return (
<div >

    <div style={{
      overflow: "hidden",
      // textAlign:"center"
    }}>

     
     
      <Row>
        <Col lg={3}></Col>
          
        <Col lg={6}>
          <div
            style={{
              // display: "flex",
              //flexDirection: "row",
              justifyContent: "center",
              //marginLeft:"45%"
            }}
          >
            <div>
              <Button
                style={{
                  width: "100%",
                  height: "50px",
                  color: "black",
                  backgroundColor: "transparent",
                  fontSize: "27px",
                  fontWeight: "bold",
                  boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.3)",
                }}
                variant="outline-secondary"
                disabled
              >
                Payment Details
              </Button>

              <table
                style={{
                  //borderCollapse: "collapse",
                  width: "100%",
                  marginTop: "25px",
                }}
              >
                <tbody>
                  <tr style={{ border: "1px solid #000" }}>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "10px",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      Recharge Amount
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      Rs.{amount}
                    </td>
                  </tr>
                  <tr style={{ border: "1px solid #000" }}>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "10px",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      GST@18%
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      Rs.{amount * 0.18}
                    </td>
                  </tr>
                  <tr style={{ border: "1px solid #000" }}>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "10px",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      <b>Total Amount</b>
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      Rs.{amount + amount * 0.18}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: "20px" }}>
                <Button variant="outline-success" onClick={PaymentPage}>
                  Back
                </Button>
                <Button
                  onClick={createOrder}
                  variant="outline-success"
                  style={{ float: 'inline-end' }}
                >
                  Payment Now
                </Button>

                <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ color: "green" }}>Payment Successful</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ color: "green" }}>
                    Your payment was successful!
                  </Modal.Body>
                </Modal>

                {showError && (
                  <Modal show={showError} onHide={() => setShowError(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title style={{ color: "red" }}>Payment Failed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: "red" }}>
                      There was an issue with your payment. Please try again.
                    </Modal.Body>
                  </Modal>

                )}
              </div>
            </div>
          </div>
        </Col>

        <Col lg={3}></Col>
      </Row>
    </div>
</div>

  );
}

export default Payment;
