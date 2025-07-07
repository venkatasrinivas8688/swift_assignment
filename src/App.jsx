import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Comments from "./pages/comments";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Comments />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
