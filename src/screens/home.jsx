import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSort, FaFilter } from "react-icons/fa";
import SortBy from "./SortBy/SortByPape";
import { Row, Col } from "react-bootstrap";
import FilterPage from "../screens/FilterPage/FilterPage";
import FrontPage from "../components/FrontPage";
import { getAllAstrologer } from "../API/astrologerregAPI";
import { useNavigate } from "react-router-dom";
import { getUser } from "../API/useRegistrationAPI";
import { getGeneralSetting } from "../API/GeneralSett/generalSetting";

function Home() {
  const [ast, setAst] = useState([]); 
  const [pop, setPop] = useState(false);
  const [pip, setPip] = useState(false);
  const [balance, setBalance] = useState(0);
  const [siteName, setSiteName] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    "Available balance": "",

  });

  console.log("balanceeeeeeeeeeeeeeeeeeeee",formData);

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
    console.log("Test");
    try {
      const response = await getAllAstrologer();
      console.log("response astro", response.data?.data);
      console.log("sttst", ast);
      console.log("sttst", ast[0]?.status);
      setAst(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("pip", pip);
  console.log("pop", pop);
  ///////////////////////////////////////////////////////
  const [tokens, setTokens] = useState(localStorage.getItem("accessToken"));

  let userId = localStorage.getItem("id");
  let accessToken = localStorage.getItem("accessToken");

  console.log("userId:", userId);

  // useEffect(() => {
  //   console.log("Executing useEffect with userId:", userId);
  //   console.log("Executing useEffect with accessToken:", accessToken);
  //   if (userId !== null && userId !== undefined && userId !="") {
  //     getUser(userId).then((response) => {
  //      return  console.log("Response:", response.data.data);
  //       setFormData(response.data.data);
  //       setBalance(response.data.data.wailet); // Assuming available balance is in "wailet" field

  //     });
  //   }
  // }, [userId  , getUser ]);

  useEffect(() => {
    console.log("Executing useEffect with userId:", userId);
    console.log("Executing useEffect with accessToken:", accessToken);
    if (userId !== null && userId !== undefined && userId !== "") {
      getUser(userId)
        .then((response) => {
          console.log("Response:", response.data.data);
          setFormData(response.data.data);
          localStorage.setItem("userName", response.data.data.name);
          // Assuming "wallet" is the correct field name for the balance
          setBalance(response.data.data.wallet);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId, accessToken]);

  // useEffect(() => {
  //   console.log("snehahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  //   getUser(userId).then((response) => {
  //     console.log("response", response.data.data);
  //     setFormData(response.data.data);
  //   });
  // }, [userId]);

  console.log("form data:", formData);

  useEffect(() => {
    getCall();
  }, []);
  const getCall = async () => {
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
      <Row><Col  sm={12}>{pop === true ? <SortBy SortReferesh={SortReferesh} /> : null}
      {pip === true ? <FilterPage Referesh={Referesh} /> : null}
     
      <Navbar 
        expand="lg"
        className="bg-body-tertiary"
        style={{ paddingRight: "2%", paddingLeft: "2%" }}
      >
        <Navbar.Brand style={{ fontFamily: "Poppins, sans-serif" }}>
          Chat with {siteName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Button
              variant="light"
              className="text-dark"
              //style={buttonStyle}
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
              //style={buttonStyle}
              style={{ fontFamily: "Poppins, sans-serif", ...buttonStyle }}
            >
              <FaSort className="mr-1" /> Sort by
            </Button>
          </Nav>
          <Form className="d-flex">
            {/* <Form.Control
              placeholder="Search"
              className="me-2 text-start"
              aria-label="Search"
            /> */}
            {/* <Button
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
      </Navbar></Col></Row>
      
      <Row>
        {ast
          ?.filter((data) => data.visibility !== false)
          .map((data, index) => (
            <Col lg={4} md={6} sm={12} key={index}>
              <FrontPage
                name={data?.name}
                expertise={data?.expertise}
                languages={data?.languages}
                image={data?.image}
                experience={data?.experience}
                price={data?.price}
                id={data?._id}
                availableBalance={formData.wailet}
                ts={data?.status}
                formData={formData?.wailet}
                call={false}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
}
export default Home;
