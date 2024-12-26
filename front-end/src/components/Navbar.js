import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from "react-bootstrap";
import logoaqr from "../Images/logoaqr.png";
import "./Navbar.css";

const EcommerceNavbar = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      navigate("/");
      return;
    }
    
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <Navbar expand="lg" className="shadow-sm px-5">
      <Navbar.Brand href="#home">
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
            <NavDropdown.Item as={Link} to="/categories/electronics">Electronics</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/categories/fashion">Fashion</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/categories/beauty">Beauty</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          <Nav.Link as={Link} to="/cart"><i className="bi bi-cart"></i> Cart</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default EcommerceNavbar;
