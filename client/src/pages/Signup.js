
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; // Custom CSS

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '',
    college: '', branch: '', semester: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = `${form.firstName} ${form.lastName}`;
    const payload = {
      name: fullName,
      email: form.email,
      password: form.password,
      college: form.college,
      branch: form.branch,
      semester: form.semester
    };
  
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      const data = await res.text();
      if (res.ok) alert('Signup Successful');
      else alert(data);
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong');
    }
  };
  

  // Step checker
  const stepCompleted = {
    1: form.firstName && form.lastName,
    2: form.email,
    3: form.password,
    4: form.college && form.branch && form.semester,
  };

  return (
    <div className="signup-container">
      {/* Left - Form */}
      <div className="signup-form">
        <div className="form-box">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            </div>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="college" placeholder="College" onChange={handleChange} required />
            <input type="text" name="branch" placeholder="Branch" onChange={handleChange} required />
            <input type="number" name="semester" placeholder="Semester" onChange={handleChange} required />
            <button type="submit">Sign Up</button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      {/* Right - Gradient + Steps */}
      <div className="signup-steps">
        <div className="welcome-text">
          <h1>Welcome to<br /> <span>student portal</span></h1>
          <p>Create your account to get started</p>
        </div>

        <div className="steps">
          {[
            'Enter Name',
            'Provide Email',
            'Set Password',
            'College Info',
          ].map((step, index) => {
            const isActive = stepCompleted[index + 1] || (index === 4 && Object.values(stepCompleted).every(Boolean));
            return (
              <div key={index} className={`step ${isActive ? 'completed' : ''}`}>
                <div className="circle">
                  {isActive ? <span>&#10003;</span> : index + 1}
                </div>
                <p>{step}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Signup;
