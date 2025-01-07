import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./Login"; 

const Profile = () => {
  const { user } = useAuth();  
  const [profileData, setProfileData] = useState({ name: "", email: "" });

  useEffect(() => {
     
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/Users/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfileData(response.data); 
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (user) {
      setProfileData({ name: user.username, email: user.email }); 
      fetchProfileData(); 
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
        <p><strong></strong> {profileData.email}</p>
      </div>
    </div>
  );
};

export default Profile;
