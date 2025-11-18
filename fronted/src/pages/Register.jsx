import React, { useState, useEffect } from "react";
import "./styles/Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // State for the generated unique ID
  const [uniqueId, setUniqueId] = useState('');
  const btnText = "Register";

  // Generate unique ID when the component loads
  useEffect(() => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      setUniqueId(crypto.randomUUID());
    } else {
      setUniqueId('00000000-0000-0000-0000-000000000000');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registration Data: ", formData, 'Assigned ID:', uniqueId);
    // Add API call logic here
  };

  return (
    <div className="register-container">
      {/* Central Content Box */}
      <div className="child-container"> 
        <h1 className="neon-title">SYSTEM REGISTER</h1> 
        
        {/* Display the Generated Unique ID */}
        <div className="unique-id-display">
          <span>ASSIGNED USER ID:</span> 
          <span className="id-value">{uniqueId}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* Name Input - htmlFor is correct */}
        <label htmlFor="name-input">
          NAME
          <input
            type="text"
            name="name"
            id="name-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        
        {/* Email Input - htmlFor fixed */}
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
        
        {/* Password Input - htmlFor fixed */}
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
        
        {/* Submit Button - Replaced <input> with <button> */}
        <button type="submit" className="submit-button">
          {btnText}
        </button>
        
        <p>
          Already have an account?
          <Link to="/login">Login</Link>
        </p>{" "}
      </form>
    </div>
  );
};

export default Register;