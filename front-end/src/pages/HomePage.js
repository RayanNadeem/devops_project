import React from "react";
import { Alert } from "react-bootstrap";
import ImageCarousel from "../components/Carousal";
import ProductGrid from "../components/ProductGrid";
import SearchResults from "../components/SearchResults";
import { useCart } from "../CartContext";

const HomePage = ({ searchResults, searchTerm }) => {
  const { cartMessage } = useCart();

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      {searchResults && searchResults.length > 0 ? (
        <SearchResults searchResults={searchResults} searchTerm={searchTerm} />
      ) : (
        <>
          <ImageCarousel />
          <div style={{ backgroundColor: "#8aee8a" }}>
            <ProductGrid />
          </div>
        </>
      )}
      {cartMessage && (
        <div className="cart-message">
          <Alert variant="success" className="text-center m-0">
            {cartMessage}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default HomePage;