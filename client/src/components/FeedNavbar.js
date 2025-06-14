

// import React, { useState, useEffect } from 'react';
// import './FeedNavbar.css';

// const FeedNavbar = () => {
//   const userEmail = localStorage.getItem('userEmail');
//   const defaultAvatar = '/avatar.png';

//   const [profileMenuOpen, setProfileMenuOpen] = useState(false);
//   const [profilePhoto, setProfilePhoto] = useState(defaultAvatar);

//   // Load photo from localStorage when component mounts
//   useEffect(() => {
//     if (userEmail) {
//       const savedPhoto = localStorage.getItem(`profilePhoto-${userEmail}`);
//       if (savedPhoto) {
//         setProfilePhoto(savedPhoto);
//       }
//     }
//   }, [userEmail]);

//   // Update localStorage whenever profilePhoto changes
//   useEffect(() => {
//     if (userEmail && profilePhoto !== defaultAvatar) {
//       localStorage.setItem(`profilePhoto-${userEmail}`, profilePhoto);
//     }
//   }, [profilePhoto, userEmail]);

//   // Handle new photo upload
//   const handlePhotoChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePhoto(reader.result); // base64
//         setProfileMenuOpen(false);
//       };
//       reader.readAsDataURL(file); // convert to base64
//     }
//   };

//   // Handle photo removal
//   const handleRemovePhoto = () => {
//     setProfilePhoto(defaultAvatar);
//     localStorage.removeItem(`profilePhoto-${userEmail}`);
//     setProfileMenuOpen(false);
//   };

//   return (
//     <div className="feed-navbar">
//       <div className="left-section">
//         <input type="text" className="search-input" placeholder="Search" />
//       </div>

//       <div className="right-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//         <div className="nav-icon">My Network</div>
//         <div className="nav-icon">Messaging</div>
//         <div className="nav-icon">Notifications</div>
//         <div className="nav-icon">My Posts</div>

//         {/* Profile Photo with Dropdown Menu */}
//         <div style={{ position: 'relative' }}>
//           <img
//             src={profilePhoto}
//             alt="Profile"
//             style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
//             onClick={() => setProfileMenuOpen(!profileMenuOpen)}
//           />

//           {profileMenuOpen && (
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '50px',
//                 right: 0,
//                 backgroundColor: 'white',
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
//                 borderRadius: '8px',
//                 padding: '10px',
//                 zIndex: 1000,
//                 width: '160px',
//               }}
//             >
//               <label
//                 htmlFor="newProfileInput"
//                 style={{
//                   display: 'block',
//                   padding: '8px',
//                   cursor: 'pointer',
//                   borderBottom: '1px solid #eee',
//                   color: '#333',
//                 }}
//               >
//                 New Profile Photo
//               </label>
//               <input
//                 type="file"
//                 id="newProfileInput"
//                 accept="image/*"
//                 style={{ display: 'none' }}
//                 onChange={handlePhotoChange}
//               />

//               <button
//                 style={{
//                   marginTop: '8px',
//                   padding: '8px',
//                   width: '100%',
//                   cursor: 'pointer',
//                   backgroundColor: '#f44336',
//                   border: 'none',
//                   color: 'white',
//                   borderRadius: '4px',
//                 }}
//                 onClick={handleRemovePhoto}
//               >
//                 Remove Profile Photo
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedNavbar;


 

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; 
// import './FeedNavbar.css';
// const FeedNavbar = () => {
//   const userEmail = localStorage.getItem('userEmail');
//   const defaultAvatar = '/avatar.png';

//   const [profileMenuOpen, setProfileMenuOpen] = useState(false);
//   const [profilePhoto, setProfilePhoto] = useState(defaultAvatar);

//   useEffect(() => {
//     const fetchProfilePhoto = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/auth/profile/${userEmail}`);
//         const data = await res.json();
//         if (data.profilePhoto) {
//           setProfilePhoto(data.profilePhoto);
//           localStorage.setItem(`profilePhoto-${userEmail}`, data.profilePhoto); // optional cache
//         } else {
//           const saved = localStorage.getItem(`profilePhoto-${userEmail}`);
//           if (saved) setProfilePhoto(saved);
//         }
//       } catch (err) {
//         console.error('Error fetching profile photo:', err);
//       }
//     };

//     if (userEmail) fetchProfilePhoto();
//   }, [userEmail]);

//   const handlePhotoChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         const base64 = reader.result;
//         setProfilePhoto(base64);
//         localStorage.setItem(`profilePhoto-${userEmail}`, base64);

//         try {
//           // optional backend update
//           await fetch(`http://localhost:5000/api/profile/photo/update`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email: userEmail, profilePhoto: base64 })
//           });
//         } catch (err) {
//           console.error('Failed to update photo on server');
//         }

//         setProfileMenuOpen(false);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemovePhoto = () => {
//     setProfilePhoto(defaultAvatar);
//     localStorage.removeItem(`profilePhoto-${userEmail}`);
//     setProfileMenuOpen(false);
//     // Optional: Remove from server
//     fetch(`http://localhost:5000/api/profile/photo/remove`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: userEmail })
//     });
//   };

//   return (
//     <div className="feed-navbar">
//       <div className="left-section">
//         <input type="text" className="search-input" placeholder="Search" />
//       </div>

//       <div className="right-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//         <div className="nav-icon">My Network</div>
//         <div className="nav-icon">Messaging</div>
//         <div className="nav-icon">Notifications</div>
//        <div className="nav-icon">
//   <Link to="/my-posts" style={{ textDecoration:'none', color:'inherit' }}>
//     My Posts
//   </Link>
// </div>
       
