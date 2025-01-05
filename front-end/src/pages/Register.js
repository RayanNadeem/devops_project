import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Import the same CSS file used for Login

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/Users/register", formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <form className="login-form shadow" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Register</h2>
        <div className="form-group mb-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
