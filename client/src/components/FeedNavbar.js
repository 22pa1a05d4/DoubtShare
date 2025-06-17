
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './FeedNavbar.css';

// const FeedNavbar = () => {
//   const userEmail       = localStorage.getItem('userEmail');
//   const defaultAvatar   = '/avatar.png';

//   const [profileMenuOpen, setProfileMenuOpen] = useState(false);
//   const [profilePhoto,     setProfilePhoto]   = useState(defaultAvatar);
//   const [notifOpen,        setNotifOpen]      = useState(false);
//   const [notifications,    setNotifications]  = useState([]);

//   /* ───── fetch profile photo ───── */
//   useEffect(() => {
//     const fetchPhoto = async () => {
//       try {
//         const res  = await fetch(`http://localhost:5000/api/auth/profile/${userEmail}`);
//         const data = await res.json();
//         if (data.profilePhoto) {
//           setProfilePhoto(data.profilePhoto);
//           localStorage.setItem(`profilePhoto-${userEmail}`, data.profilePhoto);
//         } else {
//           const cached = localStorage.getItem(`profilePhoto-${userEmail}`);
//           if (cached) setProfilePhoto(cached);
//         }
//       } catch (err) {
//         console.error('Photo fetch error', err);
//       }
//     };
//     if (userEmail) fetchPhoto();
//   }, [userEmail]);

//   /* ───── fetch notifications ───── */
//   useEffect(() => {
//     const fetchNotifs = async () => {
//       try {
//         const res  = await fetch(`http://localhost:5000/api/notifications/${userEmail}`);
//         const data = await res.json();          // expected: ['A answered…', 'B liked…']
//         setNotifications(data);
//       } catch (err) {
//         console.error('Notif fetch error', err);
//       }
//     };
//     if (userEmail) fetchNotifs();
//   }, [userEmail]);

//   /* ───── handlers ───── */
//   const handlePhotoChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64 = reader.result;
//       setProfilePhoto(base64);
//       localStorage.setItem(`profilePhoto-${userEmail}`, base64);
//       try {
//         await fetch(`http://localhost:5000/api/profile/photo/update`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: userEmail, profilePhoto: base64 }),
//         });
//       } catch (err) {
//         console.error('Failed to update photo', err);
//       }
//       setProfileMenuOpen(false);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleRemovePhoto = async () => {
//     setProfilePhoto(defaultAvatar);
//     localStorage.removeItem(`profilePhoto-${userEmail}`);
//     setProfileMenuOpen(false);
//     try {
//       await fetch(`http://localhost:5000/api/profile/photo/remove`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: userEmail }),
//       });
//     } catch (err) {
//       console.error('Failed to remove photo', err);
//     }
//   };

//   return (
//     <div className="feed-navbar">
//       {/* ───── left: search ───── */}
//       <div className="left-section">
//         <input type="text" className="search-input" placeholder="Search" />
//       </div>

//       {/* ───── right section ───── */}
//       <div className="right-section" style={{ display:'flex', alignItems:'center', gap:'18px' }}>
//         <div className="nav-icon">My Network</div>
//         <div className="nav-icon">Messaging</div>

//         {/* Notifications bell */}
//         <div
//           className="nav-icon"
//           style={{ position:'relative', cursor:'pointer' }}
//           onClick={() => setNotifOpen((v) => !v)}
//         >
//           Notifications
//           {notifications.filter(n => !n.read).length > 0 && (
//    <span className="notif-badge">
//      {notifications.filter(n => !n.read).length}
//    </span>
// )}
//           {notifOpen && (
//             <div className="notif-dropdown">
//               {notifications.length === 0 ? (
//                 <p className="empty">No new notifications</p>
//               ) : (
//                 notifications.map((n, idx) => (
//    <p key={idx}>
//      {n.message}
//      <br />
//      <small style={{ color:'#888', fontSize:'11px' }}>
//       {new Date(n.createdAt).toLocaleString()}
//      </small>
//    </p>
//  ))
//               )}
//             </div>
//           )}
//         </div>

//         {/* My Posts link */}
//         <div className="nav-icon">
//           <Link to="/my-posts" style={{ textDecoration:'none', color:'inherit' }}>
//             My Posts
//           </Link>
//         </div>

