import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/Users/login", formData);
      const { token, username } = response.data;
      login({ token, username }); // Update global auth state
      alert("Login successful");
      navigate("/"); // Redirect to homepage
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <form className="login-form shadow" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Login</h2>
        <div className="form-group mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="register-link">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
