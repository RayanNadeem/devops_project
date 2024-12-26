import React from "react";
import { Card, Button } from "react-bootstrap";
import { useCart } from "../CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); 

  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <Card className="m-3" style={{ width: "300px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
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
        <Button variant="success" onClick={handleAddToCart}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;