import React, { useState, useEffect } from "react";
import { updatePassword } from "../api/auth";

const ResetPassword = () => {
  const [message, setMessage] = useState({ errorMsg: "" });
  const initialFormData = {
    token: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    formData.token = token;
  }, []);

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault(); // Prevent the default form submission behavior

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!formData.password) {
      setMessage({ successMsg: "", errorMsg: "Please enter password!" });
      return false;
    }

    if (formData.password.length < 8) {
      setMessage({
        successMsg: "",
        errorMsg: "Password must be at least 8 characters long",
      });
      return false;
    }

    if (!formData.password.match(passwordRegex)) {
      setMessage({
        successMsg: "",
        errorMsg:
          "Password must contain at least one lowercase letter, one uppercase letter, and one digit",
      });
      return false;
    }

    // Create an object with the token and password
    const data = {
      token: formData.token,
      password: formData.password,
    };

    // Call the updatePassword function with the data
    try {
      return await updatePassword(data)
        .then((response) => {
          setMessage({
            successMsg: response.data.successMessage,
            errorMsg: "",
          });
          setFormData(initialFormData);
        })
        .catch((err) => {
          setMessage({
            successMsg: "",
            errorMsg: err.response.data.errorMessage,
          });
        });
      // Handle the response here, e.g., display a success message or redirect the user
    } catch (error) {
      setMessage({
        errorMsg: "An error occurred while updating the password.",
      });
    }
  };

  const newPwForm = () => (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* password */}
      <h4 className="text-center">Password reset</h4>
      <p>Please enter your new password</p>
      {message.successMsg && (
        <div className="success-message">{message.successMsg}</div>
      )}
      {message.errorMsg && (
        <div className="error-message">{message.errorMsg}</div>
      )}

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

      {/* Login button */}
      <div className="text-center form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Send
        </button>
      </div>
    </form>
  );

  return <div className="login-container">{newPwForm()}</div>;
};

export default ResetPassword;
