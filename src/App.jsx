import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Feed, Login, Profile, Signup, Bookmark, Explore } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </div>
  );
}

export default App;
