import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, Login, Signup } from "./pages";
import { Navbar, LeftSideBar, RightSideBar } from "./components";

function App() {
  return (
    <div className="App">
      <Navbar />
      <LeftSideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
      <RightSideBar />
    </div>
  );
}

export default App;
