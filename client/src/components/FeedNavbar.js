

import React, { useState, useEffect } from 'react';
import './FeedNavbar.css';

const FeedNavbar = () => {
  const userEmail = localStorage.getItem('userEmail');
  const defaultAvatar = '/avatar.png';

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(defaultAvatar);

  // Load photo from localStorage when component mounts
  useEffect(() => {
    if (userEmail) {
      const savedPhoto = localStorage.getItem(`profilePhoto-${userEmail}`);
      if (savedPhoto) {
        setProfilePhoto(savedPhoto);
      }
    }
  }, [userEmail]);

  // Update localStorage whenever profilePhoto changes
  useEffect(() => {
    if (userEmail && profilePhoto !== defaultAvatar) {
      localStorage.setItem(`profilePhoto-${userEmail}`, profilePhoto);
    }
  }, [profilePhoto, userEmail]);

  // Handle new photo upload
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result); // base64
        setProfileMenuOpen(false);
      };
      reader.readAsDataURL(file); // convert to base64
    }
  };

  // Handle photo removal
  const handleRemovePhoto = () => {
    setProfilePhoto(defaultAvatar);
    localStorage.removeItem(`profilePhoto-${userEmail}`);
    setProfileMenuOpen(false);
  };

  return (
    <div className="feed-navbar">
      <div className="left-section">
        <input type="text" className="search-input" placeholder="Search" />
      </div>

      <div className="right-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div className="nav-icon">My Network</div>
        <div className="nav-icon">Messaging</div>
        <div className="nav-icon">Notifications</div>
        <div className="nav-icon">My Posts</div>

        {/* Profile Photo with Dropdown Menu */}
        <div style={{ position: 'relative' }}>
          <img
            src={profilePhoto}
            alt="Profile"
            style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          />

          {profileMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '50px',
                right: 0,
                backgroundColor: 'white',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                borderRadius: '8px',
                padding: '10px',
                zIndex: 1000,
                width: '160px',
              }}
            >
              <label
                htmlFor="newProfileInput"
                style={{
                  display: 'block',
                  padding: '8px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                  color: '#333',
                }}
              >
                New Profile Photo
              </label>
              <input
                type="file"
                id="newProfileInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />

              <button
                style={{
                  marginTop: '8px',
                  padding: '8px',
                  width: '100%',
                  cursor: 'pointer',
                  backgroundColor: '#f44336',
                  border: 'none',
                  color: 'white',
                  borderRadius: '4px',
                }}
                onClick={handleRemovePhoto}
              >
                Remove Profile Photo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedNavbar;
