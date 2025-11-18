import React, { useState, useEffect } from "react";
import "./styles/Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [uniqueId, setUniqueId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const btnText = "Register";

  useEffect(() => {
    if (crypto?.randomUUID) {
      setUniqueId(crypto.randomUUID());
    } else {
      setUniqueId("00000000-0000-0000-0000-000000000000");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("User Registration Data:", formData);
    console.log("Assigned ID:", uniqueId);
    console.log("Uploaded Image:", imageFile);

    // TODO: API call
  };

  return (
    <div className="register-container">

      {/* Box with Title + Unique ID */}
      <div className="child-container">
        <h1 className="neon-title">SYSTEM REGISTER</h1>

        <div className="unique-id-display">
          <span>ASSIGNED USER ID:</span>
          <span className="id-value">{uniqueId}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        {/* IMAGE UPLOAD */}
        <label className="file-upload-label">
          USER IMAGE
          <input
            type="file"
            accept="image/*"
            className="file-input"
            onChange={handleImageChange}
          />
        </label>

        {previewURL && (
          <div className="image-preview-box">
            <img src={previewURL} className="preview-img" />
          </div>
        )}

        {/* NAME */}
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

        {/* EMAIL */}
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

        {/* PASSWORD */}
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

        <button type="submit" className="submit-button">
          {btnText}
        </button>

        <p>
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
