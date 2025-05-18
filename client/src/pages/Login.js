


import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate =useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      const data = await res.json();

if (res.ok) {
  localStorage.setItem("userEmail", data.email);
  navigate('/hom');
} else {
  alert(data.message || 'Login failed');
  console.error('Server error:', data);
}

    } catch (err) {
      alert('Something went wrong');
      console.error('Network error:', err);
    }
  };
  
  

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="login-left">
        <div className="login-box">
          <h2>Login</h2>
          <p>Enter your account details</p>
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <div className="password-wrapper">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '👁️' : '🙈'}
              </span>
            </div>
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="login-button">Login</button>
            <div className="signup-text">
              Don’t have an account? <a href="/signup">Sign up</a>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        
        <img src="/login.png" alt="Login visual" />
      </div>
    </div>
  );
};

export default Login;
