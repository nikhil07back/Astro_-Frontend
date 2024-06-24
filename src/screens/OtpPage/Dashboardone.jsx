import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/Dashboard.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Dashboardone() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call or data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Change the timeout value as per your requirements
  }, []);

  return (
    <Container>
      {isLoading ? (
        <SkeletonTheme baseColor="#e9e9e9" highlightColor="#f2f2f2">
          <div>
            <Row>
              <Col xs={12} sm={6} md={3}>
                <Skeleton height={100} style={{ borderRadius: "8px" }} />
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Skeleton height={100} style={{ borderRadius: "8px" }} />
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Skeleton height={100} style={{ borderRadius: "8px" }} />
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Skeleton height={100} style={{ borderRadius: "8px" }} />
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col xs={12} sm={6} md={3}>
                <Skeleton height={100} style={{ borderRadius: "8px" }} />
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Skeleton height={100} style={{ borderRadius: "8px" }} />
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Skeleton height={100} style={{ borderRadius: "8px" }} />
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Skeleton height={100} style={{ borderRadius: "8px" }} />
              </Col>
            </Row>
          </div>
        </SkeletonTheme>
      ) : (
        <>
          <Row>
            <Col xs={12} sm={6} md={3}>
              <div className="report-card">
                <i className="uil uil-thumbs-up report-icon"></i>
                <p className="report-text">Total Call Report</p>
                <p className="report-number">10</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="report-card">
                <i className="uil uil-thumbs-up report-icon"></i>
                <p className="report-text">Total Chat Report</p>
                <p className="report-number">10</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="report-card">
                <i className="uil uil-thumbs-up report-icon"></i>
                <p className="report-text">Today Total Call Report</p>
                <p className="report-number">10</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="report-card">
                <i className="uil uil-thumbs-up report-icon"></i>
                <p className="report-text">Today Total Chat Report</p>
                <p className="report-number">10</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={3}>
              <div className="report-card">
                <i className="uil uil-thumbs-up report-icon"></i>
                <p className="report-text">Total Report</p>
                <p className="report-number">10</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="report-card">
                <i className="uil uil-thumbs-up report-icon"></i>
                <p className="report-text">Total Number User</p>
                <p className="report-number">10</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="report-card">
                <i className="uil uil-thumbs-up report-icon"></i>
                <p className="report-text">Total Number Astrologer</p>
                <p className="report-number">10</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="report-card">
                <i className="uil uil-thumbs-up report-icon"></i>
                <p className="report-text">Total payment</p>
                <p className="report-number">10</p>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Dashboardone;