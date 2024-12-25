import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const SearchResults = ({ searchResults }) => {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate("/");
      };
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Search Results</h2>
      <Row className="justify-content-center">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <p className="text-center">Try a different keyword.</p>
        )}
      </Row>
      <div className="text-center mt-4">
        <Button variant="secondary" onClick={goToHomePage}>Back to Homepage</Button>
      </div>
    </Container>
  );
};

export default SearchResults;