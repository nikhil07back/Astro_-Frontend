import React, { useState, useRef, useEffect } from "react";
import { Container,Navbar,Form,Row,Col,Button,Alert,} from "react-bootstrap";
import { postGeneralSetting } from "../../API/GeneralSett/generalSetting";
import { getGeneralSetting } from "../../API/GeneralSett/generalSetting";
import config from "../../config/config";

function GeneralSetting() {
  const hiddenLogoInput = useRef(null);
  const hiddenSmallLogoInput = useRef(null);
  const [siteName, setSiteName] = useState("");
  const [siteCode, setSiteCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [logoImage, setLogoImage] = useState(null);
  const [smallLogoImage, setSmallLogoImage] = useState(null);
  const [addresses, setAddresses] = useState("");
  const [currencye, setCurrencye] = useState("");
  const [symbol, setSymbol] = useState("");
  const [getID, setID] = useState("");
  const [alterImage, setAlterImage] = useState("");
  const [ultraImage, setUltraImage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  console.log("alterImage", alterImage);

  const postSetting = async () => {
    if (!isValidEmail(email)) {
      setAlertVariant("danger");
      setAlertMessage("Please enter a valid email address");
      setShowAlert(true);
      return;
    }

    if (
      !siteName ||
      !siteCode ||
      !phoneNumber ||
      !addresses ||
      !currencye ||
      !symbol ||
      !alterImage ||
      !ultraImage
    ) {
      setAlertVariant("danger");
      setAlertMessage("Please fill out all fields");
      setShowAlert(true);
      return;
    }

    const formData = new FormData();
    const data = {
      siteName: siteName,
      siteCode: siteCode,
      phone: phoneNumber,
      email: email,
      address: addresses,
      currency: currencye,
      currencySymbol: symbol,
    };

    formData.append("data", JSON.stringify(data));
    formData.append("logo", logoImage);
    formData.append("smallLogo", smallLogoImage);

    console.log("Form Data:", formData);

    try {
      const response = await postGeneralSetting(formData, getID);
      console.log("Response:", response);
      if (response.status === 200) {
        console.log("Updated Successfully");
        setAlertVariant("success");
        setAlertMessage("Updated Successfully");
        setShowAlert(true);

        getSetting();
      } else {
        console.log("Error:", response.statusText);
        setAlertVariant("danger");
        setAlertMessage("Error: " + response.statusText);
        setShowAlert(true);
      }
    } catch (error) {
      console.log("Error:", error);
      setAlertVariant("danger");
      setAlertMessage("Error: " + error.message);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    try {
      const response = await getGeneralSetting();
      console.log("responseSettingGEt", response.data?.data);
      setSiteName(response.data?.data[0].siteName);
      setSiteCode(response.data?.data[0].siteCode);
      setPhoneNumber(response.data?.data[0].phone);
      setEmail(response.data?.data[0].email);
      setAlterImage(
        config.siteUrl + "settingImages/" + response.data?.data[0].logo
      );
      setUltraImage(
        config.siteUrl + "settingImages/" + response.data?.data[0].smallLogo
      );
      setAddresses(response.data?.data[0].address);
      setCurrencye(response.data?.data[0].currency);
      setSymbol(response.data?.data[0].currencySymbol);
      setID(response?.data?.data[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoClick = () => {
    hiddenLogoInput.current.click();
  };

  const handleSmallLogoClick = () => {
    hiddenSmallLogoInput.current.click();
  };

  const handleChangeName = (e) => {
    setSiteName(e.target.value.replace(/[^a-zA-Z\s]/g, ""));
  };

  const handleChangeNumber = (e) => {
    setSiteCode(e.target.value.replace(/[^\d]/g, "").slice(0, 10));
  };

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value.replace(/[^\d]/g, "").slice(0, 10));
  };

  const handleChangeEmail = (e) => {
    const input = e.target.value;
    setEmail(input);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "SEK",
    "NZD",
    "KRW",
    "SGD",
    "NOK",
    "MXN",
    "INR",
    "RUB",
    "ZAR",
    "HKD",
    "BRL",
    "TRY",
    "AED",
    "SAR",
    "THB",
    "PLN",
    "DKK",
    "IDR",
    "TWD",
    "MYR",
    "PHP",
    "CZK",
    "ILS",
    "HUF",
    "CLP",
    "PKR",
    "QAR",
    "ARS",
    "COP",
    "EGP",
    "VND",
    "NGN",
    "UAE",
    "OMR",
    "KWD",
    "IQD",
    "COP",
    "UGX",
    "GHS",
    "JOD",
    "BDT",
    "TZS",
  ];

  const currencySymbols = [
    "$",
    "€",
    "£",
    "¥",
    "A$",
    "CA$",
    "CHF",
    "CN¥",
    "kr",
    "NZ$",
    "₩",
    "S$",
    "kr",
    "MX$",
    "₹",
    "₽",
    "R",
    "HK$",
    "R$",
    "₺",
    "د.إ",
    "﷼",
    "฿",
    "zł",
    "kr",
    "Rp",
    "NT$",
    "RM",
    "₱",
    "Kč",
    "₪",
    "Ft",
    "CLP$",
    "₨",
    "﷼",
    "$",
    "COL$",
    "EGP",
    "₫",
    "₦",
    "د.إ",
    "﷼",
    "د.ك",
    "ع.د",
    "USh",
    "GH₵",
    "د.ا",
    "৳",
    "TSh",
  ];

  const options = currencySymbols.map((symbol, index) => (
    <option key={index} value={symbol}>
      {symbol}
    </option>
  ));

  const option = currencies.map((currency, index) => (
    <option key={index} value={currency}>
      {currency}
    </option>
  ));

  useEffect(() => {
    if (showAlert) {
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showAlert]);

  return (
    <Container>
      <Alert
        show={showAlert}
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
        }}
      >
        <Alert.Heading>{alertMessage}</Alert.Heading>
      </Alert>

      <Navbar
        style={{
          backgroundColor: "#003175",
          border: "1px solid green",
          borderRadius: "6rem",
          position: "relative",
          zIndex: "1",
        }}
      >
        <Navbar.Brand style={{ color: "white", marginLeft: "4%" }}>
          General Settings
        </Navbar.Brand>
      </Navbar>

      <Form style={{ marginTop: "2%" }} encType="multipart/form-data">
        <Row className="mb-3">
          <Form.Label column sm="2">
            Site Name :
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="text"
              value={siteName}
              placeholder="Enter here"
              onChange={handleChangeName}
              style={{
                border: "none",
                borderBottom: "1px solid #ced4da",
                borderRadius: "0",
                boxShadow: "none",
              }}
            />
          </Col>
          <Form.Label column sm="2">
            Site Code :
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="text"
              value={siteCode}
              placeholder="Enter here"
              onChange={handleChangeNumber}
              style={{
                border: "none",
                borderBottom: "1px solid #ced4da",
                borderRadius: "0",
                boxShadow: "none",
              }}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm="2">
            Address :
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={addresses}
              placeholder="Enter here"
              onChange={(e) => setAddresses(e.target.value)}
              style={{
                border: "none",
                borderBottom: "1px solid #ced4da",
                borderRadius: "0",
                boxShadow: "none",
              }}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm="2">
            Phone :
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="text"
              placeholder="Enter here"
              value={phoneNumber}
              onChange={handleChangePhoneNumber}
              style={{
                border: "none",
                borderBottom: "1px solid #ced4da",
                borderRadius: "0",
                boxShadow: "none",
              }}
            />
          </Col>
          <Form.Label column sm="2">
            Email :
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="email"
              placeholder="Enter here"
              value={email}
              onChange={(e) => {
                handleChangeEmail(e);
                setEmail(e.target.value);
              }}
              style={{
                border: "none",
                borderBottom: isValidEmail(email)
                  ? "1px solid #ced4da"
                  : "1px solid red",
                borderRadius: "0",
                boxShadow: "none",
              }}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column sm="2">
            Currency :
          </Form.Label>
          <Col sm="4">
            <Form.Select
              aria-label="Select currency"
              value={currencye}
              onChange={(e) => setCurrencye(e.target.value)}
              style={{
                border: "none",
                borderBottom: "1px solid #ced4da",
                borderRadius: "0",
                boxShadow: "none",
              }}
            >
              <option value="">Select currency</option>
              {option}
            </Form.Select>
          </Col>

          <Form.Label column sm="2">
            Currency Symbol :
          </Form.Label>
          <Col sm="4">
            <Form.Select
              aria-label="Select currency symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              style={{
                border: "none",
                borderBottom: "1px solid #ced4da",
                borderRadius: "0",
                boxShadow: "none",
              }}
            >
              <option value="">Select currency symbol</option>
              {options}
            </Form.Select>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="formImageUploadLogo">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <img
                    src={
                      alterImage ||
                      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                    }
                    alt="Admin Logo"
                    style={{
                      borderRadius: "100%",
                      width: "100px",
                      height: "100px",
                      marginTop: "5px",
                      marginLeft: "-10px",
                    }}
                  />
                </div>
                <Button
                  onClick={handleLogoClick}
                  style={{
                    backgroundColor: "#003175",
                    color: "white",
                    padding: "2px 16px",
                    border: "none",
                    borderRadius: "100px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Upload Logo
                </Button>
                <input
                  type="file"
                  ref={hiddenLogoInput}
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setLogoImage(event.target.files[0]);
                    setAlterImage(URL.createObjectURL(event.target.files[0]));
                  }}
                />
              </div>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formImageUploadSmallLogo">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <img
                    src={
                      ultraImage ||
                      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                    }
                    alt="Admin Logo"
                    style={{
                      borderRadius: "100%",
                      width: "100px",
                      height: "100px",
                      marginTop: "5px",
                      marginLeft: "-10px",
                    }}
                  />
                </div>
                <Button
                  onClick={handleSmallLogoClick}
                  style={{
                    backgroundColor: "#003175",
                    color: "white",
                    padding: "2px 16px",
                    border: "none",
                    borderRadius: "100px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Upload Small Logo
                </Button>
                <input
                  type="file"
                  ref={hiddenSmallLogoInput}
                  style={{ display: "none" }}
                  onChange={(event) => {
                    console.log("ffffffff", event.target.files[0]);
                    setSmallLogoImage(event.target.files[0]);
                    setUltraImage(URL.createObjectURL(event.target.files[0]));
                  }}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div
        style={{ textAlign: "center", marginBottom: "2%", marginRight: "2%" }}
      >
        <Button
          style={{
            backgroundColor: "#003175",
            borderRadius: "100px",
            padding: "8px 128px",
          }}
          onClick={postSetting}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
}

export default GeneralSetting;
