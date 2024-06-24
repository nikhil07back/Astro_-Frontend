import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../API/useRegistrationAPI";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Add() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : { "Available balance": "" };
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (value) => {
    localStorage.setItem("amount", value);
    navigate("/Payment", { state: { value } });
  };

  let userId = localStorage.getItem("id");

  useEffect(() => {
    if (userId) {
      getUser(userId).then((response) => {
        const userData = response.data.data;
        setFormData(userData);
        localStorage.setItem("formData", JSON.stringify(userData));
        setIsLoading(false);
      });
    }
  }, [userId]);

  return (
    <Container>
      <Row style={{}}>
        <Col>
          {isLoading ? (
            <SkeletonTheme baseColor="#e9e9e9" highlightColor="#f2f2f2">
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Skeleton
                  width={300}
                  height={40}
                  count={1}
                  style={{ marginBottom: "10px" }}
                />
                <Skeleton width={200} height={20} count={1} />
                <Skeleton
                  width={200}
                  height={30}
                  count={1}
                  style={{ marginTop: "20px" }}
                />
                <div style={{ marginTop: "20px" }}>
                  <Row>
                    <Col md={3}>
                      <Skeleton height={100} width={"100%"} />
                    </Col>
                    <Col md={3}>
                      <Skeleton height={100} width={"100%"} />
                    </Col>
                    <Col md={3}>
                      <Skeleton height={100} width={"100%"} />
                    </Col>
                    <Col md={3}>
                      <Skeleton height={100} width={"100%"} />
                    </Col>
                  </Row>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <Row>
                    <Col md={3}>
                      <Skeleton height={100} width={"100%"} />
                    </Col>
                    <Col md={3}>
                      <Skeleton height={100} width={"100%"} />
                    </Col>
                    <Col md={3}>
                      <Skeleton height={100} width={"100%"} />
                    </Col>
                    <Col md={3}>
                      <Skeleton height={100} width={"100%"} />
                    </Col>
                  </Row>
                </div>
              </div>
            </SkeletonTheme>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "30px" }}>Add Money To Wallet</h1>
              <div style={{ fontSize: "20px" }}>
                Available balance: &#8377; {formData?.wailet}
              </div>
              <div style={{}}>
                <h6
                  style={{
                    fontSize: "20px",
                    marginBottom: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  Popular Recharge
                </h6>
              </div>
              <div style={{ margin: "20px" }}>
                <Row style={{}}>
                  <Col md={3}>
                    <div
                      onClick={() => handleClick(50)}
                      style={{
                        height: "100px",
                        width: "100%",
                        borderRadius: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px black",
                        margin: "10px 0",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          top: "37px",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        &#8377; 50
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div
                      onClick={() => handleClick(100)}
                      style={{
                        height: "100px",
                        width: "100%",
                        borderRadius: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px black",
                        margin: "10px 0",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          top: "37px",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        &#8377; 100
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div
                      onClick={() => handleClick(200)}
                      style={{
                        height: "100px",
                        width: "100%",
                        borderRadius: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px black",
                        margin: "10px 0",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          top: "37px",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        &#8377; 200
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div
                      onClick={() => handleClick(500)}
                      style={{
                        height: "100px",
                        width: "100%",
                        borderRadius: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px black",
                        margin: "10px 0",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          top: "37px",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        &#8377; 500
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div style={{ margin: "20px" }}>
                <Row style={{}}>
                  <Col md={3}>
                    <div
                      onClick={() => handleClick(1000)}
                      style={{
                        height: "100px",
                        width: "100%",
                        borderRadius: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px black",
                        margin: "10px 0",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          top: "37px",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        &#8377; 1000
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div
                      onClick={() => handleClick(2000)}
                      style={{
                        height: "100px",
                        width: "100%",
                        borderRadius: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px black",
                        margin: "10px 0",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          top: "37px",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        &#8377; 2000
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div
                      onClick={() => handleClick(3000)}
                      style={{
                        height: "100px",
                        width: "100%",
                        borderRadius: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px black",
                        margin: "10px 0",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          top: "37px",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        &#8377; 3000
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div
                      onClick={() => handleClick(5000)}
                      style={{
                        height: "100px",
                        width: "100%",
                        borderRadius: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px black",
                        margin: "10px 0",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          top: "37px",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        &#8377; 5000
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Add;
