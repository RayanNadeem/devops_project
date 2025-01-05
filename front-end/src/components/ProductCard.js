import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`); //tempelate literals
  };

  return (
    <Card
      className="m-3"
      style={{
        width: "400px",
        textAlign: "center",
        cursor: "pointer",
        transition: "transform 0.3s",
      }}
      onClick={handleCardClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "200px",
            height: "250px",
            objectFit: "cover",
          }}
        />
      </div>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price}</Card.Text>
        <Button variant="success" onClick={(e) => {
          e.stopPropagation();
          handleAddToCart();
        }}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
