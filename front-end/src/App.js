import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./CartContext";
import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactUs";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/Category";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage"; 
import products from './Data/Products';
import EcommerceNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const filteredProducts = products.filter((product) =>
      product.keywords.some((keyword) =>
        keyword.toLowerCase().includes(term.toLowerCase())
      )
    );
    setSearchResults(filteredProducts);
  };

  return (
    <CartProvider>
      <Router>
        <EcommerceNavbar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;