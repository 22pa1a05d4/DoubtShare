// // src/components/ProfilePopup.jsx
// import React, { useEffect } from 'react';
// import './ProfilePopup.css';

// const ProfilePopup = ({ user, onClose }) => {
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (e.target.classList.contains('popup-overlay')) {
//         onClose();
//       }
//     };
//     window.addEventListener('click', handleClickOutside);
//     return () => window.removeEventListener('click', handleClickOutside);
//   }, [onClose]);

//   if (!user) return null;

//   const img = user.profilePhoto?.length > 30
//     ? user.profilePhoto.startsWith('data:image') ? user.profilePhoto
//     : `data:image/jpeg;base64,${user.profilePhoto}`
//     : '/avatar.png';

//   return (
//     <div className="popup-overlay">
//       <div className="popup-card">
//         <img src={img} alt="avatar" className="popup-avatar" />
//         <h2>{user.firstName} {user.lastName}</h2>
//         <p><strong>College:</strong> {user.college}</p>
//         <p><strong>Branch:</strong> {user.branch}</p>
//         <button onClick={onClose} className="close-btn">Close</button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePopup;



// ProfilePopup.jsx
import React, { useEffect } from 'react';
import './ProfilePopup.css';

const ProfilePopup = ({ user, onClose }) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-popup')) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const img = user?.profilePhoto?.length > 30
    ? user.profilePhoto.startsWith('data:image') ? user.profilePhoto
    : `data:image/jpeg;base64,${user.profilePhoto}`
    : '/avatar.png';

  return (
    <div className="popup-overlay">
      <div className="profile-popup">
        <img src={img} alt="Profile" className="popup-avatar" />
        <h3>{user.firstName} {user.lastName}</h3> {/* ✅ Add this */}
        <p><strong>College:</strong> {user.college}</p>
        <p><strong>Branch:</strong> {user.branch}</p>
      </div>
    </div>
  );
};

export default ProfilePopup;
