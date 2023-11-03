import React, { useState } from 'react';
import axios from 'axios';

const AdminAddStaff = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend API endpoint to create a new staff account
      const response = await axios.post('/api/admin/staff', formData, {
        headers: {
          'Content-Type': 'application/json',
          // Include authentication token if required
        },
      });

      // Handle the response as needed (show success message, reset form, etc.)
      console.log(response.data);
    } catch (error) {
      // Handle error response (display error message, etc.)
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Add New Staff</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Create Staff Account</button>
      </form>
    </div>
  );
};

export default AdminAddStaff;
