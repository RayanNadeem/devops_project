import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const [name, setName] = useState("");
  const { cartItems, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [phoneNumber, setPhoneNumber] = useState("");  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !address || !phone || !email) {
      alert("Please fill in all the required fields.");
      return;
    }

    const orderData = {
      name,
      email,
      address,
      city,
      zip,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price.replace(/[^\d.-]/g, "")),
      })),
      totalAmount: parseFloat(calculateTotal()),
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/checkout", orderData);
  
      if (response.status === 201) {
        alert("Order placed successfully!");
        clearCart();
        navigate("/");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error.response?.data || error.message);
      alert("Failed to place order. Please try again.");
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d.-]/g, ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div style={{ backgroundColor: "#8aee8a"}}>
      <Container className="py-5">
        <h2 className="text-center mb-4">Checkout</h2>
        <Row>
          <Col md={8}>
            <h4 className="mb-4">Billing Information</h4>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} sm={6} md={6} lg={6} style={{ maxWidth: "300px" }}>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              
                <Col xs={12} sm={6} md={6} lg={6} style={{ maxWidth: "300px" }}>
                  <Form.Group controlId="formPhone" className="mb-3">
                    <Form.Label>Phone Number*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3" style={{ maxWidth: "600px" }}>
                <Col xs={12} sm={6}>
                  <Form.Group controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your city name"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                
                <Col xs={12} sm={6}>
                  <Form.Group controlId="formZip">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your city zip code"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>


              <Form.Group controlId="formAddress" className="mb-3" style={{ maxWidth: "600px" }}>
                <Form.Label>Address*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            
              <Form.Group controlId="formEmail" className="mb-3" style={{ maxWidth: "600px" }}>
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPaymentMethod" className="mb-3" style={{ width: "900px" }}>
              <div className="d-flex align-items-center">
                <Form.Label>Payment Method*</Form.Label>
                  <Form.Control
                    as="select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ width: "150px", justifyContent:"center"}}
                  >
                    <option value="creditCard">Cash On Delivery</option>
                    <option value="paypal">Easy Paisa</option>
                  </Form.Control>

                  {paymentMethod === "paypal" && (
                    <Form.Group controlId="formPhoneNumber" className="mt-3 ms-3" style={{ width: "240px" }}>
                      <Form.Control
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your Easy Paisa number"
                      />
                    </Form.Group>
                  )}
              </div>
              </Form.Group>


              <Button variant="success" type="submit" style={{ width: "300px" }}>
                Place Order
              </Button>
            </Form>
          </Col>

          <Col md={4}>
            <h4 className="mb-4">Order Summary</h4>
            <ul className="list-group">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item">
                  {item.name} - {item.quantity} x {item.price}
                </li>
              ))}
            </ul>
            <h5 className="mt-3">Total: $ {calculateTotal()}</h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckoutPage;
