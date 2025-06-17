



// import React, { useEffect, useState } from 'react';
// import './SuggestedUsers.css';

// const SuggestedUsers = ({ currentUserEmail }) => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [menuOpenIndex, setMenuOpenIndex] = useState(null);
//   const [following, setFollowing] = useState([]);

//   const getUserKey = (type) => `${type}Users_${currentUserEmail}`;

//   const getHiddenUsers = () => JSON.parse(localStorage.getItem(getUserKey('hidden'))) || [];
//   const getBlockedUsers = () => JSON.parse(localStorage.getItem(getUserKey('blocked'))) || [];

//   const updateUserList = (type, email) => {
//     const key = getUserKey(type);
//     const currentList = JSON.parse(localStorage.getItem(key)) || [];
//     if (!currentList.includes(email)) {
//       localStorage.setItem(key, JSON.stringify([...currentList, email]));
//     }
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/auth/all-users');
//         const data = await res.json();

//         const hiddenUsers = getHiddenUsers();
//         const blockedUsers = getBlockedUsers();

//         const filtered = data.filter(
//           user =>
//             user.email !== currentUserEmail &&
//             !hiddenUsers.includes(user.email) &&
//             !blockedUsers.includes(user.email)
//         );

//         setSuggestions(filtered);
//       } catch (err) {
//         console.error('Error fetching suggested users:', err);
//       }
//     };

//     fetchUsers();
//   }, [currentUserEmail]);

//   const handleFollow = async (email) => {
//     setFollowing(prev =>
//       prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
//     );
//     try {
//       await fetch('http://localhost:5000/api/auth/follow', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         currentUserEmail: currentUserEmail,
//         targetUserEmail: email
//       }),
//     });
//   } catch (error) {
//     console.error('Error following user:', error);
//   }
//   };

//   const handleHide = (email) => {
//     updateUserList('hidden', email);
//     setSuggestions(prev => prev.filter(user => user.email !== email));
//   };

//   const handleBlock = (email) => {
//     updateUserList('blocked', email);
//     setSuggestions(prev => prev.filter(user => user.email !== email));
//   };

//   return (
//     <div className="suggested-users">
//       {suggestions.length === 0 ? (
//         <p>No suggestions found</p>
//       ) : (
//         suggestions.map((user, index) => {
//           const imageSrc =
//             user.profilePhoto && user.profilePhoto.length > 30
//               ? user.profilePhoto.startsWith('data:image')
//                 ? user.profilePhoto
//                 : `data:image/jpeg;base64,${user.profilePhoto}`
//               : '/avatar.png';

//           return (
//             <div key={index} className="suggested-user-card">
//               <img
//                 src={imageSrc}
//                 alt="avatar"
//                 className="suggested-user-avatar"
//                 style={{ width: '40px', height: '40px', borderRadius: '50%' }}
//               />
//               <div className="user-info">
//                 <p style={{ margin: 0 }}>{user.name}</p>
//                 <p style={{ margin: 0, fontSize: '12px', color: 'gray' }}>{user.college}</p>
//               </div>

//               <button
//                 className={`follow-button ${following.includes(user.email) ? 'following' : ''}`}
//                 onClick={() => handleFollow(user.email)}
//               >
//                 {following.includes(user.email) ? 'Following' : 'Follow'}
//               </button>

//               <div className="menu-container">
//                 <span
//                   className="menu-dots"
//                   onClick={() => setMenuOpenIndex(menuOpenIndex === index ? null : index)}
//                 >
//                   ⋮
//                 </span>

//                 {menuOpenIndex === index && (
//                   <div className="dropdown-menu">
//                     <p onClick={() => handleHide(user.email)}>Hide</p>
//                     <p onClick={() => handleBlock(user.email)}>Block</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default SuggestedUsers;



// // client/src/components/SuggestedUsers.jsx
// import React, { useEffect, useState } from 'react';
// import './SuggestedUsers.css';


