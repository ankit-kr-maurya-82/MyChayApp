import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    avatar: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const btnText = "Login";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, avatar: file });

    // Show preview
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);
    alert("Login submitted!");
  };

  return (
    <div className="container">
      <div className="child-container">
        <h1 className="neon-title">SYSTEM LOGIN</h1>

        <p className="uniqueId">STATUS: AUTH_INIT</p>

        <form onSubmit={handleSubmit}>

          {/* Email */}
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

          {/* Password */}
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


          {/* IMAGE PREVIEW */}
          {previewImage && (
            <div className="image-preview-box">
              <img src={previewImage} alt="preview" className="preview-img" />
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="submit-button">
            {btnText}
          </button>

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
