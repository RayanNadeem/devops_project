import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#005700",
        color: "white",
        padding: "20px 0",
        textAlign: "center",
      }}
    >
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>Welcome to AQR Mart! Explore amazing products at the best prices.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link></li>
              <li><Link to="/categories" style={{ color: "white", textDecoration: "none" }}>Categories</Link></li>
              <li><Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact Us</Link></li>
              <li><Link to="/cart" style={{ color: "white", textDecoration: "none" }}>Cart</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <p>Stay connected on social media:</p>
            <div>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "white", marginRight: "10px" }}>Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "white", marginRight: "10px" }}>Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>Instagram</a>
            </div>
          </Col>
        </Row>
        <hr style={{ backgroundColor: "white", margin: "20px 0" }} />
        <p>&copy; 2024 AQR Mart. All Rights Reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;