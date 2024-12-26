import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = { name, email, message };

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);

      if (response.status === 201) {
        alert("Message sent successfully!");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-us-page" style={{ backgroundColor: "#8aee8a", minHeight: "100vh" }}>
      <Container>
        <Row>
          <Col md={6} className="get-in-touch-section">
            <h3>Get in Touch</h3>
            <p>If you have any questions or concerns, feel free to reach out to us. We are here to help!</p>
          </Col>
          <Col md={6} className="contact-details" style={{ paddingLeft: "300px" }}>
            <h5>Contact Information</h5>
            <div className="contact-info-box">
              <p><strong>Email:</strong> support@AQR.com</p>
              <p><strong>Phone:</strong> +92 319-2312602</p>
              <p><strong>Address:</strong> xyz, Rawalpindi, Pakistan.</p>
            </div>
          </Col>
        </Row>
        <Row className="send-message-section">
          <Col md={12}>
            <h5>Send Us a Message</h5>
            <Form onSubmit={handleSubmit} className="message-form">
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formMessage" className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;