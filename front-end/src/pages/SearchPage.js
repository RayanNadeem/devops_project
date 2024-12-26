import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import products from "../Data/Products";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const filteredProducts = products.filter((product) =>
        product.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div style={{ backgroundColor: "#8aee8a"}} >
      <Container className="py-5">
        <h2 className="text-center mb-4">Search Results for "{searchTerm}"</h2>
        <Row className="justify-content-center">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
            <Col
              key={product.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex justify-content-center"
            >
              <div className="card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price}</p>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <p>No results found. Try a different keyword.</p>
          </Col>
        )}
        </Row>
      </Container>
    </div>
  );
};

export default SearchPage;