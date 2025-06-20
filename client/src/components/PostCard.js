
// // client/src/components/PostCard.js
// import React, { useState } from 'react';
// import './PostCard.css';

// /**
//  * Re‑usable post card.
//  *
//  * Props
//  * ─────
//  * post         : the post object
//  * refreshFeed  : (optional) fn to refresh parent list
//  * showDelete   : (optional) boolean, show delete button if true
//  * onDelete     : (optional) fn to execute when delete clicked
//  */
// const PostCard = ({ post, refreshFeed, showDelete = false, onDelete }) => {
//   const [saved, setSaved]     = useState(false);
//   const [showReply, setShow]  = useState(false);
//   const [reply, setReply]     = useState('');

//   /* ───────── helpers ───────── */

//   // Build a safe absolute URL for the image
//   const getImgSrc = () => {
//     if (!post.imageUrl) return null;
//     const path = post.imageUrl.startsWith('/uploads')
//       ? post.imageUrl
//       : `/uploads/${post.imageUrl.replace(/^\/?/, '')}`;
//     return `http://localhost:5000${path}`;
//   };

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     alert('Post link copied!');
//   };

//   const handleSave = () => setSaved((prev) => !prev);

//   const submitComment = async () => {
//     if (!reply.trim()) return;
//     try {
//       await fetch(`http://localhost:5000/api/posts/${post._id}/comment`, {
//         method : 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body   : JSON.stringify({
//           commenterEmail: localStorage.getItem('userEmail'),
//           text          : reply.trim(),
//         }),
//       });
//       setReply('');
//       setShow(false);
//       refreshFeed?.();
//     } catch (err) {
//       console.error('Comment failed', err);
//     }
//   };

//   /* ───────── render ───────── */

//   return (
//     <div className="post-card">
//       {/* image */}
//       {getImgSrc() && (
//         <img
//           src={getImgSrc()}
//           alt="Post"
//           className="post-image"
//           onError={(e) => (e.target.style.display = 'none')}
//         />
//       )}

//       {/* description */}
//       {post.description && (
//         <p className="post-description">{post.description}</p>
//       )}

//       {/* actions */}
//       <div className="post-actions">
//         <button className="primary" onClick={() => setShow((v) => !v)}>
//           Answer
//         </button>
//         <button onClick={handleShare}>Share</button>
//         <button onClick={handleSave}>{saved ? 'Saved' : 'Save'}</button>

//         {/* Delete button shown only when showDelete=true */}
//         {showDelete && (
//           <button className="danger" onClick={onDelete}>
//             Delete
//           </button>
//         )}
//       </div>

//       {/* quick reply box */}
//       {showReply && (
//         <div className="reply-box">
//           <textarea
//             placeholder="Write your answer…"
//             value={reply}
//             onChange={(e) => setReply(e.target.value)}
//           />
//           <button className="primary small" onClick={submitComment}>
//             Send
//           </button>
//         </div>
//       )}

//       {/* comments list */}
//       {post.comments?.length > 0 && (
//         <div className="comments">
//           {post.comments.map((c, i) => (
//             <p key={i}>
//               <strong>{c.commenter}</strong> {c.text}
//             </p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;









// // client/src/components/PostCard.js
// import React, { useState } from 'react';
// import './PostCard.css';

// const PostCard = ({ post, refreshFeed }) => {
//   /* ── state ─────────────────── */
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [newAnswer, setNewAnswer] = useState('');
//   const [answers, setAnswers] = useState(post.comments || []);
//   const [saved, setSaved] = useState(false);

//   /* ── helper: who owns post ─── */
//   const currentEmail = localStorage.getItem('userEmail');
//   const isMyPost = currentEmail === post.email;

//   /* ── build safe image URL ───── */
//   const getImgSrc = () => {
//     if (!post.imageUrl) return null;
//     const path = post.imageUrl.startsWith('/uploads')
//       ? post.imageUrl
//       : `/uploads/${post.imageUrl.replace(/^\/?/, '')}`;
//     return `http://localhost:5000${path}`;
//   };

//   /* ── submit answer (only if not my post) ─ */
//   const submitAnswer = async () => {
//     if (!newAnswer.trim()) return;
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/posts/${post._id}/comment`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             commenterEmail: currentEmail,
//             text: newAnswer.trim(),
//           }),
//         }
//       );
//       const data = await res.json(); // { user, text }
//       setAnswers((prev) => [...prev, data]);
//       setNewAnswer('');
//       refreshFeed?.();
//     } catch (err) {
//       console.error('Error posting answer', err);
//     }
//   };

//   /* ── delete my post ─────────── */
//   const handleDelete = async () => {
//     if (!window.confirm('Delete this post?')) return;
//     try {
//       await fetch(`http://localhost:5000/api/posts/${post._id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: currentEmail }),
//       });
//       refreshFeed?.();
//     } catch (err) {
//       console.error('Delete failed', err);
//       alert('Failed to delete');
//     }
//   };

//   /* ── JSX ───────────────────── */
//   return (
//     <div className="post-card">
//       {/* Image */}
//       {getImgSrc() && (
//         <img
//           src={getImgSrc()}
//           alt="Post"
//           className="post-image"
//           onError={(e) => (e.target.style.display = 'none')}
//         />
//       )}

//       {/* Description */}
//       {post.description && (
//         <p className="post-description">{post.description}</p>
//       )}

//       {/* Actions */}
//       <div className="post-actions">
//         <button onClick={() => setShowAnswers((v) => !v)}>
//           {showAnswers
//             ? 'Hide Answers'
//             : isMyPost
//             ? 'View Answers'
//             : 'View / Answer'}
//         </button>

//         <button
//           onClick={() => navigator.clipboard.writeText(window.location.href)}
//         >
//           Share
//         </button>

//         {isMyPost ? (
//           <button className="danger" onClick={handleDelete}>
//             Delete
//           </button>
//         ) : (
//           <button onClick={() => setSaved((p) => !p)}>
//             {saved ? 'Saved' : 'Save'}
//           </button>
//         )}
//       </div>

//       {/* Answers */}
//       {showAnswers && (
//         <div className="answer-section">
//           {/* textarea only if NOT my post */}
//           {!isMyPost && (
//             <>
//               <textarea
//                 className="answer-textbox"
//                 placeholder="Write your answer…"
//                 value={newAnswer}
//                 onChange={(e) => setNewAnswer(e.target.value)}
//               />
//               <button className="submit-btn" onClick={submitAnswer}>
//                 Send
//               </button>
//             </>
//           )}

//           {/* List of answers */}
//           <div className="all-answers">
//             {answers.length === 0 ? (
//               <p className="no-answers">No answers yet.</p>
//             ) : (
//               answers.map((a, idx) => (
//                 <div className="single-answer" key={idx}>
//                   <strong>{a.user}</strong>
//                   <p>{a.text}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;




// // client/src/components/PostCard.js
// import React, { useState } from 'react';
// import './PostCard.css';

// const PostCard = ({ post, refreshFeed, onDelete }) => {
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [newAnswer, setNewAnswer] = useState('');
//   const [answers, setAnswers] = useState(post.comments || []);
//   const [saved, setSaved] = useState(false);

//   const currentEmail = localStorage.getItem('userEmail');
//   const isMyPost = currentEmail === post.email;

//   const getImgSrc = () => {
//     if (!post.imageUrl) return null;
//     const path = post.imageUrl.startsWith('/uploads')
//       ? post.imageUrl
//       : `/uploads/${post.imageUrl.replace(/^\/?/, '')}`;
//     return `http://localhost:5000${path}`;
//   };

//   const submitAnswer = async () => {
//     if (!newAnswer.trim()) return;
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/posts/${post._id}/comment`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             commenterEmail: currentEmail,
//             text: newAnswer.trim(),
//           }),
//         }
//       );
//       const data = await res.json();
//       setAnswers(prev => [...prev, data]);
//       setNewAnswer('');
//       refreshFeed?.();
//     } catch (err) {
//       console.error('Error posting answer', err);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm('Delete this post?')) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/posts/${post._id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: currentEmail }),
//       });

//       if (res.ok) {
//         onDelete?.(); // notify parent to remove from UI
//       } else {
//         const msg = await res.text();
//         alert(`Failed to delete: ${msg}`);
//       }
//     } catch (err) {
//       console.error('Delete failed', err);
//       alert('Failed to delete');
//     }
//   };

//   return (
//     <div className="post-card">
//       {getImgSrc() && (
//         <img
//           src={getImgSrc()}
//           alt="Post"
//           className="post-image"
//           onError={(e) => (e.target.style.display = 'none')}
//         />
//       )}

//       {post.description && (
//         <p className="post-description">{post.description}</p>
//       )}

//       <div className="post-actions">
//         <button onClick={() => setShowAnswers((v) => !v)}>
//           {showAnswers
//             ? 'Hide Answers'
//             : isMyPost
//             ? 'View Answers'
//             : 'View / Answer'}
//         </button>

//         <button
//           onClick={() => navigator.clipboard.writeText(window.location.href)}
//         >
//           Share
//         </button>

//         {isMyPost ? (
//           <button className="danger" onClick={handleDelete}>
//             Delete
//           </button>
//         ) : (
//           <button onClick={() => setSaved((p) => !p)}>
//             {saved ? 'Saved' : 'Save'}
//           </button>
//         )}
//       </div>

//       {showAnswers && (
//         <div className="answer-section">
//           {!isMyPost && (
//             <>
//               <textarea
//                 className="answer-textbox"
//                 placeholder="Write your answer…"
//                 value={newAnswer}
//                 onChange={(e) => setNewAnswer(e.target.value)}
//               />
//               <button className="submit-btn" onClick={submitAnswer}>
//                 Send
//               </button>
//             </>
//           )}

//           <div className="all-answers">
//             {answers.length === 0 ? (
//               <p className="no-answers">No answers yet.</p>
//             ) : (
//               answers.map((a, idx) => (
//                 <div className="single-answer" key={idx}>
//                   <strong>{a.user}</strong>
//                   <p>{a.text}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;
import React, { useState } from 'react';
import './PostCard.css';

const PostCard = ({ post, refreshFeed, onDelete }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');
  const [answers, setAnswers] = useState(post.comments || []);
  const [saved, setSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [followingList, setFollowingList] = useState([]);
  const [selectedUsersToSend, setSelectedUsersToSend] = useState([]);


  const currentEmail = localStorage.getItem('userEmail');
  const isMyPost = currentEmail === post.email;

  const getImgSrc = () => {
    if (!post.imageUrl) return null;
    const path = post.imageUrl.startsWith('/uploads')
      ? post.imageUrl
      : `/uploads/${post.imageUrl.replace(/^\/?/, '')}`;
    return `http://localhost:5000${path}`;
  };

  const submitAnswer = async () => {
    if (!newAnswer.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/posts/${post._id}/comment`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            commenterEmail: currentEmail,
            text: newAnswer.trim(),
          }),
        }
      );
      const data = await res.json();
      setAnswers(prev => [...prev, data]);
      setNewAnswer('');
      refreshFeed?.();
    } catch (err) {
      console.error('Error posting answer', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${post._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentEmail }),
      });

      if (res.ok) {
        onDelete?.();
      } else {
        const msg = await res.text();
        alert(`Failed to delete: ${msg}`);
      }
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete');
    }
  };

  const fetchFollowing = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/following/${currentEmail}`);
      const data = await res.json();
      const isCreatorInList = data.some(u => u.email === post.email);
      if (!isCreatorInList && post.email !== currentEmail) {
        data.unshift({ email: post.email, name: post.name || post.email });
      }
      setFollowingList(data);
      setShowShareModal(true);
    } catch (err) {
      console.error('Failed to load following list', err);
    }
  };
const toggleSave = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/posts/save/${currentEmail}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: post._id }),
    });
    if (res.ok) {
      setSaved((prev) => !prev);
    }
  } catch (err) {
    console.error('Failed to save post', err);
  }
};


 const sharePost = async () => {
  if (selectedUsersToSend.length === 0) return;

  const payload = {
    sender: currentEmail,
    text: `Check out this post:\n\n${post.description || ''}`,
    media: getImgSrc() || '',
    mimeType: post.imageUrl ? 'image/jpeg' : null
  };

  try {
    await Promise.all(
      selectedUsersToSend.map(receiver =>
        fetch('http://localhost:5000/api/messages/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, receiver }),
        })
      )
    );
    alert('Post shared successfully!');
    setShowShareModal(false);
    setSelectedUsersToSend([]);
  } catch (err) {
    console.error('Error sharing post', err);
    alert('Failed to share post');
  }
};


  return (
    <div className="post-card">
      {getImgSrc() && (
        <img
          src={getImgSrc()}
          alt="Post"
          className="post-image"
          onError={(e) => (e.target.style.display = 'none')}
        />
      )}

      {post.description && (
        <p className="post-description">{post.description}</p>
      )}

      <div className="post-actions">
        <button onClick={() => setShowAnswers((v) => !v)}>
          {showAnswers
            ? 'Hide Answers'
            : isMyPost
            ? 'View Answers'
            : 'View / Answer'}
        </button>

        <button onClick={fetchFollowing}>Share</button>

        {isMyPost ? (
          <button className="danger" onClick={handleDelete}>
            Delete
          </button>
        ) : (
          <button onClick={() => setSaved((p) => !p)}>
            {saved ? 'Saved' : 'Save'}
          </button>
        )}
      </div>

      {showAnswers && (
        <div className="answer-section">
          {!isMyPost && (
            <>
              <textarea
                className="answer-textbox"
                placeholder="Write your answer…"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button className="submit-btn" onClick={submitAnswer}>
                Send
              </button>
            </>
          )}
          <div className="all-answers">
            {answers.length === 0 ? (
              <p className="no-answers">No answers yet.</p>
            ) : (
              answers.map((a, idx) => (
                <div className="single-answer" key={idx}>
                  <strong>{a.user}</strong>
                  <p>{a.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="share-modal">
          <div className="share-content">
            <h3>Select someone to share with:</h3>
            <ul className="share-user-list">
              {followingList.map((user, idx) => (
                <li
  key={idx}
  className={selectedUsersToSend.includes(user.email) ? 'selected' : ''}
  onClick={() => {
    setSelectedUsersToSend((prev) =>
      prev.includes(user.email)
        ? prev.filter(email => email !== user.email)
        : [...prev, user.email]
    );
  }}
>
  {user.name || user.email || 'Unknown User'}
</li>

              ))}
            </ul>
            <div className="share-actions">
              <button onClick={sharePost} disabled={selectedUsersToSend.length === 0}>Send</button>

              <button onClick={() => setShowShareModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
