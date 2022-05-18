import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Feed, Profile, Bookmark, Explore } from "./pages";
import { Login, Signup } from "./feature";
import { Navbar } from "./components";
import { ProtectedRoute } from "./customeHooks/protectedRoute";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmark"
          element={
            <ProtectedRoute>
              <Bookmark />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
