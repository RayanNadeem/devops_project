import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart, cartMessage } = useCart();

  useEffect(() => {
    console.log("cartMessage updated:", cartMessage);
  }, [cartMessage]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (!product) return <h2>Product not found!</h2>;

  return (
    <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#8aee8a", padding: "20px" }}>
      {cartMessage && (
        <div className="cart-message">
          <Alert variant="success" className="text-center m-0">
            {cartMessage}
          </Alert>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1, paddingRight: "20px" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </div>
        <div style={{ flex: 2 }}>
          <h2>{product.name}</h2>
          <strong>Description:</strong>
          <p>High quality product available with one year warranty. Seven day fast delivery</p>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>Availability:</strong> {"In Stock"}</p>
          <Button variant="success" onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
          }}>
              Add to Cart
          </Button>
          <p>**Returns will be entertained within 3 days only**</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
