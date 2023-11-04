import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuthentication, isAuthenticated } from "../helpers/auth";
import { login } from "../api/auth";
import isEmail from "validator/lib/isEmail";
import DOMPurify from "dompurify"; // Import DOMPurify
import ReCAPTCHA from "react-google-recaptcha"; // Import ReCAPTCHA

const Login = () => {
  const navigate = useNavigate();

  // State variable to track reCAPTCHA completion
  const [isCaptchaCompleted, setIsCaptchaCompleted] = useState(false);

  useEffect(() => {
    // ... Your existing useEffect logic for redirection
  }, []);

  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState({ errorMsg: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    // Sanitize the input using DOMPurify
    setFormData({
      ...formData,
      [name]: DOMPurify.sanitize(value),
      errorMsg: "",
    });
  };

  const handleRecaptchaChange = (token) => {
    // Set isCaptchaCompleted to true when reCAPTCHA is completed
    setIsCaptchaCompleted(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isCaptchaCompleted) {
      if (validateForm()) {
        setLoading(true);
        login(formData)
          .then((response) => {
            const { userId, username, userrole } = response.data;
            setMessage({ successMsg: response.data.successMessage, errorMsg: "" });
            setFormData(initialFormData);
            setLoading(false);

            // Call setAuthentication with correct arguments
            setAuthentication(response.data.token, { userId, username, userrole });

            // Check if the user is authenticated and has a role of "admin"
            if (isAuthenticated() && isAuthenticated().userrole === "admin") {
              navigate("/admin/dashboard"); // Redirect logic for admin dashboard
            } else if (isAuthenticated() && isAuthenticated().userrole === "staff") {
              navigate("/staff/dashboard"); // Redirect logic for admin dashboard
            } else if (isAuthenticated()) {
              navigate("/user/dashboard"); // Redirect logic for user dashboard
            } else {
              console.log('User not authenticated');
              // Handle unauthenticated user
            }

            // Handle successful login here
            console.log("Login successful");
          })
          .catch((err) => {
            setMessage({ errorMsg: err.response.data.errorMessage });
            setLoading(false);
          });
      }
    } else {
      setMessage({ errorMsg: "Please complete the reCAPTCHA" });
    }
  };

  const validateForm = () => {
    const { email, password } = formData;

    // Client-side validation
    if (!email || !password) {
      setMessage({ errorMsg: "All fields are required" });
      return false;
    }

    if (!isEmail(email)) {
      setMessage({ errorMsg: "Invalid email" });
      return false;
    }

    return true;
  };

  const showLoginForm = () => (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* Email */}
      <div className="form-group input-group">
        <input
          name="email"
          value={formData.email}
          className="form-control"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        ></input>
      </div>

      {/* Password */}
      <div className="form-group input-group">
        <input
          name="password"
          value={formData.password}
          className="form-control"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        ></input>
      </div>

      {/* CAPTCHA widget */}
      <div className="form-group">
        <ReCAPTCHA
          sitekey="6LdK3-8oAAAAAKEsjhkGJ1LrBdQsGSwd8-bE-Taz" // Replace with your actual reCAPTCHA site key
          onChange={handleRecaptchaChange}
        />
      </div>

      {/* Login button */}
      <div className="text-center form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </div>

      {/* Don't have an account */}
      <p className="text-center">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
      <p className="text-center">
        Forgot Password? <Link to="/forgetpw">Reset Password</Link>
      </p>
    </form>
  );

  return (
    <div className="login-container">
      <h2 className="text-center">Login</h2>
      {message.errorMsg && <div className="error-message">{message.errorMsg}</div>}
      {loading && <div className="text-center pb-4">Loading...</div>}
      {showLoginForm()}
    </div>
  );
};

export default Login;
