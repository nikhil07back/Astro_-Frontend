import React, { useEffect, useState } from "react";
import { Card, Button,Modal } from "react-bootstrap";
import usericon from "../../images/usericon.jpg";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const Callpage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const amount = location?.state?.formData;

  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);

  const RechargeNow = () => {
    navigate("/Add");
  };
  const CloseButton = () => {

    navigate("/CallAstrologer")
  }
  useEffect(()=>{
    const fromId = localStorage.getItem("id");
    const Astroname = localStorage.getItem("Astroname");
    window.location.href = config.sinchUrl+'?toUserID=1234&fromUser='+fromId+'&fromName='+Astroname;
  },[])
  return (
    <div style={{ position: "relative" }}>
      
        <>
          <Card
            style={{
              width: "25rem",
              margin: "0 auto",
              marginTop: "2rem",
              height: "25rem",
            }}
          >
            <Card.Body style={{}}>
              <Card.Title style={{ textAlign: "center" }}>xyz</Card.Title>
              <Card.Img
                variant="top"
                src={usericon}
                alt="usericon"
                style={{
                  height: "228px",
                  width: "200px",
                  margin: "0 auto",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  marginLeft: "5rem",
                  boxShadow: "1px 2px 3px 4px",
                  marginTop: "2rem",
                }}
              />
              <Button
                variant="primary"
                style={{
                  borderRadius: "1rem",
                  display: "block",
                  position: "absolute",
                  bottom: "1rem",
                  marginLeft: "10rem",
                  height: "50px",
                  width: "70px",
                }}
              >
                Call
              </Button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              ></div>
            </Card.Body>
          </Card>
        </>
    </div>
  );
};

export default Callpage;
