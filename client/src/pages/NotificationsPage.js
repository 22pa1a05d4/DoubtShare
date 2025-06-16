// // src/pages/NotificationsPage.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const NotificationsPage = () => {
//   const userEmail = localStorage.getItem('userEmail');
//   const [notifications, setNotifications] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNotifs = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/notifications/${userEmail}`);
//         const data = await res.json();
//         setNotifications(data);
//       } catch (err) {
//         console.error('Notification fetch error:', err);
//       }
//     };
//     if (userEmail) fetchNotifs();
//   }, [userEmail]);

//   const handleClick = (notif) => {
//     // For now assume postId is in the message or passed later
//     // Navigate to post page
//     navigate(`/post/${notif.postId}`); // You need to include `postId` in each notif
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Notifications</h2>
//       {notifications.length === 0 ? (
//         <p>No notifications yet.</p>
//       ) : (
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           {notifications.map((n, idx) => (
//             <li
//               key={idx}
//               onClick={() => handleClick(n)}
//               style={{
//                 border: '1px solid #ccc',
//                 padding: '10px',
//                 marginBottom: '10px',
//                 cursor: 'pointer',
//               }}
//             >
//               <strong>{n.message}</strong>
//               <br />
//               <small>{new Date(n.createdAt).toLocaleString()}</small>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotificationsPage;


// src/pages/NotificationsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const email = localStorage.getItem('userEmail');
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  /* Fetch notifications */
  useEffect(() => {
    const fetchNotifs = async () => {
      if (!email) return;
      try {
        const res = await fetch(`http://localhost:5000/api/notifications/${email}`);
        const data = await res.json();        // [{message,postId,read,createdAt}]
        setNotifications(data);
      } catch (err) {
        console.error('Notification fetch error:', err);
      }
    };
    fetchNotifs();
  }, [email]);

  /* Handle click */
  const openPost = async (notif) => {
     console.log('Notification clicked:', notif);
    if (!notif.postId){
         console.warn('No postId found!');
        return;
    } 
    // mark this one as read on server
    await fetch('http://localhost:5000/api/notifications/mark-read-one', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, postId: notif.postId }),
    });

    // optimistically mark read in UI
    setNotifications((prev) =>
      prev.map((n) => (n.postId === notif.postId ? { ...n, read: true } : n))
    );

    // navigate to post
    navigate(`/posts/${notif.postId}`, { state: { fromNotif: true } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notifications.map((n, idx) => (
            <li
              key={idx}
              onClick={() => openPost(n)}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                cursor: 'pointer',
                backgroundColor: n.read ? '#fafafa' : '#fff7e7',
              }}
            >
              <strong>{n.message}</strong>
              <br />
              <small>{new Date(n.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
