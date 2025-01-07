import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactUs";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/Category";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import products from './Data/Products';
import EcommerceNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from './context/AuthContext';
import Profile from "./pages/Profile";
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

    const filteredProducts = products.filter((product) => {
      const category = product.category || "";
      if (typeof category === "string") {
        return category.toLowerCase().includes(term.toLowerCase());
      }
      return false;
    });

    setSearchResults(filteredProducts);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <EcommerceNavbar onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage searchResults={searchResults} />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/categories/:category" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product/:id" element={<ProductDetails products={products} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
