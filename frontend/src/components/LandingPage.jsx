import React, { useEffect } from "react";
import Navbar from "../Components/Navbar.js";
import { useNavigate } from "react-router-dom";
import "../App.css";

const LandingPage = () => {
  const studentId = localStorage.getItem("Id"); // Retrieve student ID from localStorage
  const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Redirect to home if the user is not logged in
    if (!token || !studentId) {
      navigate("/"); // Redirect to the home page if not logged in
    }
  }, [token, studentId, navigate]); // Dependencies to watch for changes

  return (
    <>
      <Navbar />
      <div className="landing-page">
        <div className="overlay">
          <h1>Updating Faculty Details:</h1>
        </div>
      </div>
      <footer className="footer">
        <p>Developed By Aayushi Prajapati</p>
      </footer>
    </>
  );
};

export default LandingPage;
