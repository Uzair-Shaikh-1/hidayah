import React from "react";
import Login from "./login/Login";
import Register from "./register/Register";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./Dashboard/AdminDashboard.jsx/AdminDashboard";
import User from "./Dashboard/user/User";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
