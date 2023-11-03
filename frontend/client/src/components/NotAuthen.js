import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotAuthenticated = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Redirect to the login page after 3 seconds
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      clearInterval(timer);
      navigate('/login'); // Update '/login' with the correct login page route
    }, 3000);

    // Clear timers when the component unmounts
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h2>Access Denied</h2>
          <p>You are not authenticated to access this page.</p>
          <p>Redirecting to login page in {countdown} seconds...</p>
        </div>
      </div>
    </div>
  );
};

export default NotAuthenticated;