// const SuggestedUsers = ({ currentUserEmail }) => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [menuOpenIndex, setMenuOpenIndex] = useState(null);
//   const [following,     setFollowing]     = useState([]);

//   // local hide/block helpers (unchanged)
//   const key = (t) => `${t}Users_${currentUserEmail}`;
//   const get = (t) => JSON.parse(localStorage.getItem(key(t))) || [];
//   const add = (t, email) =>
//     localStorage.setItem(key(t), JSON.stringify([...get(t), email]));

//   /* fetch following list first */
//   useEffect(() => {
//     const fetchFollows = async () => {
//       const res   = await fetch(`http://localhost:5000/api/auth/following/${currentUserEmail}`);
//       const list  = await res.json();          // ["a@x.com","b@y.com"]
//       setFollowing(list);
//     };
//     fetchFollows();
//   }, [currentUserEmail]);

//   /* fetch suggestion users */
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const res = await fetch('http://localhost:5000/api/auth/all-users');
//       const data = await res.json();

//       const hidden  = get('hidden');
//       const blocked = get('blocked');

//       const filtered = data.filter(u =>
//         u.email !== currentUserEmail &&
//         !hidden.includes(u.email) &&
//         !blocked.includes(u.email) &&
//         !following.includes(u.email)         // ⬅️ hide already-followed
//       );
//       setSuggestions(filtered);
//     };

//     if (following.length >= 0) fetchUsers();  // run after following loads
//   }, [currentUserEmail, following]);

//   /* follow action */
//   const handleFollow = async (email) => {
//     try {
//       await fetch('http://localhost:5000/api/auth/follow', {
//         method : 'POST',
//         headers: { 'Content-Type':'application/json' },
//         body   : JSON.stringify({
//           currentUserEmail,
//           targetUserEmail: email,
//         }),
//       });
//       // update UI immediately
//       setFollowing(prev => [...prev, email]);
//       setSuggestions(prev => prev.filter(u => u.email !== email));
//     } catch (err) {
//       console.error('follow error', err);
//     }
//   };

//   /* hide / block */
//   const handleHide  = (em) => { add('hidden', em);  setSuggestions(prev => prev.filter(u => u.email !== em)); };
//   const handleBlock = (em) => { add('blocked', em); setSuggestions(prev => prev.filter(u => u.email !== em)); };

//   /* render */
//   if (suggestions.length === 0) return <p>No suggestions found</p>;

//   return (
//     <div className="suggested-users">
//       {suggestions.map((user, idx) => {
//         const img = user.profilePhoto?.length > 30
//           ? user.profilePhoto.startsWith('data:image') ? user.profilePhoto
//           : `data:image/jpeg;base64,${user.profilePhoto}`
//           : '/avatar.png';

//         return (
//           <div key={idx} className="suggested-user-card">
//             <img src={img} alt="avatar" className="suggested-user-avatar" />
//             <div className="user-info">
//               <p>{user.name}</p>
//               <p className="sub">{user.college}</p>
//             </div>

//             <button
//               className="follow-button"
//               onClick={() => handleFollow(user.email)}
//             >Follow</button>

//             <div className="menu-container">
//               <span className="menu-dots" onClick={() => setMenuOpenIndex(menuOpenIndex === idx ? null : idx)}>⋮</span>
//               {menuOpenIndex === idx && (
//                 <div className="dropdown-menu">
//                   <p onClick={() => handleHide(user.email)}>Hide</p>
//                   <p onClick={() => handleBlock(user.email)}>Block</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default SuggestedUsers;

// import React, { useEffect, useState } from 'react';
// import './SuggestedUsers.css';
// import ProfilePopup from './ProfilePopup'; // import popup

// const SuggestedUsers = ({ currentUserEmail }) => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [menuOpenIndex, setMenuOpenIndex] = useState(null);
//   const [following, setFollowing] = useState([]);
//   const [popupUser, setPopupUser] = useState(null); // 💡 for popup

