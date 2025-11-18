import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Login.css"; // <-- Ensure you import the correct CSS file

const Login = () => {
  // 1. Initial State: Only needs email and password for login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const btnText = "Login";

  // 2. Handler to update state based on input 'name' attribute
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Login Data: ", formData);
    // Add your authentication/API call logic here
    alert(`Attempting login for: ${formData.email}`);
  };

  return (
    // Outer container for full-screen centering
    <div className="container">
      {/* Inner container to hold form content and apply style box */}
      <div className="child-container"> 
        
        {/* Title with Neon Glow CSS class */}
        <h1 className="neon-title">SYSTEM LOGIN</h1>
        
        {/* Placeholder for the unique ID (like in the Register component) */}
        <p className="uniqueId">STATUS: AUTH_INIT</p>
        
        <form onSubmit={handleSubmit}>
          
          {/* Email Input */}
          {/* Label's htmlFor matches Input's id for accessibility */}
          <label htmlFor="email-input"> 
            EMAIL
            <input
              type="email"
              name="email"
              id="email-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          
          {/* Password Input */}
          <label htmlFor="password-input"> 
            PASSWORD
            <input
              type="password"
              name="password"
              id="password-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          
          {/* Submit Button - Uses the submit-button class for neon style */}
          <button type="submit" className="submit-button">
            {btnText}
          </button>
          
          {/* Navigation Link */}
          <p>
            You haven't an account?
            <Link to="/register">Register</Link>
          </p>
          
        </form>
      </div>
    </div>
  );
};

export default Login;