import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import myicon from "../images/Icon.jpg";
import { getAstroPrice } from "../../src/API/EditPrice.Api";
import { getUser } from "../API/useRegistrationAPI";
import config from "../config/config";

const FrontPage = ({ name, expertise, languages, image, experience, call, id, availableBalance, ts, }) => {

  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [imageExists, setImageExists] = useState(true);
  const [callPrice, setCallPrice] = useState("");
  const [chatPrice, setChatPrice] = useState("");

  useEffect(() => {
    getPrice();
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await getUser(userId);
      setUserDetails(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigation = (e) => {
    if (
      !e.target.closest(".call-button") &&
      !e.target.closest(".chat-button")
    ) {
      navigate("/ProfilePage", {
        state: { id, availableBalance, call, name, image },
      });
    }
  };

  const RechargeNow = () => {
    navigate("/Add");
  };

  const ChatButton = () => {
    const access = localStorage.getItem("accessToken");
    if (!access) {
      return (
        <Button
          onClick={() => navigate("/VerifyOtpPage")}
          variant="outline-success"
          className={call ? "call-button" : "chat-button"}
        >
          {call ? "Call" : "Chat"}
        </Button>
      );
    } else {
      return (
        <Button
          onClick={call ? handleCall : handleChat}
          variant="outline-success"
          className={call ? "call-button" : "chat-button"}
        >
          {call ? "Call" : "Chat"}
        </Button>
      );
    }
  };

  const handleChat = () => {
    if (availableBalance < chatPrice) {
      setShowInsufficientBalance(true);
    } else {
      navigate("/chatpage", {
        state: {
          id,
          availableBalance,
          name: userDetails.name,
          gender: userDetails.gender,
          dob: userDetails.dateOfBirth,
          tob: userDetails.timeOfBirth,
          pob: userDetails.placeOfBirth,
        },
      });
    }
  };

  const handleCall = () => {
    // Retrieve values from localStorage
    const fromId = localStorage.getItem("id");
    const astroName = localStorage.getItem("Astroname");

    // Debugging information
    console.log("fromId:", fromId);
    console.log("astroName:", astroName);
    console.log("ts:", ts);
    console.log("availableBalance:", availableBalance);
    console.log("callPrice:", callPrice);

    // Check if ts is defined and truthy
    if (ts) {
      // Check if the user has sufficient balance
      if (availableBalance < callPrice) {
        setShowInsufficientBalance(true);
      } else {
        // Check if fromId and astroName are not null
        if (fromId && astroName) {
          const url = `${config.sinchUrl}?toUserID=${id}&fromUser=${fromId}&fromName=${astroName}`;
          console.log("Redirecting to URL:", url);
          window.location.href = url;
        } else {
          alert("User ID or Astrologer Name is missing in localStorage.");
        }
      }
    } else {
      alert("Astrologer is currently unavailable");
    }
  };


  const getPrice = async () => {
    try {
      const response = await getAstroPrice();
      setCallPrice(response.data?.data?.callPrice);
      setChatPrice(response.data?.data?.chatPrice);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card
        onClick={handleNavigation}
        style={{
          width: "100%",
          height: "170px",
          marginTop: "20px",
          overflow: "hidden",
          boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div style={{ width: "30%" }}>
            <div>
              {image && imageExists ? (
                <img
                  src={config.siteUrl + "astrologerImages/" + image}
                  alt="frontpage"
                  onError={() => setImageExists(false)}
                  style={{
                    borderRadius: "100%",
                    width: "70px",
                    height: "70px",
                    marginTop: "15px",
                    marginLeft: "15px",
                    border: "0px",
                  }}
                />
              ) : (
                <img
                  src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                  alt="default profile"
                  style={{
                    borderRadius: "100%",
                    width: "70px",
                    height: "70px",
                    marginTop: "15px",
                    marginLeft: "15px",
                    border: "0px",
                  }}
                />
              )}
            </div>
          </div>
          <div style={{ width: "60%" }}>
            <div
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                lineHeight: "0.8",
                width: "100%",
                marginLeft: "5%",
              }}
            >
              <div>
                <p>
                  <b>{name}</b>
                </p>
                <p>Expertise: {expertise.join(" , ")}</p>
                <p>Languages: {languages.join(" , ")}</p>
                <p>Experience: {experience}</p>
              </div>
            </div>
          </div>
          <div style={{ width: "15%" }}>
            <div style={{ position: "absolute", top: "0", right: "5" }}>
              <img
                src={myicon}
                alt="Icon"
                style={{
                  borderRadius: "100%",
                  width: "25px",
                  height: "25px",
                  border: "0px",
                  marginTop: "15px",
                  marginRight: "20px",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "10%",
                right: "5%",
                zIndex: "1",
              }}
            >
              <ChatButton />
            </div>
          </div>
        </div>
      </Card>

      <Modal
        show={showInsufficientBalance}
        onHide={() => setShowInsufficientBalance(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Insufficient Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please recharge your account to continue.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowInsufficientBalance(false)}
          >
            Close
          </Button>
          <Button variant="outline-success" onClick={RechargeNow}>
            Recharge Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FrontPage;