//   // utility
//   const key = (t) => `${t}Users_${currentUserEmail}`;
//   const get = (t) => JSON.parse(localStorage.getItem(key(t))) || [];
//   const add = (t, email) =>
//     localStorage.setItem(key(t), JSON.stringify([...get(t), email]));

//   useEffect(() => {
//     const fetchFollows = async () => {
//       const res = await fetch(`http://localhost:5000/api/auth/following/${currentUserEmail}`);
//       const list = await res.json();
//       setFollowing(list);
//     };
//     fetchFollows();
//   }, [currentUserEmail]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const res = await fetch('http://localhost:5000/api/auth/all-users');
//       const data = await res.json();

//       const hidden = get('hidden');
//       const blocked = get('blocked');

//       const filtered = data.filter(u =>
//         u.email !== currentUserEmail &&
//         !hidden.includes(u.email) &&
//         !blocked.includes(u.email) &&
//         !following.includes(u.email)
//       );
//       setSuggestions(filtered);
//     };

//     if (following.length >= 0) fetchUsers();
//   }, [currentUserEmail, following]);

//   const handleFollow = async (email) => {
//     try {
//       await fetch('http://localhost:5000/api/auth/follow', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           currentUserEmail,
//           targetUserEmail: email,
//         }),
//       });
//       setFollowing(prev => [...prev, email]);
//       setSuggestions(prev => prev.filter(u => u.email !== email));
//     } catch (err) {
//       console.error('follow error', err);
//     }
//   };

//   const handleHide = (em) => {
//     add('hidden', em);
//     setSuggestions(prev => prev.filter(u => u.email !== em));
//   };

//   const handleBlock = (em) => {
//     add('blocked', em);
//     setSuggestions(prev => prev.filter(u => u.email !== em));
//   };

//   // ✅ open popup
//   const handleUserClick = async (email) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/auth/profile/${email}`);
//       const data = await res.json();
//       setPopupUser(data);
//     } catch (err) {
//       console.error('popup fetch error', err);
//     }
//   };

//   if (suggestions.length === 0) return <p>No suggestions found</p>;

//   return (
//     <div className="suggested-users">
//       {suggestions.map((user, idx) => {
//         const img = user.profilePhoto?.length > 30
//           ? user.profilePhoto.startsWith('data:image') ? user.profilePhoto
//           : `data:image/jpeg;base64,${user.profilePhoto}`
//           : '/avatar.png';

//         return (
//           <div
//             key={idx}
//             className="suggested-user-card"
//             onClick={() => handleUserClick(user.email)} // 💡 full card clickable
//           >
//             <img src={img} alt="avatar" className="suggested-user-avatar" />
//             <div className="user-info">
//               <p>{user.name}</p>
//               <p className="sub">{user.college}</p>
//             </div>

//             <button
//               className="follow-button"
//               onClick={(e) => {
//                 e.stopPropagation(); // ❗ don't trigger popup
//                 handleFollow(user.email);
//               }}
//             >
//               Follow
//             </button>

//             <div className="menu-container" onClick={(e) => e.stopPropagation()}>
//               <span className="menu-dots" onClick={() => setMenuOpenIndex(menuOpenIndex === idx ? null : idx)}>⋮</span>
//               {menuOpenIndex === idx && (
//                 <div className="dropdown-menu">
//                   <p onClick={() => handleHide(user.email)}>Hide</p>
//                   <p onClick={() => handleBlock(user.email)}>Block</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}

//       {/* ✅ SINGLE POPUP rendered outside the map */}
//       {popupUser && <ProfilePopup user={popupUser} onClose={() => setPopupUser(null)} />}
//     </div>
//   );
// };

// export default SuggestedUsers;


import React, { useEffect, useState } from 'react';
import './SuggestedUsers.css';
import ProfilePopup from './ProfilePopup';