//         {/* Profile Photo with Dropdown Menu */}
//         <div style={{ position: 'relative' }}>
//           <img
//             src={profilePhoto}
//             alt="Profile"
//             style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
//             onClick={() => setProfileMenuOpen(!profileMenuOpen)}
//           />

//           {profileMenuOpen && (
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '50px',
//                 right: 0,
//                 backgroundColor: 'white',
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
//                 borderRadius: '8px',
//                 padding: '10px',
//                 zIndex: 1000,
//                 width: '160px',
//               }}
//             >
//               <label
//                 htmlFor="newProfileInput"
//                 style={{
//                   display: 'block',
//                   padding: '8px',
//                   cursor: 'pointer',
//                   borderBottom: '1px solid #eee',
//                   color: '#333',
//                 }}
//               >
//                 New Profile Photo
//               </label>
//               <input
//                 type="file"
//                 id="newProfileInput"
//                 accept="image/*"
//                 style={{ display: 'none' }}
//                 onChange={handlePhotoChange}
//               />

//               <button
//                 style={{
//                   marginTop: '8px',
//                   padding: '8px',
//                   width: '100%',
//                   cursor: 'pointer',
//                   backgroundColor: '#f44336',
//                   border: 'none',
//                   color: 'white',
//                   borderRadius: '4px',
//                 }}
//                 onClick={handleRemovePhoto}
//               >
//                 Remove Profile Photo
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedNavbar;




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FeedNavbar.css';

const FeedNavbar = () => {
  const userEmail       = localStorage.getItem('userEmail');
  const defaultAvatar   = '/avatar.png';

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePhoto,     setProfilePhoto]   = useState(defaultAvatar);
  const [notifOpen,        setNotifOpen]      = useState(false);
  const [notifications,    setNotifications]  = useState([]);

  /* ───── fetch profile photo ───── */
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res  = await fetch(`http://localhost:5000/api/auth/profile/${userEmail}`);
        const data = await res.json();
        if (data.profilePhoto) {
          setProfilePhoto(data.profilePhoto);
          localStorage.setItem(`profilePhoto-${userEmail}`, data.profilePhoto);
        } else {
          const cached = localStorage.getItem(`profilePhoto-${userEmail}`);
          if (cached) setProfilePhoto(cached);
        }
      } catch (err) {
        console.error('Photo fetch error', err);
      }
    };
    if (userEmail) fetchPhoto();
  }, [userEmail]);

  /* ───── fetch notifications ───── */
  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res  = await fetch(`http://localhost:5000/api/auth/notifications/${userEmail}`);
        const data = await res.json();          // expected: ['A answered…', 'B liked…']
        setNotifications(data);
      } catch (err) {
        console.error('Notif fetch error', err);
      }
    };
    if (userEmail) fetchNotifs();
  }, [userEmail]);

  /* ───── handlers ───── */
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setProfilePhoto(base64);
      localStorage.setItem(`profilePhoto-${userEmail}`, base64);
      try {
        await fetch(`http://localhost:5000/api/profile/photo/update`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, profilePhoto: base64 }),
        });
      } catch (err) {
        console.error('Failed to update photo', err);
      }
      setProfileMenuOpen(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = async () => {
    setProfilePhoto(defaultAvatar);
    localStorage.removeItem(`profilePhoto-${userEmail}`);
    setProfileMenuOpen(false);
    try {
      await fetch(`http://localhost:5000/api/profile/photo/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
    } catch (err) {
      console.error('Failed to remove photo', err);
    }
  };

  return (
    <div className="feed-navbar">
      {/* ───── left: search ───── */}
      <div className="left-section">
        <input type="text" className="search-input" placeholder="Search" />
      </div>

      {/* ───── right section ───── */}
      <div className="right-section" style={{ display:'flex', alignItems:'center', gap:'18px' }}>
        <div className="nav-icon">My Network</div>
        <div className="nav-icon">Messaging</div>

        {/* Notifications bell */}
        <div
          className="nav-icon"
          style={{ position:'relative', cursor:'pointer' }}
          onClick={() => setNotifOpen((v) => !v)}
        >
          Notifications
          {notifications.length > 0 && (
            <span className="notif-badge">{notifications.length}</span>
          )}

          {notifOpen && (
            <div className="notif-dropdown">
              {notifications.length === 0 ? (
                <p className="empty">No new notifications</p>
              ) : (
                notifications.map((n, idx) => <p key={idx}>{n}</p>)
              )}
            </div>
          )}
        </div>

        {/* My Posts link */}
        <div className="nav-icon">
          <Link to="/my-posts" style={{ textDecoration:'none', color:'inherit' }}>
            My Posts
          </Link>
        </div>

        {/* Avatar + menu */}
        <div style={{ position:'relative' }}>
          <img
            src={profilePhoto}
            alt="profile"
            style={{ width:40, height:40, borderRadius:'50%', cursor:'pointer' }}
            onClick={() => setProfileMenuOpen((o) => !o)}
          />

          {profileMenuOpen && (
            <div className="profile-menu">
              <label htmlFor="newPic" className="menu-item">
                Change Profile Photo
              </label>
              <input
                id="newPic"
                type="file"
                accept="image/*"
                style={{ display:'none' }}
                onChange={handlePhotoChange}
              />
              <button className="remove-btn" onClick={handleRemovePhoto}>
                Remove Photo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedNavbar;
