
import React, { useEffect, useState } from 'react';
import './SuggestedUsers.css';

const SuggestedUsers = ({ currentUserEmail }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/all-users');
        const data = await res.json();

        // Filter out current user
        const filtered = data.filter(user => user.email !== currentUserEmail);
        setSuggestions(filtered);
      } catch (err) {
        console.error('Error fetching suggested users:', err);
      }
    };

    fetchUsers();
  }, [currentUserEmail]);

  return (
    <div className="suggested-users">
      {suggestions.length === 0 ? (
        <p>No suggestions found</p>
      ) : (
        suggestions.map((user, index) => {
          // Determine the image source
            console.log('User profilePhoto:', user.profilePhoto);
          const imageSrc = user.profilePhoto
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
              <div>
                <p style={{ margin: 0 }}>{user.name}</p>
                <p style={{ margin: 0, fontSize: '12px', color: 'gray' }}>{user.college}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SuggestedUsers;
