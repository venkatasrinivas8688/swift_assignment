import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState({ name: "", profileLogo: "" });
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) =>
        setUser({
          name: data.name,
          profileLogo: getInitials(data.name),
        })
      );
  }, []);
  const getInitials = (name) => {
    const words = name.trim().split(" ");
    return words.map((word) => word[0].toUpperCase()).join("");
  };
  return (
    <header className="top-bar">
      <img src="/swift.jpeg" alt="swift" className="swift-img" />
      <Link to="/profile" className="link">
        <div className="profile">
          <div className="circle">{user.profileLogo}</div>
          <div className="profile-info">
            <p className="profile-name">{user.name}</p>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default Header;
