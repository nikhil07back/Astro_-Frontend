import React, { useEffect, useState } from "react";
import { Card,Modal,Button } from "react-bootstrap";
import { getDynamic } from "../../API/astroProfile";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../../config/config";
import { getGeneralSetting } from "../../API/GeneralSett/generalSetting";

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const [siteName, setSiteName] = useState("");
  const [imageExists, setImageExists] = useState(true);
  const [availableBalance, setAvailableBalance] = useState(
    location.state?.availableBalance || 0
  );
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);

 


  const StartChat = () => {
    const access = localStorage.getItem("accessToken");
    if (!access) {
        return navigate("/VerifyOtpPage");
    }
    const id = location.state.id;
    const name = location.state.name;
    if (availableBalance < 700) {
        setShowInsufficientBalance(true);
    } else {
        return navigate("/Chatpage", { state: { id, name } });
    }
};

const RechargeNow = () => {
  navigate("/Add");
};

  const callpage = () => {
    const access = localStorage.getItem("accessToken");
    if (!access) {
      navigate("/VerifyOtpPage");
    } else if (availableBalance < 750) {
      setShowInsufficientBalance(true);
    } else {
      navigate("/Callpage");
    }
  };

  useEffect(() => {
    getAllDynamic();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getGeneralSetting();
      setSiteName(response.data?.data[0]?.siteName || "");
    } catch (error) {
      console.error(error);
    }
  };

  const getAllDynamic = async () => {
    const userId = location?.state?.id;
    if (!userId) return;
    try {
      const response = await getDynamic(userId);
      setUserData(response.data?.data || {});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
<div>      <Modal
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
            </Modal></div>

      <Card
        style={{
          width: "90%",
          maxWidth: "900px",
          boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <div>
              {userData.image && imageExists ? (
                <img
                  src={`${config.siteUrl}astrologerImages/${userData.image}`}
                  alt="profile"
                  onError={() => setImageExists(false)}
                  style={{
                    borderRadius: "100%",
                    width: "150px",
                    height: "150px",
                    marginTop: "35px",
                    marginLeft: "-30px",
                    border: "0px",
                  }}
                />
              ) : (
                <img
                  src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                  alt="default profile"
                  style={{
                    borderRadius: "100%",
                    width: "150px",
                    height: "150px",
                    marginTop: "35px",
                    marginLeft: "-35px",
                    border: "0px",
                  }}
                />
              )}
            </div>
          </div>

          <div
            style={{ lineHeight: "1", marginTop: "45px", marginLeft: "1.2rem" }}
          >
            <p>
              <b style={{ fontSize: "1.4rem" }}>{userData?.name}</b>
              <img
                src="https://d1gcna0o0ldu5v.cloudfront.net/fit-in/25x25/assets/images/astrologer_profile/verified.webp"
                alt="verified profile img"
                height="20"
                width="20"
                style={{ margin: "0 0 8px 8px" }}
              />
            </p>
            <p>{userData?.expertise}</p>
            <p>{userData?.languages}</p>
            <p>Exp: {userData?.experience}</p>

            <div>
              <p>
                <button
                  style={{
                    height: "3.3rem",
                    background: "#ffffff",
                    border: "1px solid green",
                    borderRadius: "6rem",
                    padding: "0 5rem",
                  }}
                  onClick={StartChat}
                >
                  <img
                    src="https://astrotalk.s3.amazonaws.com/assets/images/chatoffline/online-status-chat.webp"
                    alt="message image"
                    height="20"
                  />
                  <span style={{ color: "green" }}>&nbsp; Start Chat</span>
                </button>

                <button
                  style={{
                    height: "3.3rem",
                    background: "#ffffff",
                    border: "1px solid green",
                    borderRadius: "6rem",
                    marginLeft: "1rem",
                    padding: "0 5rem",
                  }}
                  onClick={callpage}
                >
                  <img
                    src="https://astrotalk.s3.amazonaws.com/assets/images/chatoffline/online-status-call.webp"
                    alt="call img"
                    height="18"
                  />{" "}
                  <span style={{ color: "green" }}> &nbsp;Start Call</span>
                </button>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h5>
              <b style={{ color: "#454545" }}>About {siteName}</b>
            </h5>
          </div>
          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              marginBottom: "5rem",
            }}
          >
            {userData?.aboutAstrologer}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