const SuggestedUsers = ({ currentUserEmail }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [following, setFollowing] = useState([]);
  const [popupUser, setPopupUser] = useState(null);

  const key = (t) => `${t}Users_${currentUserEmail}`;
  const get = (t) => JSON.parse(localStorage.getItem(key(t))) || [];
  const add = (t, email) =>
    localStorage.setItem(key(t), JSON.stringify([...get(t), email])) || [];

  // Fetch who user is following
  useEffect(() => {
    const fetchFollows = async () => {
      const res = await fetch(`http://localhost:5000/api/auth/following/${currentUserEmail}`);
      const list = await res.json();
      setFollowing(list);
    };
    fetchFollows();
  }, [currentUserEmail]);

  // Fetch all users (excluding hidden/blocked/followed)
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:5000/api/auth/all-users');
      const data = await res.json();

      const hidden = get('hidden');
      const blocked = get('blocked');

      const filtered = data.filter(u =>
        u.email !== currentUserEmail &&
        !hidden.includes(u.email) &&
        !blocked.includes(u.email) &&
        !following.includes(u.email)
      );
      setSuggestions(filtered);
    };

    if (following.length >= 0) fetchUsers();
  }, [currentUserEmail, following]);

  // Follow handler
  const handleFollow = async (email) => {
    try {
      await fetch('http://localhost:5000/api/auth/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentUserEmail,
          targetUserEmail: email,
        }),
      });
      setFollowing(prev => [...prev, email]);
      setSuggestions(prev => prev.filter(u => u.email !== email));
    } catch (err) {
      console.error('follow error', err);
    }
  };

  // Hide / Block
  const handleHide = (em) => {
    add('hidden', em);
    setSuggestions(prev => prev.filter(u => u.email !== em));
  };

  const handleBlock = (em) => {
    add('blocked', em);
    setSuggestions(prev => prev.filter(u => u.email !== em));
  };

  // Show profile popup
  const handleShowProfile = async (email) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/profile/${email}`);
      const data = await res.json(); // must contain firstName, lastName, college, branch, profilePhoto
      setPopupUser(data);
    } catch (err) {
      console.error('popup fetch failed:', err);
    }
  };

  if (suggestions.length === 0) return <p>No suggestions found</p>;

  return (
    <div className="suggested-users">
      {suggestions.map((user, idx) => {
        const img = user.profilePhoto?.length > 30
          ? user.profilePhoto.startsWith('data:image')
            ? user.profilePhoto
            : `data:image/jpeg;base64,${user.profilePhoto}`
          : '/avatar.png';

        return (
          <div
  key={idx}
  className="suggested-user-card"
  onClick={() => handleShowProfile(user.email)}
>
  <img
    src={img}
    alt="avatar"
    className="suggested-user-avatar"
  />
  <div className="user-info">
    <p>{user.firstName}</p>
  </div>

            <button
  className="follow-button"
  onClick={(e) => {
    e.stopPropagation(); // 👈 prevent card click
    handleFollow(user.email);
  }}
>
  Follow
</button>


            <div className="menu-container">
              <span
  className="menu-dots"
  onClick={(e) => {
    e.stopPropagation(); // 👈 prevent card click
    setMenuOpenIndex(menuOpenIndex === idx ? null : idx);
  }}
>⋮</span>
              {menuOpenIndex === idx && (
                <div className="dropdown-menu">
  <p onClick={(e) => { e.stopPropagation(); handleHide(user.email); }}>Hide</p>
  <p onClick={(e) => { e.stopPropagation(); handleBlock(user.email); }}>Block</p>
</div>

              )}
            </div>
          </div>
        );
      })}

      {/* ✅ Show popup */}
      {popupUser && (
        <ProfilePopup user={popupUser} onClose={() => setPopupUser(null)} />
      )}
    </div>
  );
};

export default SuggestedUsers;