//         {/* Avatar + menu */}
//         <div style={{ position:'relative' }}>
//           <img
//             src={profilePhoto}
//             alt="profile"
//             style={{ width:40, height:40, borderRadius:'50%', cursor:'pointer' }}
//             onClick={() => setProfileMenuOpen((o) => !o)}
//           />

//           {profileMenuOpen && (
//             <div className="profile-menu">
//               <label htmlFor="newPic" className="menu-item">
//                 Change Profile Photo
//               </label>
//               <input
//                 id="newPic"
//                 type="file"
//                 accept="image/*"
//                 style={{ display:'none' }}
//                 onChange={handlePhotoChange}
//               />
//               <button className="remove-btn" onClick={handleRemovePhoto}>
//                 Remove Photo
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedNavbar;




// // client/src/components/FeedNavbar.js
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './FeedNavbar.css';

// const FeedNavbar = () => {
//   const userEmail     = localStorage.getItem('userEmail');
//   const defaultAvatar = '/avatar.png';

//   const [profileMenuOpen, setProfileMenuOpen] = useState(false);
//   const [profilePhoto,     setProfilePhoto]   = useState(defaultAvatar);
//   const [notifications,    setNotifications]  = useState([]);

//   /* ───────── fetch profile photo ───────── */
//   useEffect(() => {
//     const fetchPhoto = async () => {
//       try {
//         const res  = await fetch(`http://localhost:5000/api/auth/profile/${userEmail}`);
//         const data = await res.json();
//         if (data.profilePhoto) {
//           setProfilePhoto(data.profilePhoto);
//           localStorage.setItem(`profilePhoto-${userEmail}`, data.profilePhoto);
//         } else {
//           const cached = localStorage.getItem(`profilePhoto-${userEmail}`);
//           if (cached) setProfilePhoto(cached);
//         }
//       } catch (err) {
//         console.error('Photo fetch error', err);
//       }
//     };
//     if (userEmail) fetchPhoto();
//   }, [userEmail]);

//   /* ───────── fetch notifications (unread) ───────── */
//   useEffect(() => {
//     const fetchNotifs = async () => {
//       try {
//         const res  = await fetch(`http://localhost:5000/api/notifications/${userEmail}`);
//         const data = await res.json(); // [{ message, postId, read, createdAt }]
//         setNotifications(data);
//       } catch (err) {
//         console.error('Notif fetch error', err);
//       }
//     };
//     if (userEmail) fetchNotifs();
//   }, [userEmail]);

//   /* ───────── avatar handlers ───────── */
//   const handlePhotoChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64 = reader.result;
//       setProfilePhoto(base64);
//       localStorage.setItem(`profilePhoto-${userEmail}`, base64);
//       try {
//         await fetch(`http://localhost:5000/api/profile/photo/update`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: userEmail, profilePhoto: base64 }),
//         });
//       } catch (err) {
//         console.error('Failed to update photo', err);
//       }
//       setProfileMenuOpen(false);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleRemovePhoto = async () => {
//     setProfilePhoto(defaultAvatar);
//     localStorage.removeItem(`profilePhoto-${userEmail}`);
//     setProfileMenuOpen(false);
//     try {
//       await fetch(`http://localhost:5000/api/profile/photo/remove`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: userEmail }),
//       });
//     } catch (err) {
//       console.error('Failed to remove photo', err);
//     }
//   };

 
//   return (
//     <div className="feed-navbar">
//       {/* left search */}
//       <div className="left-section">
//         <input type="text" className="search-input" placeholder="Search" />
//       </div>

//       {/* right section */}
//       <div className="right-section" style={{ display:'flex', alignItems:'center', gap:'18px' }}>
//         <div className="nav-icon">My Network</div>
//         <div className="nav-icon">Messaging</div>

//         {/* Notifications link with badge */}
//         <Link to="/notifications" className="nav-icon" style={{ textDecoration:'none', color:'inherit', position:'relative' }}>
//           Notifications
//           {notifications.filter(n => !n.read).length > 0 && (
//             <span className="notif-badge">
//               {notifications.filter(n => !n.read).length}
//             </span>
//           )}
//         </Link>

//         {/* My Posts link */}
//         <div className="nav-icon">
//           <Link to="/my-posts" style={{ textDecoration:'none', color:'inherit' }}>
//             My Posts
//           </Link>
//         </div>

