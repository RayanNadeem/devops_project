import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import products from "../Data/Products";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  return (
    <Container className="mt-5 py-5">
      <h2 className="text-center mb-4">Products Catalogue</h2>
      <Row className="justify-content-center">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductGrid;