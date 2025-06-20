// client/components/ShareModal.jsx
import React, { useEffect, useState } from 'react';
import './PostCard.css';

const ShareModal = ({ meEmail, post, onClose }) => {
  const [list,     setList]     = useState([]);   // [{name,email}]
  const [selected, setSelected] = useState(new Set());

  /* load followings + make sure post owner is present */
  useEffect(() => {
    (async () => {
      const resFollow  = await fetch(`http://localhost:5000/api/auth/following/${meEmail}`);
      const emails     = await resFollow.json();  // ["a@x","b@y"]

      const resUsers   = await fetch('http://localhost:5000/api/auth/all-users');
      const allUsers   = await resUsers.json();

      let rows = emails
        .map(e => allUsers.find(u => u.email.toLowerCase() === e.toLowerCase()))
        .filter(Boolean);

      if (!rows.find(u => u.email === post.email) && post.email !== meEmail) {
        const ownerObj =
          allUsers.find(u => u.email === post.email) || { email:post.email };
        rows.unshift(ownerObj);
      }
      setList(rows);
    })();
  }, [meEmail, post.email]);

  const toggle = (em) => {
    setSelected(prev => {
      const n = new Set(prev);
      n.has(em) ? n.delete(em) : n.add(em);
      return n;
    });
  };

  const send = async () => {
    if (selected.size === 0) return;
    await fetch('http://localhost:5000/api/messages/share-post', {
      method : 'POST',
      headers: { 'Content-Type':'application/json' },
      body   : JSON.stringify({
        sender  : meEmail,
        postId  : post._id,
        targets : Array.from(selected)
      })
    });
    onClose();
  };

  return (
    <div className="share-overlay">
      <div className="share-card">
        <h3>Select someone to share with:</h3>

        <ul className="share-user-list">
          {list.map(u => (
            <li key={u.email}
                className={selected.has(u.email) ? 'selected' : ''}
                onClick={() => toggle(u.email)}
            >
              {u.name || u.email}
            </li>
          ))}
          {list.length === 0 && <p>You aren’t following anyone.</p>}
        </ul>

        <div className="share-actions">
          <button onClick={onClose}>Cancel</button>
          <button disabled={selected.size===0} onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