//         {/* Avatar + dropdown */}
//         <div style={{ position:'relative' }}>
//           <img
//             src={profilePhoto}
//             alt="profile"
//             style={{ width:40, height:40, borderRadius:'50%', cursor:'pointer' }}
//             onClick={() => setProfileMenuOpen(o => !o)}
//           />

//           {profileMenuOpen && (
//             <div className="profile-menu">
//               <label htmlFor="newPic" className="menu-item">
//                 Change Profile Photo
//               </label>
//               <input
//                 id="newPic"
//                 type="file"
//                 accept="image/*"
//                 style={{ display:'none' }}
//                 onChange={handlePhotoChange}
//               />
//               <button className="remove-btn" onClick={handleRemovePhoto}>
//                 Remove Photo
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedNavbar;



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './FeedNavbar.css';

// const FeedNavbar = () => {
//   const userEmail       = localStorage.getItem('userEmail');
//   const defaultAvatar   = '/avatar.png';

//   /* local state */
//   const [profileOpen,  setProfileOpen]  = useState(false);
//   const [profilePhoto, setProfilePhoto] = useState(defaultAvatar);
//   const [notifs,       setNotifs]       = useState([]);

//   /* ── profile photo ───────────────── */
//   useEffect(() => {
//     const fetchPhoto = async () => {
//       try {
//         const res  = await fetch(`http://localhost:5000/api/auth/profile/${userEmail}`);
//         const data = await res.json();
//         if (data.profilePhoto) {
//           setProfilePhoto(data.profilePhoto);
//           localStorage.setItem(`profile-${userEmail}`, data.profilePhoto);
//         } else {
//           const cached = localStorage.getItem(`profile-${userEmail}`);
//           if (cached) setProfilePhoto(cached);
//         }
//       } catch (err) { console.error('photo error', err); }
//     };
//     if (userEmail) fetchPhoto();
//   }, [userEmail]);

//   /* ── fetch notifications ─────────── */
//   useEffect(() => {
//     const fetchNotifs = async () => {
//       try {
//         const res  = await fetch(`http://localhost:5000/api/notifications/${userEmail}`);
//         const data = await res.json();           // [{message,postId,read,…}]
//         setNotifs(data);
//       } catch (err) { console.error('notif error', err); }
//     };
//     if (userEmail) fetchNotifs();

//     /* 🔔 refresh badge when NotificationsPage dispatches event */
//     const handler = () => fetchNotifs();
//     window.addEventListener('notif-updated', handler);
//     return () => window.removeEventListener('notif-updated', handler);
//   }, [userEmail]);

//   /* ── avatar handlers (unchanged) ── */
//   const handlePhotoChange = (e) => { /* ...unchanged... */ };
//   const handleRemovePhoto = () => { /* ...unchanged... */ };

//   /* unread count */
//   const unread = notifs.filter(n => !n.read).length;

//   return (
//     <div className="feed-navbar">
//       <div className="left-section">
//         <input className="search-input" placeholder="Search" />
//       </div>

//       <div className="right-section" style={{ display:'flex',gap:'18px',alignItems:'center' }}>
//         <div className="nav-icon">My Network</div>
//         <div className="nav-icon">Messaging</div>

//         {/* notifications */}
//         <Link to="/notifications" className="nav-icon" style={{ position:'relative', textDecoration:'none', color:'inherit' }}>
//           Notifications
//           {unread > 0 && <span className="notif-badge">{unread}</span>}
//         </Link>

//         {/* My Posts */}
//         <Link to="/my-posts" className="nav-icon" style={{ textDecoration:'none',color:'inherit' }}>
//           My Posts
//         </Link>

//         {/* avatar */}
//         <div style={{ position:'relative' }}>
//           <img
//             src={profilePhoto}
//             alt="profile"
//             style={{ width:40, height:40, borderRadius:'50%', cursor:'pointer' }}
//             onClick={() => setProfileOpen(p => !p)}
//           />

//           {profileOpen && (
//             <div className="profile-menu">
//               <label htmlFor="newPic" className="menu-item">Change Photo</label>
//               <input id="newPic" type="file" accept="image/*" style={{ display:'none' }} onChange={handlePhotoChange}/>
//               <button className="remove-btn" onClick={handleRemovePhoto}>Remove Photo</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedNavbar;



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './FeedNavbar.css';

// const FeedNavbar = () => {
//   const userEmail     = localStorage.getItem('userEmail');
//   const defaultAvatar = '/avatar.png';
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [profilePhoto, setProfilePhoto] = useState(defaultAvatar);
//   const [notifs, setNotifs] = useState([]);
  
