
// import React, { useEffect, useState } from 'react';
// import './SuggestedUsers.css';

// const SuggestedUsers = ({ currentUserEmail }) => {
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/auth/all-users');
//         const data = await res.json();

//         // Filter out current user
//         const filtered = data.filter(user => user.email !== currentUserEmail);
//         setSuggestions(filtered);
//       } catch (err) {
//         console.error('Error fetching suggested users:', err);
//       }
//     };

//     fetchUsers();
//   }, [currentUserEmail]);

//   return (
//     <div className="suggested-users">
//       {suggestions.length === 0 ? (
//         <p>No suggestions found</p>
//       ) : (
//         suggestions.map((user, index) => {
//           // Determine the image source
          
//             console.log('User profilePhoto:', user.profilePhoto);
//           const imageSrc = user.profilePhoto && user.profilePhoto.length > 30
//             ? user.profilePhoto.startsWith('data:image')
//               ? user.profilePhoto
//               : `data:image/jpeg;base64,${user.profilePhoto}`
//             : '/avatar.png';

//           return (
//             <div key={index} className="suggested-user-card">
//               <img
//                 src={imageSrc}
//                 alt="avatar"
//                 className="suggested-user-avatar"
//                 style={{ width: '40px', height: '40px', borderRadius: '50%' }}
//               />
//               <div>
//                 <p style={{ margin: 0 }}>{user.name}</p>
//                 <p style={{ margin: 0, fontSize: '12px', color: 'gray' }}>{user.college}</p>
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default SuggestedUsers;




import React, { useEffect, useState } from 'react';
import './SuggestedUsers.css';

const SuggestedUsers = ({ currentUserEmail }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [following, setFollowing] = useState([]);

  const getUserKey = (type) => `${type}Users_${currentUserEmail}`;

  const getHiddenUsers = () => JSON.parse(localStorage.getItem(getUserKey('hidden'))) || [];
  const getBlockedUsers = () => JSON.parse(localStorage.getItem(getUserKey('blocked'))) || [];

  const updateUserList = (type, email) => {
    const key = getUserKey(type);
    const currentList = JSON.parse(localStorage.getItem(key)) || [];
    if (!currentList.includes(email)) {
      localStorage.setItem(key, JSON.stringify([...currentList, email]));
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/all-users');
        const data = await res.json();

        const hiddenUsers = getHiddenUsers();
        const blockedUsers = getBlockedUsers();

        const filtered = data.filter(
          user =>
            user.email !== currentUserEmail &&
            !hiddenUsers.includes(user.email) &&
            !blockedUsers.includes(user.email)
        );

        setSuggestions(filtered);
      } catch (err) {
        console.error('Error fetching suggested users:', err);
      }
    };

    fetchUsers();
  }, [currentUserEmail]);

  const handleFollow = async (email) => {
    setFollowing(prev =>
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
    try {
      await fetch('http://localhost:5000/api/auth/follow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentUserEmail: currentUserEmail,
        targetUserEmail: email
      }),
    });
  } catch (error) {
    console.error('Error following user:', error);
  }
  };

  const handleHide = (email) => {
    updateUserList('hidden', email);
    setSuggestions(prev => prev.filter(user => user.email !== email));
  };

  const handleBlock = (email) => {
    updateUserList('blocked', email);
    setSuggestions(prev => prev.filter(user => user.email !== email));
  };

  return (
    <div className="suggested-users">
      {suggestions.length === 0 ? (
        <p>No suggestions found</p>
      ) : (
        suggestions.map((user, index) => {
          const imageSrc =
            user.profilePhoto && user.profilePhoto.length > 30
              ? user.profilePhoto.startsWith('data:image')
                ? user.profilePhoto
                : `data:image/jpeg;base64,${user.profilePhoto}`
              : '/avatar.png';

          return (
            <div key={index} className="suggested-user-card">
              <img
                src={imageSrc}
                alt="avatar"
                className="suggested-user-avatar"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div className="user-info">
                <p style={{ margin: 0 }}>{user.name}</p>
                <p style={{ margin: 0, fontSize: '12px', color: 'gray' }}>{user.college}</p>
              </div>

              <button
                className={`follow-button ${following.includes(user.email) ? 'following' : ''}`}
                onClick={() => handleFollow(user.email)}
              >
                {following.includes(user.email) ? 'Following' : 'Follow'}
              </button>

              <div className="menu-container">
                <span
                  className="menu-dots"
                  onClick={() => setMenuOpenIndex(menuOpenIndex === index ? null : index)}
                >
                  ⋮
                </span>

                {menuOpenIndex === index && (
                  <div className="dropdown-menu">
                    <p onClick={() => handleHide(user.email)}>Hide</p>
                    <p onClick={() => handleBlock(user.email)}>Block</p>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SuggestedUsers;
