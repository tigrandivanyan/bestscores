import React, { useState } from 'react';
import './Register.scss';
import logo from '../images/logo.png';
import { request } from '../request';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request.post("/user/", {
        email,
        password
      });
      setShowCodeInput(true); // switch to code input after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      await request.post("/user/verification", {
        code: code
      });
      setShowCodeInput(false);
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 400) {
        alert("Invalid verification code. Please try again.");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <img src={logo} alt="BestScores Logo" className="register-logo" />
        <h2 className="register-title">Register</h2>

        {!showCodeInput ? (
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit" className="register-button">Register</button>
          </form>
        ) : (
          <div className="code-verification-form">
            <p className="code-message">We sent a code to <strong>{email}</strong>. Please check it in spam</p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              className="code-input"
            />
            <button onClick={handleVerifyCode} className="verify-button">Verify Code</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
