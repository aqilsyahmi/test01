import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { isAuthenticated } from "../helpers/auth";
import isEmail from "validator/lib/isEmail";

const Signup = () => {
    const navigate = useNavigate();
    useEffect(() => {
      if (isAuthenticated() && isAuthenticated().userrole === 1) {
        navigate("/admin/dashboard");
      } else if (isAuthenticated() && isAuthenticated().userrole === 0) {
        navigate("/user/dashboard");
      }
    }, []);
  
  const initialFormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState({ successMsg: "", errorMsg: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (validateForm()) {
      setLoading(true);
      signup(formData)
        .then((response) => {
          setMessage({ successMsg: response.data.successMessage, errorMsg: "" });
          setFormData(initialFormData);
          setLoading(false);
        })
        .catch((err) => {
          setMessage({ successMsg: "", errorMsg: err.response.data.errorMessage });
          setLoading(false);
        });
    }
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  
    if (!username || !email || !password || !confirmPassword) {
      setMessage({ successMsg: "", errorMsg: "All fields are required" });
      return false;
    }
  
    if (!isEmail(email)) {
      setMessage({ successMsg: "", errorMsg: "Invalid email" });
      return false;
    }
  
    if (password !== confirmPassword) {
      setMessage({ successMsg: "", errorMsg: "Passwords do not match" });
      return false;
    }
  
    if (password.length < 8) {
      setMessage({ successMsg: "", errorMsg: "Password must be at least 8 characters long" });
      return false;
    }
  
    if (!password.match(passwordRegex)) {
      setMessage({ successMsg: "", errorMsg: "Password must contain at least one lowercase letter, one uppercase letter, and one digit" });
      return false;
    }
  
    if (username.length < 5) {
      setMessage({ successMsg: "", errorMsg: "Username must be at least 5 characters long" });
      return false;
    }
  
    return true;
  };
  

  const showSignupForm = () => (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <input name='username' value={formData.username} className="form-control" placeholder="Username" type='text' onChange={handleChange}></input>
      </div>

      {/*email*/}
      <div className="form-group input-group">
        <input name='email' value={formData.email} className="form-control" placeholder="Email" type='email' onChange={handleChange}></input>
      </div>

      {/*password*/}
      <div className="form-group input-group">
        <input name='password' value={formData.password} className="form-control" placeholder="Create password" type='password' onChange={handleChange}></input>
      </div>

      {/*confirm password*/}
      <div className="form-group input-group">
        <input name='confirmPassword' value={formData.confirmPassword} className="form-control" placeholder="Confirm password" type='password' onChange={handleChange}></input>
      </div>

      {/* Signup button */}
      <div className="text-center form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Signup
        </button>
      </div>

      {/* Don't have an account */}
      <p className="text-center">
        Have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );

  return (
    <div className="signup-container">
      <h2 className="text-center">Sign Up</h2>
      {message.successMsg && <div className="success-message">{message.successMsg}</div>}
      {message.errorMsg && <div className="error-message">{message.errorMsg}</div>}
      {loading && <div className="text-center pb-4">Loading...</div>}
      {showSignupForm()}
    </div>
  );
};
export default Signup;
