import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../App.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  const getInitials = (name) => {
    const words = name.trim().split(" ");
    return words.map((word) => word[0].toUpperCase()).join("");
  };
  console.log(user);
  if (!user)
    return (
      <div className="loading-card">
        <p className="loading-para">Loading...</p>
      </div>
    );
  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <Link to="/">
            <button className="back-arrow">&#8592;</button>
          </Link>
          <h2>Welcome, {user.username}</h2>
        </div>

        <div className="profile-content">
          <div className="profile-box">
            <div className="avatar">{getInitials(user.name)}</div>
            <div className="info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-details-form">
            <div className="form-group">
              <label>User ID</label>
              <div className="form-value">{user.id}</div>
            </div>
            <div className="form-group">
              <label>Name</label>
              <div className="form-value">{user.name}</div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <div className="form-value">{user.email}</div>
            </div>
            <div className="form-group">
              <label>Phone</label>
              <div className="form-value">{user.phone}</div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <div className="form-value">
                {user.address.street}, {user.address.city},{" "}
                {user.address.zipcode}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
