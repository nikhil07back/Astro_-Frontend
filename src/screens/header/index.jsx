import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getGeneralSetting } from "../../API/GeneralSett/generalSetting";
import config from "../../config/config";


const Header = () => {
  const [siteName, setSiteName] = useState("");
  const [alterImage, setAlterImage] = useState("");
  const [feviconImage, setFeviconImage] = useState("");

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  document.getElementById("favicon").href = feviconImage;
  function Logout() {
    localStorage.clear();
    navigate("/");
  }

  const handleLoginClick = () => {
    navigate("/VerifyOtpPage");
  };

  const handleChatClick = () => {
    navigate("/ChatAstrologer");
  };

  const handleCallClick = () => {
    navigate("/CallAstrologer");
  };

  const handleProfile = () => {
    navigate("/UserProfile");
  };
  const homeredric = () => {
    navigate("/");
  };

  useEffect(() => {
    getNamess();
  }, []);
  const getNamess = async () => {
    try {
      const response = await getGeneralSetting();
      console.log("responseSettingGEt", response.data?.data);
      setSiteName(response.data?.data[0].siteName);
      setAlterImage(
        config.siteUrl + "settingImages/" + response.data?.data[0].logo
      );
      setFeviconImage(
        config.siteUrl + "settingImages/" + response.data?.data[0].smallLogo
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      expand="lg"
      style={{
        zIndex: 999,
        position: "fixed",
        width: "100%",
        backgroundColor: "#003175",
        height:"14%",
      }}
    >
      <Container>
        <div className="image-field">
          <img
            src={alterImage}
            alt="Image"
            style={{
              width:'80%',
              height: "50px",
              objectFit: "cover",
              borderRadius: "5px",
              background: "white",
            }}
          />
        </div>
        <Navbar.Brand style={{ color: "white" }}>
          <h3>{siteName}</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleChatClick} style={{ color: "white" }}>
              Chat with {siteName}
            </Nav.Link>
            <Nav.Link onClick={handleCallClick} style={{ color: "white" }}>
              Call with {siteName}
            </Nav.Link>
          </Nav>
          <Nav>
            {accessToken === null ? (
              <Button
                variant="outline-light"
                onClick={handleLoginClick}
                style={{ marginLeft: "19px" }}
              >
                Login
              </Button>
            ) : (
              <NavDropdown
                title={
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png?20220226140232"
                    alt=""
                    style={{
                      height: "3rem",
                      width: "3rem",
                      marginLeft: "150%",
                    }}
                  />
                }
                id="basic-nav-dropdown"
              >
                <div>
                  <NavDropdown.Item href="#home">Home</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleProfile}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider/>
                  <NavDropdown.Item onClick={Logout}>Log out</NavDropdown.Item>
                </div>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
