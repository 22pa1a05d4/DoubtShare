import React from 'react';
import './FeedNavbar.css';

const FeedNavbar = () => {
  return (
    <div className="feed-navbar">
      <div className="left-section">
        <input type="text" className="search-input" placeholder="Search" />
      </div>
      <div className="right-section">
        <div className="nav-icon">My Network</div>
        <div className="nav-icon">Messaging</div>
        <div className="nav-icon">Notifications</div>
        <div className="nav-icon">My Posts</div>
        <div className="profile-icon">B</div>
      </div>
    </div>
  );
};

export default FeedNavbar;
