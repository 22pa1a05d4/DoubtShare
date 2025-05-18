import React from 'react';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">E-Learning</div>
    <ul className="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/">Course</a></li>
      <li><a href="/">About Us</a></li>
      <li><a href="/">Contact Us</a></li>
    </ul>
    <a href="/login" className="sign-in">Login/Signup</a>
  </nav>
);

export default Navbar;
