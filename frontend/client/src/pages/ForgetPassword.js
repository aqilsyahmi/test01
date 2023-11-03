import React, { useState } from "react";
import { checkExist,sendEmail } from "../api/auth";

const ForgetPassword = () => {
  const [message, setMessage] = useState({ errorMsg: "" });

  const initialFormData = {
    email: "",
  };

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault(); // Prevent the default form submission behavior
  
    checkExist(formData)
      .then((response) => {
        const { exists } = response.data;
        if (exists) {
          sendEmail(formData).then((response)=>{})
          alert("Please check your email.");
        } else {
          alert("User doesn't exist, please enter a valid email.");
        }
      })
      .catch((err) => {
        setMessage({ errorMsg: err.response.data.errorMessage });
      });
  };
  

  const [formData, setFormData] = useState(initialFormData);
  const showResetForm = () => (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* Email */}
      <h4 className="text-center">Password reset</h4>
      <p>You will receive instructions for reseting your password.</p>

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

      {/* Login button */}
      <div className="text-center form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Send
        </button>
      </div>
    </form>
  );

  return <div className="login-container">{showResetForm()}</div>;
};

export default ForgetPassword;
