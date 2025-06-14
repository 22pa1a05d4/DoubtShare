
// import React, { useState } from 'react';
// import './PostCard.css';

// const PostCard = ({ post, refreshFeed }) => {
//   const [saved, setSaved]   = useState(false);
//   const [showReply, setShow] = useState(false);
//   const [reply, setReply]   = useState('');

//   /* ───────── helpers ───────── */

//   // Build a safe absolute URL for the image
//   const getImgSrc = () => {
//     if (!post.imageUrl) return null;
//     // if imageUrl already starts with '/uploads', keep it; otherwise add it
//     const path =
//       post.imageUrl.startsWith('/uploads')
//         ? post.imageUrl
//         : `/uploads/${post.imageUrl.replace(/^\/?/, '')}`;
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
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           commenterEmail: localStorage.getItem('userEmail'),
//           text: reply.trim(),
//         }),
//       });
//       setReply('');
//       setShow(false);
//       refreshFeed?.();           // refresh parent feed if provided
//     } catch (err) {
//       console.error('Comment failed', err);
//     }
//   };

//   /* ───────── render ───────── */

//   return (
//     <div className="post-card">
//       {/* show the image if present */}
//       {getImgSrc() && (
//         <img
//           src={getImgSrc()}
//           alt="Post"
//           className="post-image"
//           onError={(e) => (e.target.style.display = 'none')} // hide if 404
//         />
//       )}

//       {post.description && (
//         <p className="post-description">{post.description}</p>
//       )}

//       <div className="post-actions">
//         <button className="primary" onClick={() => setShow((v) => !v)}>
//           Answer
//         </button>
//         <button onClick={handleShare}>Share</button>
//         <button onClick={handleSave}>{saved ? 'Saved' : 'Save'}</button>
//       </div>

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


// client/src/components/PostCard.js
import React, { useState } from 'react';
import './PostCard.css';

/**
 * Re‑usable post card.
 *
 * Props
 * ─────
 * post         : the post object
 * refreshFeed  : (optional) fn to refresh parent list
 * showDelete   : (optional) boolean, show delete button if true
 * onDelete     : (optional) fn to execute when delete clicked
 */
const PostCard = ({ post, refreshFeed, showDelete = false, onDelete }) => {
  const [saved, setSaved]     = useState(false);
  const [showReply, setShow]  = useState(false);
  const [reply, setReply]     = useState('');

  /* ───────── helpers ───────── */

  // Build a safe absolute URL for the image
  const getImgSrc = () => {
    if (!post.imageUrl) return null;
    const path = post.imageUrl.startsWith('/uploads')
      ? post.imageUrl
      : `/uploads/${post.imageUrl.replace(/^\/?/, '')}`;
    return `http://localhost:5000${path}`;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Post link copied!');
  };

  const handleSave = () => setSaved((prev) => !prev);

  const submitComment = async () => {
    if (!reply.trim()) return;
    try {
      await fetch(`http://localhost:5000/api/posts/${post._id}/comment`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          commenterEmail: localStorage.getItem('userEmail'),
          text          : reply.trim(),
        }),
      });
      setReply('');
      setShow(false);
      refreshFeed?.();
    } catch (err) {
      console.error('Comment failed', err);
    }
  };

  /* ───────── render ───────── */

  return (
    <div className="post-card">
      {/* image */}
      {getImgSrc() && (
        <img
          src={getImgSrc()}
          alt="Post"
          className="post-image"
          onError={(e) => (e.target.style.display = 'none')}
        />
      )}

      {/* description */}
      {post.description && (
        <p className="post-description">{post.description}</p>
      )}

      {/* actions */}
      <div className="post-actions">
        <button className="primary" onClick={() => setShow((v) => !v)}>
          Answer
        </button>
        <button onClick={handleShare}>Share</button>
        <button onClick={handleSave}>{saved ? 'Saved' : 'Save'}</button>

        {/* Delete button shown only when showDelete=true */}
        {showDelete && (
          <button className="danger" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>

      {/* quick reply box */}
      {showReply && (
        <div className="reply-box">
          <textarea
            placeholder="Write your answer…"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <button className="primary small" onClick={submitComment}>
            Send
          </button>
        </div>
      )}

      {/* comments list */}
      {post.comments?.length > 0 && (
        <div className="comments">
          {post.comments.map((c, i) => (
            <p key={i}>
              <strong>{c.commenter}</strong> {c.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
