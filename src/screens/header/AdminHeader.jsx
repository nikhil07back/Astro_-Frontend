import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Form, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { editActivity } from "../../API/active_Inactive/EditActivity";
import { getGeneralSetting } from "../../API/GeneralSett/generalSetting";
import config from "../../config/config";

export default function AdminHeader() {
  const [siteName, setSiteName] = useState("");
  const [alterImage, setAlterImage] = useState("");
  const [feviconImage, setFeviconImage] = useState("");
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const userType = localStorage.getItem("userType");
  const [activityStatus, setActivityStatus] = useState(() => {
    const status = localStorage.getItem("activityStatus");
    return status ? JSON.parse(status) : false;
  });

  function Logout() {
    localStorage.clear();
    navigate("/");
  }

  const handleProfile = () => {
    navigate("/EditAstrologer");
  };

  // const title = userType === "admin" ? "Administration" : "Astrologer Page";

  const ActivityStatus = async (event) => {
    const isChecked = event.target.checked;
    console.log("data55", isChecked);
    setActivityStatus(isChecked);
    localStorage.setItem("activityStatus", JSON.stringify(isChecked));
    const data = {
      status: isChecked,
    };
    console.log("dataActivityii", data);

    try {
      const response = await editActivity(data);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getName();
  }, []);
  const getName = async () => {
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
  document.getElementById("favicon").href = feviconImage;
  return (
    <Navbar
      expand="lg"
      style={{
        zIndex: "99",
        position: "fixed",
        width: "100%",
        height:"14%",

        backgroundColor: "#003175",
      }}
    >
      <Container>
      <div className="image-field" >
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
<Navbar.Brand href="#home" style={{ color: "white" }}>
  <h3 style={{ margin: "0" }}>{siteName}</h3>
</Navbar.Brand>


        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {accessToken && userType === "astrologer" && (
              <>
                <td style={{ marginTop: "5%" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      style={{ transform: "scale(1.5)", marginRight: "10px" }}
                      checked={activityStatus}
                      onChange={ActivityStatus}
                    />
                    <div style={{ fontSize: "25px", color: "white" }}>
                      {activityStatus ? "Active" : "In-Active"}
                    </div>
                  </div>
                </td>

                <NavDropdown
                  title={
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png?20220226140232"
                      alt=" "
                      style={{
                        height: "3rem",
                        width: "3rem",
                        marginLeft: "150%",
                      }}
                    />
                  }
                  id="basic-nav-dropdown"
                  style={{ marginLeft: "-3rem" }}
                >
                  <div>
                    <NavDropdown.Item href="#home">Home</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleProfile}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                  </div>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
