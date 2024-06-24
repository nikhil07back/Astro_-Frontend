import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSort, FaFilter } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SortBy from "../../screens/SortBy/SortByPape";
import FilterPage from "../../screens/FilterPage/FilterPage";
import FrontPage from "../../components/FrontPage";
import { getAllAstrologer } from "../../API/astrologerregAPI";
import { getUser } from "../../API/useRegistrationAPI";
import { getGeneralSetting } from "../../API/GeneralSett/generalSetting";

function CallAstrologer() {
  const [ast, setAst] = useState([]); ///api all astrologer
  const [pop, setPop] = useState(false);
  const [pip, setPip] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [tokens, setTokens] = useState(localStorage.getItem("accessToken"));

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    "Available balance": "",
  });

  const userId = localStorage.getItem("id");

  useEffect(() => {
    console.log("Executing useEffect with userId:", userId);
    if (userId !== null && userId !== undefined && userId != "") {
      getUser(userId).then((response) => {
        console.log("Response:", response.data.data);
        setFormData(response.data.data);
      });
    }
  }, [userId]);

  const Recharge = () => {
    const anything = localStorage.getItem("accessToken");
    if (anything) {
      navigate("/Add");
    } else {
      navigate("/VerifyOtpPage");
    }
  };

  const Referesh = (anything) => {
    console.log("anything", anything);
    setPip(anything);
  };
  const SortReferesh = (sort) => {
    console.log("sort", sort);
    setPop(sort);
  };
  const buttonStyle = {
    boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.1)",
    marginRight: "18px",
  };
  ///////////////////api/////////////////
  useEffect(() => {
    getAllAstrologers();
  }, []);
  const getAllAstrologers = async () => {
    try {
      const response = await getAllAstrologer();
      console.log("response", response.data?.data);
      setAst(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("pip", pip);
  console.log("pop", pop);
  ///////////////////////////////////////////////////////

  useEffect(() => {
    getCaewewe();
  }, []);
  const getCaewewe = async () => {
    try {
      const response = await getGeneralSetting();
      console.log("responseSettingGEt", response.data?.data);
      setSiteName(response.data?.data[0].siteName);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      {pop === true ? <SortBy SortReferesh={SortReferesh} /> : null}
      {pip === true ? <FilterPage Referesh={Referesh} /> : null}
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ paddingRight: "2%", paddingLeft: "2%" }}
      >
        <Navbar.Brand style={{ fontFamily: "Poppins, sans-serif" }}>
          Call With {siteName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            {/* <Button
              variant="light"
              className="text-dark"
          
              style={{ fontFamily: "Poppins, sans-serif", ...buttonStyle }}
              onClick={() => {
                setPip(true);
              }}
            >
              <FaFilter className="mr-1" /> Filter
            </Button>
            <Button
              onClick={() => {
                setPop(true);
              }}
              variant="light"
              className="text-dark"
             
              style={{ fontFamily: "Poppins, sans-serif", ...buttonStyle }}
            >
              <FaSort className="mr-1" /> Sort by
            </Button> */}
          </Nav>
          <Form className="d-flex">
            {/* <Form.Control
              placeholder="Search"
              className="me-2 text-start"
              aria-label="Search"
            />
            <Button
              variant="outline-success"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Search
            </Button> */}

            <Button
              style={{ fontFamily: "Poppins, sans-serif", ...buttonStyle }}
              variant="outline-success"
              onClick={Recharge}
            >
              Recharge
            </Button>
            {tokens ? (
              <Navbar.Brand style={{ fontFamily: "Poppins, sans-serif" }}>
                Available balance: {formData.wailet}
                {/* Available balance: {formData.wailet} */}
              </Navbar.Brand>
            ) : null}
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Row>
        {ast
          ?.filter((data) => data.visibility !== false)
          .map((data, index) => (
            <Col lg={4} md={6} sm={12} key={index} style={{}}>
              {" "}
                            
              <FrontPage 
                name={data?.name}
                expertise={data?.expertise}
                languages={data?.languages}
                image={data?.image}
                experience={data?.experience}
                price={data?.price}
                call={true}
                id={data?._id}
                ts={data?.status}
                availableBalance={formData?.wailet}
          
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
}
export default CallAstrologer;
