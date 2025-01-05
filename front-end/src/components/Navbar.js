import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button, NavDropdown, Badge } from "react-bootstrap";
import logoaqr from "../Images/logoaqr.png";
import { useCart } from "../CartContext";
import "./Navbar.css";

const EcommerceNavbar = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      navigate("/");
      return;
    }
    navigate(`/search?query=${searchTerm}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user details from the backend (for example, to get the username)
      fetch("/api/Users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoggedIn(true);
          setUsername(data.username || "User");
        })
        .catch(() => {
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  return (
    <Navbar expand="lg" className="shadow-sm px-5">
      <Navbar.Brand as={Link} to="/">
        <img
          src={logoaqr}
          alt="Ecommerce Logo"
          style={{ width: "150px", height: "70px" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form
          className="d-flex mx-auto"
          style={{ width: "50%" }}
          onSubmit={handleSearch}
        >
          <FormControl
            type="search"
            placeholder="Search for products"
            className="me-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search"
          />
          <Button className="navbar-button" type="submit">
            Search
          </Button>
        </Form>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/categories/sports">Sports</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/categories/wears">Wears</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/categories/nets">Nets</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          <Nav.Link as={Link} to="/cart">
            <i className="bi bi-cart"></i> Cart 
            {totalItems > 0 && <Badge bg="secondary" className="ms-1">{totalItems}</Badge>}
          </Nav.Link>
          {isLoggedIn ? (
            <NavDropdown title={username} id="user-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default EcommerceNavbar;
