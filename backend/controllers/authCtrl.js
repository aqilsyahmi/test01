const User = require("../models/userModel");
const Token = require("../models/resetTokenModel");
const { createSecretToken } = require("../util/secretToken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

/* sign up an account */
module.exports.signupCtrl = async (req, res) => {
  const { username, email, password, createdAt } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ errorMessage: "User already exists" });
    }

    const user = await User.create({ username, email, password, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({
        successMessage: "User signed up successfully",
        success: true,
        user,
      });
  } catch (error) {
    console.error(error);
  }
};

/* login to an existing account */
module.exports.loginCtrl = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    //if field empty
    if (!email || !password) {
      return res.json({ errorMessage: "All fields are required" });
    }

    //if user not exist
    if (!user) {
      return res.status(400).json({ errorMessage: "Incorrect credentials" });
    }

    //if password not match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errorMessage: "Invalid credentials" });
    }

    //token
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({
      successMessage: "User logged in successfully",
      success: true,
      token,
      userId: user._id,
      username: user.username,
      userrole: user.role,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};

/* check if email account is registered */
module.exports.checkExistCtrl = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });

    if (user) {
      // Email exists
      return res.json({ exists: true });
    } else {
      // Email does not exist
      return res.json({ exists: false });
    }
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while checking the email." });
  }
};

function generatePasswordResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

/* sending email */
module.exports.sendEmailCtrl = async (req, res) => {
  const { email } = req.body;

  try {
    const yourGeneratedToken = generatePasswordResetToken();

    saveTokenCtrl(yourGeneratedToken, email);
    const transporter = nodemailer.createTransport({
      service: "Outlook",
      auth: {
        user: process.env.SYSTEM_EMAIL,
        pass: process.env.SYSTEM_PASS,
      },
    });

    const resetLink = `http://localhost:3000/resetpw?token=${yourGeneratedToken}`;

    const mailOptions = {
      from: process.env.SYSTEM_EMAIL,
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while checking the email." });
  }
};

async function saveTokenCtrl(yourGeneratedToken, userEmail) {
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 30); // Set an expiration time (30 minutes from now)

  try {
    // Check if a token record already exists for the user's email
    const existingToken = await Token.findOne({ email: userEmail });

    if (!existingToken) {
      // If no record exists, create a new one
      const newToken = await Token.create({
        email: userEmail,
        resetToken: yourGeneratedToken,
        resetTokenExpiration: expiration,
      });
      return newToken;
    } else {
      // If a record exists, update it with the new token and expiration
      existingToken.resetToken = yourGeneratedToken;
      existingToken.resetTokenExpiration = expiration;
      await existingToken.save();
      return existingToken;
    }
  } catch (error) {
    // Handle errors appropriately
    console.error('Error saving token:', error);
  }
}// Function to update the password

module.exports.updatePwCtrl = async (req, res) => {

  const { token, password } = req.body;
  try {
    // Retrieve the email from the Token collection based on the provided token
    const tokenData = await Token.findOne({ resetToken: token });

    if (!tokenData) {
      return res.status(400).json({ errorMessage: "Invalid or expired token" });
    }

    // Check if the token has expired
    const resetTokenExpiration = new Date(tokenData.resetTokenExpiration);
    const currentDateTime = new Date();

    if (resetTokenExpiration < currentDateTime) {
      return res.status(400).json({ errorMessage: "Token has expired" });
    }

    // Find the user in the User collection using the retrieved email
    const user = await User.findOne({ email: tokenData.email });

    if (!user) {
      return res.status(400).json({ errorMessage: "User not found" });
    }

    // Update the user's password in the User collection
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate(
      { email: tokenData.email },
      { password: hashedPassword }
    );

    // Once the password is updated, delete or invalidate the token in the Token collection
    await Token.deleteOne({ resetToken: token });

    res.status(200).json({ successMessage: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Server error" });
  }
};
