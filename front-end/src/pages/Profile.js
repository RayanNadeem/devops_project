<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./Login"; 

const Profile = () => {
  const { user } = useAuth();  
  const [profileData, setProfileData] = useState({ name: "", email: "" });

  useEffect(() => {
     
=======
// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./Login"; // You can style this page as needed

const Profile = () => {
  const { user } = useAuth(); // Get user data from AuthContext
  const [profileData, setProfileData] = useState({ name: "", email: "" });

  useEffect(() => {
    // If you want to fetch the profile data from the backend (optional)
>>>>>>> 22b99b41c5e0b93e6efba96dde9ad41a35c0b378
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/Users/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
<<<<<<< HEAD
        setProfileData(response.data); 
=======
        setProfileData(response.data); // Assuming response has the name and email
>>>>>>> 22b99b41c5e0b93e6efba96dde9ad41a35c0b378
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (user) {
<<<<<<< HEAD
      setProfileData({ name: user.username, email: user.email }); 
      fetchProfileData(); 
=======
      setProfileData({ name: user.username, email: user.email }); // Default to the logged-in user's data
      fetchProfileData(); // Optionally fetch from the backend
>>>>>>> 22b99b41c5e0b93e6efba96dde9ad41a35c0b378
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="text-center">Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {profileData.name}</p>
<<<<<<< HEAD
        <p><strong></strong> {profileData.email}</p>
=======
        <p><strong>Email:</strong> {profileData.email}</p>
>>>>>>> 22b99b41c5e0b93e6efba96dde9ad41a35c0b378
      </div>
    </div>
  );
};

export default Profile;