//   /* ───────────── Fetch Profile Photo ───────────── */
//   const fetchPhoto = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/auth/profile/${userEmail}`);
//       const data = await res.json();

//       if (data.profilePhoto) {
//         const serverPhoto = data.profilePhoto;
//         const localPhoto = localStorage.getItem(`profile-${userEmail}`);

//         if (serverPhoto !== localPhoto) {
//           localStorage.setItem(`profile-${userEmail}`, serverPhoto);
//           setProfilePhoto(serverPhoto);
//         } else {
//           setProfilePhoto(localPhoto || defaultAvatar);
//         }
//       } else {
//         const cached = localStorage.getItem(`profile-${userEmail}`);
//         if (cached) setProfilePhoto(cached);
//       }
//     } catch (err) {
//       console.error('photo error', err);
//     }
//   };

//   useEffect(() => {
//     if (userEmail) fetchPhoto();

//     // Listen for profile updates from other components
//     const handler = () => fetchPhoto();
//     window.addEventListener('profile-updated', handler);
//     return () => window.removeEventListener('profile-updated', handler);
//   }, [userEmail]);

//   /* ───────────── Fetch Notifications ───────────── */
//   useEffect(() => {
//     const fetchNotifs = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/notifications/${userEmail}`);
//         const data = await res.json();
//         setNotifs(data);
//       } catch (err) {
//         console.error('notif error', err);
//       }
//     };

//     if (userEmail) fetchNotifs();

//     const handler = () => fetchNotifs();
//     window.addEventListener('notif-updated', handler);
//     return () => window.removeEventListener('notif-updated', handler);
//   }, [userEmail]);

//   /* ───────────── Handle Photo Upload ───────────── */
//   const handlePhotoChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64 = reader.result;

//       try {
//         const res = await fetch('http://localhost:5000/api/auth/profile/photo/update', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: userEmail, profilePhoto: base64 }),
//         });

//         if (res.ok) {
//           localStorage.removeItem(`profile-${userEmail}`);
//           localStorage.setItem(`profile-${userEmail}`, base64);
//           setProfilePhoto(base64);

//           // 🔄 Notify other components to refresh
//           window.dispatchEvent(new Event('profile-updated'));
//         } else {
//           console.error('Failed to upload new photo');
//         }
//       } catch (err) {
//         console.error('Upload error:', err);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   /* ───────────── Remove Photo ───────────── */
//   const handleRemovePhoto = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/profile/photo/remove', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: userEmail }),
//       });

//       if (res.ok) {
//         localStorage.removeItem(`profile-${userEmail}`);
//         setProfilePhoto(defaultAvatar);
//         window.dispatchEvent(new Event('profile-updated'));
//       } else {
//         console.error('Failed to remove photo');
//       }
//     } catch (err) {
//       console.error('Remove error:', err);
//     }
//   };

//   const unread = notifs.filter(n => !n.read).length;

//   return (
//     <div className="feed-navbar">
//       <div className="left-section">
//         <input className="search-input" placeholder="Search" />
//       </div>

//       <div className="right-section" style={{ display:'flex', gap:'18px', alignItems:'center' }}>
//         <Link to="/network" className="nav-icon" style={{ textDecoration:'none',color:'inherit' }}>
//    My Network </Link>
//         <Link to="/chat-list" className="nav-icon">Messaging</Link>


//         <Link to="/notifications" className="nav-icon" style={{ position:'relative', textDecoration:'none', color:'inherit' }}>
//           Notifications
//           {unread > 0 && <span className="notif-badge">{unread}</span>}
//         </Link>

//         <Link to="/my-posts" className="nav-icon" style={{ textDecoration:'none', color:'inherit' }}>
//           My Posts
//         </Link>

//         <div style={{ position:'relative' }}>
//           <img
//             src={profilePhoto}
//             alt="profile"
//             style={{ width:40, height:40, borderRadius:'50%', cursor:'pointer' }}
//             onClick={() => setProfileOpen(p => !p)}
//           />

//           {profileOpen && (
//             <div className="profile-menu">
//               <label htmlFor="newPic" className="menu-item">Change Photo</label>
//               <input id="newPic" type="file" accept="image/*" style={{ display:'none' }} onChange={handlePhotoChange} />
//               <button className="remove-btn" onClick={handleRemovePhoto}>Remove Photo</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedNavbar;

