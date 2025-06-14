// import React, { useEffect, useState } from 'react';
// import PostCard from '../components/PostCard';
// import './MyPostsPage.css';

// const MyPostsPage = () => {
//   const [myPosts, setMyPosts] = useState([]);
//   const email = localStorage.getItem('userEmail');

//   const fetchMine = async () => {
//     const res  = await fetch(`http://localhost:5000/api/posts/my-posts/${email}`);
//     const data = await res.json();
//     setMyPosts(data);
//   };

//   useEffect(() => { fetchMine(); }, []);

//   /* Delete handler */
//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this post?')) return;
//     await fetch(`http://localhost:5000/api/posts/${id}`, {
//       method : 'DELETE',
//       headers: { 'Content-Type':'application/json' },
//       body   : JSON.stringify({ email }),   // proves ownership
//     });
//     fetchMine(); // refresh list
//   };

//   return (
//     <div className="my-posts-page">
//       <h2>My Posts</h2>

//       {myPosts.length === 0
//         ? <p>You have no posts yet.</p>
//         : myPosts.map(p => (
//             <PostCard
//               key={p._id}
//               post={p}
//               showDelete          // ⬅️ custom prop for delete button
//               onDelete={() => handleDelete(p._id)}
//             />
//           ))
//       }
//     </div>
//   );
// };

// export default MyPostsPage;



// client/src/pages/MyPostsPage.jsx
import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import './MyPostsPage.css';

const MyPostsPage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const email = localStorage.getItem('userEmail');

  const fetchMine = async () => {
    const res = await fetch(`http://localhost:5000/api/posts/my-posts/${email}`);
    const data = await res.json();
    setMyPosts(data);
  };

  useEffect(() => {
    fetchMine();
  }, []);

  const removePostFromUI = (id) => {
    setMyPosts(prev => prev.filter(post => post._id !== id));
  };

  return (
    <div className="my-posts-page">
      <h2>My Posts</h2>

      {myPosts.length === 0 ? (
        <p>You have no posts yet.</p>
      ) : (
        myPosts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            showDelete
            onDelete={() => removePostFromUI(post._id)}
          />
        ))
      )}
    </div>
  );
};

export default MyPostsPage;
