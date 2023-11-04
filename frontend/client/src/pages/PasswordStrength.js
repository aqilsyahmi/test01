import React from "react";
import "./PasswordStrength.css";

const PasswordStrengthMeter = ({ password }) => {
  const calculatePasswordStrength = (password) => {
    const length = password.length;
    let strength = 0;

    if (length >= 8) {
      strength += 25;
    }
    if (length >= 12) {
      strength += 25;
    }

    // Check for symbols in the password
    if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-/]/.test(password)) {
      strength += 25;
    }

    // Include additional criteria here

    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength >= 75) {
      return "green";
    } else if (strength >= 50) {
      return "orange";
    } else {
      return "red";
    }
  };

  const strength = calculatePasswordStrength(password);
  const color = getPasswordStrengthColor(strength);

  return (
    <div className="password-strength-meter">
      <div
        className="strength-bar"
        style={{ width: `${strength}%`, backgroundColor: color }}
      ></div>
      <div className="strength-text">Password Strength</div>
    </div>
  );
};

export default PasswordStrengthMeter;