// final
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './FeedNavbar.css';
// import ProfilePopup from './ProfilePopup';

// const FeedNavbar = () => {
//   const userEmail = localStorage.getItem('userEmail');
//   const defaultAvatar = '/avatar.png';
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [profilePhoto, setProfilePhoto] = useState(defaultAvatar);
//   const [notifs, setNotifs] = useState([]);

//   const [searchResults, setSearchResults] = useState({ users: [], posts: [] });
//   const [showDropdown, setShowDropdown] = useState(false);
//    const [popupUser, setPopupUser] = useState(null);
// const handleShowProfile = async (email) => {
//   try {
//     const res = await fetch(`http://localhost:5000/api/auth/profile/${email}`);
//     const data = await res.json();
//     setPopupUser(data);
//   } catch (err) {
//     console.error('Failed to load user popup:', err);
//   }
// };

//   const handleSearch = async (e) => {
//     const query = e.target.value;
//     if (!query) {
//       setSearchResults({ users: [], posts: [] });
//       setShowDropdown(false);
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/api/search/${query}`);
//       const data = await res.json();
//       setSearchResults(data);
//       setShowDropdown(true);
//     } catch (err) {
//       console.error('Search error:', err);
//     }
//   };

//   const fetchPhoto = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/auth/profile/${userEmail}`);
//       const data = await res.json();

//       if (data.profilePhoto) {
//         const serverPhoto = data.profilePhoto;
//         const localPhoto = localStorage.getItem(`profile-${userEmail}`);

//         if (serverPhoto !== localPhoto) {
//           localStorage.setItem(`profile-${userEmail}`, serverPhoto);
//           setProfilePhoto(serverPhoto);
//         } else {
//           setProfilePhoto(localPhoto || defaultAvatar);
//         }
//       } else {
//         const cached = localStorage.getItem(`profile-${userEmail}`);
//         if (cached) setProfilePhoto(cached);
//       }
//     } catch (err) {
//       console.error('photo error', err);
//     }
//   };

//   useEffect(() => {
//     if (userEmail) fetchPhoto();
//     const handler = () => fetchPhoto();
//     window.addEventListener('profile-updated', handler);
//     return () => window.removeEventListener('profile-updated', handler);
//   }, [userEmail]);

//   useEffect(() => {
//     const fetchNotifs = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/notifications/${userEmail}`);
//         const data = await res.json();
//         setNotifs(data);
//       } catch (err) {
//         console.error('notif error', err);
//       }
//     };

//     if (userEmail) fetchNotifs();
//     const handler = () => fetchNotifs();
//     window.addEventListener('notif-updated', handler);
//     return () => window.removeEventListener('notif-updated', handler);
//   }, [userEmail]);

//   const handlePhotoChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64 = reader.result;

//       try {
//         const res = await fetch('http://localhost:5000/api/auth/profile/photo/update', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: userEmail, profilePhoto: base64 }),
//         });

//         if (res.ok) {
//           localStorage.removeItem(`profile-${userEmail}`);
//           localStorage.setItem(`profile-${userEmail}`, base64);
//           setProfilePhoto(base64);
//           window.dispatchEvent(new Event('profile-updated'));
//         } else {
//           console.error('Failed to upload new photo');
//         }
//       } catch (err) {
//         console.error('Upload error:', err);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleRemovePhoto = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/profile/photo/remove', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: userEmail }),
//       });

//       if (res.ok) {
//         localStorage.removeItem(`profile-${userEmail}`);
//         setProfilePhoto(defaultAvatar);
//         window.dispatchEvent(new Event('profile-updated'));
//       } else {
//         console.error('Failed to remove photo');
//       }
//     } catch (err) {
//       console.error('Remove error:', err);
//     }
//   };

//   const unread = notifs.filter(n => !n.read).length;

//   return (
//     <div className="feed-navbar">
//       <div className="left-section" style={{ position: 'relative' }}>
//         <input
//           className="search-input"
//           type="text"
//           placeholder="Search posts or users"
//           onChange={handleSearch}
//         />

