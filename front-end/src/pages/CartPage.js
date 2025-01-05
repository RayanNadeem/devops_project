import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d.-]/g, ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };
  

  return (
    <div  style={{ backgroundColor: "#8aee8a"}}>
      <Container className="py-5">
        <h2 className="text-center mb-4">Your Cart</h2>
        {cartItems.length > 0 ? (
          <>
            <Row>
              {cartItems.map((item) => (
                <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                  <div className="card" style={{ width: "18rem", margin: "10px" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Price: {item.price}</p>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <div className="text-center mt-4">
                <h4>Total: $ {calculateTotal()}</h4>
                <Link to="/checkout">
                    <Button variant="success" className="me-3">Checkout</Button>
                </Link>
                <Button variant="danger" onClick={clearCart}>Clear Cart</Button>
            </div>
          </>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </Container>
    </div>
  );
};

export default CartPage;