// src/pages/Profile.js
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/Users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUserDetails(data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <ul>
        <li><strong>Username:</strong> {userDetails.username}</li>
        <li><strong>Email:</strong> {userDetails.email}</li>
        <li><strong>Password:</strong> {userDetails.password}</li>
      </ul>
    </div>
  );
};

export default Profile;