//         {showDropdown && (
//           <div className="search-dropdown">
//             {searchResults.users.length === 0 && searchResults.posts.length === 0 ? (
//               <div className="no-results">No results found</div>
//             ) : (
//               <>
//                 {searchResults.users.length > 0 && (
//                   <div>
//                     <div className="dropdown-section-title">Users</div>
//                     {searchResults.users.map((u) => (
//                       <div
//   key={u.email}
//   className="dropdown-item"
//   onClick={() => handleShowProfile(u.email)}
// >
//   {u.name || u.email}
// </div>

//                     ))}
//                   </div>
                  
//                 )}
//                 {searchResults.posts.length > 0 && (
//                   <div>
//                     <div className="dropdown-section-title">Posts</div>
//                     {searchResults.posts.map((p, i) => (
//                       <div key={i} className="dropdown-item">
//                         {p.content.slice(0, 50)}...
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="right-section" style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
//         <Link to="/network" className="nav-icon" style={{ textDecoration: 'none', color: 'inherit' }}>
//           My Network
//         </Link>
//         <Link to="/chat-list" className="nav-icon">Messaging</Link>
//         <Link to="/notifications" className="nav-icon" style={{ position: 'relative', textDecoration: 'none', color: 'inherit' }}>
//           Notifications
//           {unread > 0 && <span className="notif-badge">{unread}</span>}
//         </Link>
//         <Link to="/my-posts" className="nav-icon" style={{ textDecoration: 'none', color: 'inherit' }}>
//           My Posts
//         </Link>

//         <div style={{ position: 'relative' }}>
//           <img
//             src={profilePhoto}
//             alt="profile"
//             style={{ width: 40, height: 40, borderRadius: '50%', cursor: 'pointer' }}
//             onClick={() => setProfileOpen(p => !p)}
//           />
//           {profileOpen && (
//             <div className="profile-menu">
//               <label htmlFor="newPic" className="menu-item">Change Photo</label>
//               <input id="newPic" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
//               <button className="remove-btn" onClick={handleRemovePhoto}>Remove Photo</button>
//             </div>
//           )}
//         </div>
//       </div>
//       {popupUser && (
//   <ProfilePopup user={popupUser} onClose={() => setPopupUser(null)} />
// )}

//     </div>
//   );
// };

// export default FeedNavbar;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FeedNavbar.css';
import ProfilePopup from './ProfilePopup'; // ✅ Make sure it's imported

const FeedNavbar = () => {
  const userEmail = localStorage.getItem('userEmail');
  const defaultAvatar = '/avatar.png';

  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(defaultAvatar);
  const [notifs, setNotifs] = useState([]);
  const [following, setFollowing] = useState([]);
  const [popupUser, setPopupUser] = useState(null);

  const [searchResults, setSearchResults] = useState({ users: [], posts: [] });
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = async (e) => {
    const query = e.target.value;
    if (!query) {
      setSearchResults({ users: [], posts: [] });
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/search/${query}`);
      const data = await res.json();
      setSearchResults(data);
      setShowDropdown(true);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const fetchPhoto = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/profile/${userEmail}`);
      const data = await res.json();

      if (data.profilePhoto) {
        const serverPhoto = data.profilePhoto;
        const localPhoto = localStorage.getItem(`profile-${userEmail}`);

        if (serverPhoto !== localPhoto) {
          localStorage.setItem(`profile-${userEmail}`, serverPhoto);
          setProfilePhoto(serverPhoto);
        } else {
          setProfilePhoto(localPhoto || defaultAvatar);
        }
      } else {
        const cached = localStorage.getItem(`profile-${userEmail}`);
        if (cached) setProfilePhoto(cached);
      }
    } catch (err) {
      console.error('photo error', err);
    }
  };

  const fetchFollowing = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/following/${userEmail}`);
      const data = await res.json();
      setFollowing(data);
    } catch (err) {
      console.error('fetch following error:', err);
    }
  };

  const handleFollow = async (targetEmail) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentUserEmail: userEmail,
          targetUserEmail: targetEmail,
        }),
      });
      if (res.ok) {
        setFollowing(prev => [...prev, targetEmail]);
      }
    } catch (err) {
      console.error('Follow failed', err);
    }
  };

  const handleShowProfile = async (email) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/profile/${email}`);
      const data = await res.json();
      setPopupUser(data);
    } catch (err) {
      console.error('popup fetch failed:', err);
    }
  };

  useEffect(() => {
    if (userEmail) fetchPhoto();
    const handler = () => fetchPhoto();
    window.addEventListener('profile-updated', handler);
    return () => window.removeEventListener('profile-updated', handler);
  }, [userEmail]);

  useEffect(() => {
    if (userEmail) fetchFollowing();
  }, [userEmail]);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/notifications/${userEmail}`);
        const data = await res.json();
        setNotifs(data);
      } catch (err) {
        console.error('notif error:', err);
      }
    };

    if (userEmail) fetchNotifs();
    const handler = () => fetchNotifs();
    window.addEventListener('notif-updated', handler);
    return () => window.removeEventListener('notif-updated', handler);
  }, [userEmail]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      try {
        const res = await fetch('http://localhost:5000/api/auth/profile/photo/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, profilePhoto: base64 }),
        });

        if (res.ok) {
          localStorage.removeItem(`profile-${userEmail}`);
          localStorage.setItem(`profile-${userEmail}`, base64);
          setProfilePhoto(base64);
          window.dispatchEvent(new Event('profile-updated'));
        } else {
          console.error('Failed to upload new photo');
        }
      } catch (err) {
        console.error('Upload error:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/profile/photo/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      if (res.ok) {
        localStorage.removeItem(`profile-${userEmail}`);
        setProfilePhoto(defaultAvatar);
        window.dispatchEvent(new Event('profile-updated'));
      } else {
        console.error('Failed to remove photo');
      }
    } catch (err) {
      console.error('Remove error:', err);
    }
  };

  const unread = notifs.filter(n => !n.read).length;

  return (
    <div className="feed-navbar">
      <div className="left-section" style={{ position: 'relative' }}>
        <input
          className="search-input"
          type="text"
          placeholder="Search posts or users"
          onChange={handleSearch}
        />

        {showDropdown && (
          <div className="search-dropdown">
            {searchResults.users.length === 0 && searchResults.posts.length === 0 ? (
              <div className="no-results">No results found</div>
            ) : (
              <>
                {searchResults.users.length > 0 && (
                  <div>
                    <div className="dropdown-section-title">Users</div>
                    {searchResults.users.map((u) => (
                      <div
                        key={u.email}
                        className="dropdown-item"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span
                          onClick={() => handleShowProfile(u.email)}
                          style={{ cursor: 'pointer', flex: 1 }}
                        >
                          {u.name || u.email}
                        </span>
                        {u.email !== userEmail && (
                          <button
                            onClick={() => handleFollow(u.email)}
                            className="follow-btn"
                            style={{
                              marginLeft: '10px',
                              padding: '5px 10px',
                              backgroundColor: following.includes(u.email) ? '#ccc' : '#007bff',
                              color: following.includes(u.email) ? '#333' : '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: following.includes(u.email) ? 'default' : 'pointer'
                            }}
                            disabled={following.includes(u.email)}
                          >
                            {following.includes(u.email) ? 'Following' : 'Follow'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {searchResults.posts.length > 0 && (
                  <div>
                    <div className="dropdown-section-title">Posts</div>
                    {searchResults.posts.map((p, i) => (
                      <div key={i} className="dropdown-item">
                        {p.content.slice(0, 50)}...
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="right-section" style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
        <Link to="/network" className="nav-icon" style={{ textDecoration: 'none', color: 'inherit' }}>
          My Network
        </Link>
        <Link to="/chat-list" className="nav-icon">Messaging</Link>
        <Link to="/notifications" className="nav-icon" style={{ position: 'relative', textDecoration: 'none', color: 'inherit' }}>
          Notifications
          {unread > 0 && <span className="notif-badge">{unread}</span>}
        </Link>
        <Link to="/my-posts" className="nav-icon" style={{ textDecoration: 'none', color: 'inherit' }}>
          My Posts
        </Link>

        <div style={{ position: 'relative' }}>
          <img
            src={profilePhoto}
            alt="profile"
            style={{ width: 40, height: 40, borderRadius: '50%', cursor: 'pointer' }}
            onClick={() => setProfileOpen(p => !p)}
          />
          {profileOpen && (
            <div className="profile-menu">
              <label htmlFor="newPic" className="menu-item">Change Photo</label>
              <input id="newPic" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
              <button className="remove-btn" onClick={handleRemovePhoto}>Remove Photo</button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Show profile popup when clicked */}
      {popupUser && (
        <ProfilePopup user={popupUser} onClose={() => setPopupUser(null)} />
      )}
    </div>
  );
};

export default FeedNavbar;
