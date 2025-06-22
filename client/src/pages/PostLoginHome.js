







//final

// import React, { useEffect, useState } from 'react';
// import FeedNavbar from '../components/FeedNavbar';
// import './PostLoginHome.css';
// import SuggestedUsers from '../components/SuggestedUsers';

// const PostLoginHome = () => {
//   const [userInfo, setUserInfo] = useState({
//     name: '',
//     college: '',
//     branch: ''
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [newPost, setNewPost] = useState({
//     description: '',
//     image: null
//   });
//   const [userPosts, setUserPosts] = useState([]);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const email = localStorage.getItem('userEmail');
//       console.log("Email", email);
//       if (!email) {
//         console.warn("No userEmail found in localStorage");
//         return;
//       }

//       try {
//         const res = await fetch(`http://localhost:5000/api/auth/profile/${email}`);
//         const data = await res.json();
//         console.log("fetched:", data);
//         setUserInfo(data);
       
     
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const fetchMyPosts = async () => {
//     const email = localStorage.getItem('userEmail');
//     if (!email) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/posts/my-posts/${email}`);
//       const data = await res.json();
//       setUserPosts(data);
//     } catch (err) {
//       console.error('Error fetching user data:', err);
//     }
//   };

//   const handleSubmitPost = async () => {
//     if (!newPost.description.trim()) {
//       alert("Description is required!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("description", newPost.description);
//     if (newPost.image) {
//       formData.append("image", newPost.image);
//     }
//     formData.append("email", localStorage.getItem("userEmail"));

//     try {
//       const res = await fetch("http://localhost:5000/api/posts/create", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await res.text();
//       alert(result);
//       setShowModal(false);
//       setNewPost({ description: '', image: null });
//     } catch (err) {
//       console.error("Post upload failed:", err);
//       alert("Error uploading post");
//     }
//   };

//   return (
//     <div className="post-login-home">
//       <FeedNavbar />
      
//       {/* 👇 Wrap layout in a flex row */}
//       <div className="main-content" style={{ display: 'flex', justifyContent: 'space-between' }}>
        
//         {/* Left Sidebar */}
//         <div className="left-sidebar">
//           <div className="profile-summary-card">
//             <div className="profile-header">
//               <div className="profile-banner"></div>
//               <img src="/avatar.png" alt="Profile" className="profile-avatar" />
//             </div>

//             <div className="profile-info">
//               <h3>{userInfo.name || 'Loading...'}</h3>
//               <p className="profile-desc">Studying at {userInfo.college}</p>
//               <p className="profile-location">{userInfo.branch}</p>
//             </div>

//             <hr />
//             <div className="profile-stats">
//               <p>Saved posts</p>
//               <p onClick={fetchMyPosts} style={{ cursor: 'pointer', color: 'grey' }}>My posts</p>
//               <p>Logout</p>
//             </div>
//           </div>
//         </div>

//         {/* Center Feed */}
//         <div className="feed" style={{ width: '45%' }}>
//           <h2>Welcome back!</h2>
//           {userPosts.length > 0 && (
//             <div className="my-posts-section">
//               <h3>My Posts</h3>
//               {userPosts.map((post) => (
//                 <div key={post._id} className="post">
//                   <p>{post.description}</p>
//                   {post.image && (
//                     <img
//                       src={`http://localhost:5000/uploads/${post.image}`}
//                       alt="User Post"
//                       style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Right Sidebar - Suggested Users */}
//         <div className="right-sidebar" style={{ width: '25%' }}>
//           <h3>Suggested for you</h3>
//           <SuggestedUsers currentUserEmail={localStorage.getItem('userEmail')} />
//         </div>
//       </div>

//       {/* Modal for adding post */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Add Doubt Post</h3>
//             <textarea
//               placeholder="Enter your doubt or description"
//               value={newPost.description}
//               onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
//               required
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setNewPost({ ...newPost, image: e.target.files[0] })}
//             />
//             <div className="modal-actions">
//               <button onClick={handleSubmitPost}>Post</button>
//               <button onClick={() => setShowModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Floating Action Button */}
//       <button className="fab" onClick={() => setShowModal(true)}>+</button>
//     </div>
//   );
// };

// export default PostLoginHome;




// import React, { useEffect, useState } from 'react';
// import FeedNavbar from '../components/FeedNavbar';
// import SuggestedUsers from '../components/SuggestedUsers';
// import PostCard from '../components/PostCard';            // ⬅️ NEW
// import './PostLoginHome.css';

// const PostLoginHome = () => {
//   /* ─────────────────────────────
//      STATE
//   ───────────────────────────── */
//   const [userInfo, setUserInfo] = useState({
//     name: '',
//     college: '',
//     branch: '',
//     profilePhoto: ''
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [newPost, setNewPost] = useState({ description: '', image: null });

//   const [userPosts, setUserPosts] = useState([]);   // my own
//   const [feedPosts, setFeedPosts] = useState([]);   // others

//   /* ─────────────────────────────
//      FETCH PROFILE
//   ───────────────────────────── */
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const email = localStorage.getItem('userEmail');
//       if (!email) return;

//       try {
//         const res = await fetch(`http://localhost:5000/api/auth/profile/${email}`);
//         const data = await res.json();
//         setUserInfo(data);
//       } catch (err) {
//         console.error('Error fetching user data:', err);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   /* ─────────────────────────────
//      FETCH MY POSTS (when button clicked)
//   ───────────────────────────── */
//   const fetchMyPosts = async () => {
//     const email = localStorage.getItem('userEmail');
//     if (!email) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/posts/my-posts/${email}`);
//       const data = await res.json();
//       setUserPosts(data);
//     } catch (err) {
//       console.error('Error fetching posts:', err);
//     }
//   };

//   /* ─────────────────────────────
//      FETCH FEED (others’ posts) – once on load
//   ───────────────────────────── */
//   useEffect(() => {
//     const fetchFeed = async () => {
//       const email = localStorage.getItem('userEmail');
//       if (!email) return;

//       try {
//         const res = await fetch(`http://localhost:5000/api/posts/feed/${email}`);
//         const data = await res.json();
//         setFeedPosts(data);
//       } catch (err) {
//         console.error('Error fetching feed:', err);
//       }
//     };

//     fetchFeed();
//   }, []);

//   /* ─────────────────────────────
//      NEW POST HANDLER
//   ───────────────────────────── */
//   const handleSubmitPost = async () => {
//     if (!newPost.description.trim()) {
//       alert('Description is required!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('description', newPost.description);
//     if (newPost.image) formData.append('image', newPost.image);
//     formData.append('email', localStorage.getItem('userEmail'));

//     try {
//       const res = await fetch('http://localhost:5000/api/posts/create', {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await res.text();
//       alert(result);
//       setShowModal(false);
//       setNewPost({ description: '', image: null });
//     } catch (err) {
//       console.error('Post upload failed:', err);
//       alert('Error uploading post');
//     }
//   };

//   /* ─────────────────────────────
//      RENDER
//   ───────────────────────────── */
//   return (
//     <div className="post-login-home">
//       <FeedNavbar />

//       <div className="main-content">
//         {/* ══════════ LEFT SIDEBAR ══════════ */}
//         <aside className="left-sidebar">
//           <div className="profile-summary-card">
//             <div className="profile-header">
//               <div className="profile-banner" />
//               <img
//                 src={userInfo.profilePhoto || '/avatar.png'}
//                 alt="Profile"
//                 className="profile-avatar"
//               />
//             </div>

//             <div className="profile-info">
//               <h3>{userInfo.name || 'Loading...'}</h3>
//               <p className="profile-desc">Studying at {userInfo.college}</p>
//               <p className="profile-location">{userInfo.branch}</p>
//             </div>

//             <hr />
//             <div className="profile-stats">
//               <p>Saved posts</p>
//               <p onClick={fetchMyPosts} style={{ cursor: 'pointer', color: 'grey' }}>
//                 My posts
//               </p>
//               <p>Logout</p>
//             </div>
//           </div>
//         </aside>

//         {/* ══════════ CENTRE FEED ══════════ */}
//         <main className="feed">
//           <h2>Welcome back!</h2>

//           {/* ─── My own posts (optional) ─── */}
//           {userPosts.length > 0 && (
//             <>
//               <h3>My Posts</h3>
//               {userPosts.map((p) => (
//                 <PostCard key={p._id} post={p} />
//               ))}
//               <hr style={{ margin: '2rem 0' }} />
//             </>
//           )}

//           {/* ─── Others’ doubts ─── */}
//           <h3>Doubts from Others</h3>
//           {feedPosts.length === 0 ? (
//             <p>No posts from others yet.</p>
//           ) : (
//             feedPosts.map((p) => <PostCard key={p._id} post={p} />)
//           )}
//         </main>

//         {/* ══════════ RIGHT SIDEBAR ══════════ */}
//         <aside className="right-sidebar">
//           <h3>Suggested for you</h3>
//           <SuggestedUsers currentUserEmail={localStorage.getItem('userEmail')} />
//         </aside>
//       </div>

//       {/* ══════════ ADD‑POST MODAL ══════════ */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Add Doubt Post</h3>
//             <textarea
//               placeholder="Enter your doubt or description"
//               value={newPost.description}
//               onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
//               required
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setNewPost({ ...newPost, image: e.target.files[0] })}
//             />
//             <div className="modal-actions">
//               <button onClick={handleSubmitPost}>Post</button>
//               <button onClick={() => setShowModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Floating add button */}
//       <button className="fab" onClick={() => setShowModal(true)}>
//         +
//       </button>
//     </div>
//   );
// };

// export default PostLoginHome;




// import React, { useEffect, useState } from 'react';
// import FeedNavbar from '../components/FeedNavbar';
// import SuggestedUsers from '../components/SuggestedUsers';
// import PostCard from '../components/PostCard';
// import './PostLoginHome.css';

// const PostLoginHome = () => {
//   const [userInfo, setUserInfo] = useState({
//     name: '',
//     college: '',
//     branch: '',
//     profilePhoto: ''
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [newPost, setNewPost] = useState({ description: '', image: null });

//   const [userPosts, setUserPosts] = useState([]);
//   const [feedPosts, setFeedPosts] = useState([]);

//   /* ───── Fetch user profile ───── */
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const email = localStorage.getItem('userEmail');
//       if (!email) return;

//       try {
//         const res = await fetch(`http://localhost:5000/api/auth/profile/${email}`);
//         const data = await res.json();
//         setUserInfo(data);
//       } catch (err) {
//         console.error('Error fetching user data:', err);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   /* ───── My posts (on click) ───── */
//   const fetchMyPosts = async () => {
//     const email = localStorage.getItem('userEmail');
//     if (!email) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/posts/my-posts/${email}`);
//       const data = await res.json();
//       setUserPosts(data);
//     } catch (err) {
//       console.error('Error fetching posts:', err);
//     }
//   };

//   /* ───── Feed posts (on load + refresh) ───── */
//   const fetchFeed = async () => {
//     const email = localStorage.getItem('userEmail');
//     if (!email) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/posts/feed/${email}`);
//       const data = await res.json();
//       setFeedPosts(data);
//     } catch (err) {
//       console.error('Error fetching feed:', err);
//     }
//   };

//   useEffect(() => {
//     fetchFeed();
//   }, []);

//   /* ───── Submit new post ───── */
//   const handleSubmitPost = async () => {
//     if (!newPost.description.trim()) {
//       alert('Description is required!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('description', newPost.description);
//     if (newPost.image) formData.append('image', newPost.image);
//     formData.append('email', localStorage.getItem('userEmail'));

//     try {
//       const res = await fetch('http://localhost:5000/api/posts/create', {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await res.text();
//       alert(result);
//       setShowModal(false);
//       setNewPost({ description: '', image: null });

//       fetchFeed(); // refresh
//     } catch (err) {
//       console.error('Post upload failed:', err);
//       alert('Error uploading post');
//     }
//   };

//   return (
//     <div className="post-login-home">
//       <FeedNavbar />

//       <div className="main-content">
//         {/* LEFT */}
//         <aside className="left-sidebar">
//           <div className="profile-summary-card">
//             <div className="profile-header">
//               <div className="profile-banner" />
//               <img
//                 src={userInfo.profilePhoto || '/avatar.png'}
//                 alt="Profile"
//                 className="profile-avatar"
//               />
//             </div>

//             <div className="profile-info">
//               <h3>{userInfo.name || 'Loading...'}</h3>
//               <p className="profile-desc">Studying at {userInfo.college}</p>
//               <p className="profile-location">{userInfo.branch}</p>
//             </div>

//             <hr />
//             <div className="profile-stats">
//               <p>Saved posts</p>
//               <p onClick={fetchMyPosts} style={{ cursor: 'pointer', color: 'grey' }}>
//                 My posts
//               </p>
//               <p>Logout</p>
//             </div>
//           </div>
//         </aside>

//         {/* FEED CENTER */}
//         <main className="feed">
//           <h2>Welcome back!</h2>

//           {userPosts.length > 0 && (
//             <>
//               <h3>My Posts</h3>
//               {userPosts.map((p) => (
//                 <PostCard key={p._id} post={p} />
//               ))}
//               <hr style={{ margin: '2rem 0' }} />
//             </>
//           )}

//           <h3>Doubts from Others</h3>
//           {feedPosts.length === 0 ? (
//             <p>No posts from others yet.</p>
//           ) : (
//             feedPosts.map((p) => (
//               <PostCard key={p._id} post={p} refreshFeed={fetchFeed} />
//             ))
//           )}
//         </main>

//         {/* RIGHT */}
//         <aside className="right-sidebar">
//           <h3>Suggested for you</h3>
//           <SuggestedUsers currentUserEmail={localStorage.getItem('userEmail')} />
//         </aside>
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Add Doubt Post</h3>
//             <textarea
//               placeholder="Enter your doubt or description"
//               value={newPost.description}
//               onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
//               required
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setNewPost({ ...newPost, image: e.target.files[0] })}
//             />
//             <div className="modal-actions">
//               <button onClick={handleSubmitPost}>Post</button>
//               <button onClick={() => setShowModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <button className="fab" onClick={() => setShowModal(true)}>
//         +
//       </button>
//     </div>
//   );
// };

// export default PostLoginHome;



//finallll

// client/src/pages/PostLoginHome.js
import React, { useEffect, useState } from 'react';
import FeedNavbar      from '../components/FeedNavbar';
import SuggestedUsers  from '../components/SuggestedUsers';
import PostCard        from '../components/PostCard';
import { Link } from 'react-router-dom';
import './PostLoginHome.css';

const PostLoginHome = () => {
  const [userInfo,  setUserInfo]  = useState({ name:'', college:'', branch:'', profilePhoto:'' });
  const [showModal, setShowModal] = useState(false);
  const [newPost,   setNewPost]   = useState({ description:'', image:null });
  const [userPosts, setUserPosts] = useState([]);
  const [feedPosts, setFeedPosts] = useState([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

// Close dropdown if clicked outside
useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest('.clickable-avatar') && !e.target.closest('.profile-menu')) {
      setProfileOpen(false);
    }
  };

  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
}, []);

  /* ── profile ── */
  useEffect(() => {
  const email = localStorage.getItem('userEmail');
  if (!email) return;

  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/profile/${email}`);
      const data = await response.json();

      console.log("Fetched profile data:", data); // Optional: for debugging
      setUserInfo(data);
    } catch (err) {
      console.error('Profile fetch error:', err);
    } finally {
      setIsLoadingProfile(false); // ✅ Ensures loading stops no matter what
    }
  };

  fetchProfile();
}, []);


  /* ── my posts ── */
  const fetchMyPosts = async () => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    const res  = await fetch(`http://localhost:5000/api/posts/my-posts/${email}`);
    const data = await res.json();
    setUserPosts(data);
  };
 const handlePhotoChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const fd = new FormData();
  fd.append('profilePhoto', file);
  fd.append('email', localStorage.getItem('userEmail'));

  try {
    const res = await fetch('http://localhost:5000/api/auth/update-photo', {
      method: 'PUT',
      body: fd,
    });
    const updated = await res.json();
    setUserInfo((prev) => ({ ...prev, profilePhoto: updated.profilePhoto }));
    setProfileOpen(false);
  } catch (err) {
    alert('Failed to update photo');
  }
};

const handleRemovePhoto = async () => {
  const email = localStorage.getItem('userEmail');
  try {
    const res = await fetch(`http://localhost:5000/api/auth/remove-photo/${email}`, {
      method: 'PUT',
    });
    await res.json();
    setUserInfo((prev) => ({ ...prev, profilePhoto: '' }));
    setProfileOpen(false);
  } catch (err) {
    alert('Failed to remove photo');
  }
};

  /* ── feed ── */
  const fetchFeed = async () => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    const res  = await fetch(`http://localhost:5000/api/posts/feed/${email}`);
    const data = await res.json();
    setFeedPosts(data);
  };
  useEffect(() => { fetchFeed(); }, []);

  /* ── create post ── */
  const handleSubmitPost = async () => {
    if (!newPost.description.trim()) return alert('Description required');

    const fd = new FormData();
    fd.append('description', newPost.description);
    if (newPost.image) fd.append('image', newPost.image);
    fd.append('email', localStorage.getItem('userEmail'));
    if (newPost.title) fd.append('title', newPost.title);
  if (newPost.tags) fd.append('tags', newPost.tags); 
  try{
    await fetch('http://localhost:5000/api/posts/create', { method:'POST', body:fd });
    setShowModal(false);
    setNewPost({ description:'',title: '', tags: '', image:null });
  }catch(error){
     console.error('Failed to create post', error);
    alert('Something went wrong. Try again.');
  }
  };

  return (
    <div className="post-login-home">
      <FeedNavbar />

      <div className="main-content">
        {/* LEFT */}
        <aside className="left-sidebar">
          <div className="profile-summary-card">
            <div className="profile-header">
              <div className="profile-banner" />
              <div style={{ position: 'relative' }}>
  <img
    src={userInfo.profilePhoto || '/avatar.png'}
    alt="profile"
    className="profile-avatar clickable-avatar"
    onClick={() => setProfileOpen((prev) => !prev)}
  />
  {profileOpen && (
    <div className="profile-menu">
      <label htmlFor="newPic" className="menu-item">Change Photo</label>
      <input
        id="newPic"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handlePhotoChange}
      />
      <button className="remove-btn" onClick={handleRemovePhoto}>Remove Photo</button>
    </div>
  )}
</div>

            </div>
            <div className="profile-info">
              <h3>
  {isLoadingProfile
    ? 'Loading…'
    : `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim() || 'No name'}
</h3>

              <p className="profile-desc">Studying at {userInfo.college}</p>
              <p className="profile-location">{userInfo.branch}</p>
            </div>
            <hr />
            <div className="profile-stats">
  <Link to="/saved-posts" className="profile-link">Saved Posts</Link>
  <Link to="/my-posts" className="profile-link">My Posts</Link>
  <Link to="/" className="profile-link logout">Logout</Link>
</div>

          </div>
        </aside>

        {/* FEED */}
        <main className="feed">
          <h2>Welcome back!</h2>

          {userPosts.length > 0 && (
            <>
              <Link to="/my-posts" className="nav-icon" style={{ textDecoration:'none', color:'inherit' }}>
        
        </Link>
            </>
          )}

          <h3>Doubts from Others</h3>
          {feedPosts.length === 0
            ? <p>No posts from others yet.</p>
            : feedPosts.map(p => (
                <PostCard key={p._id} post={p} refreshFeed={fetchFeed} />
              ))
          }
        </main>

        {/* RIGHT */}
        <aside className="right-sidebar">
          <h3>Suggested for you</h3>
          <SuggestedUsers currentUserEmail={localStorage.getItem('userEmail')} />
        </aside>
      </div>

      {/* MODAL */}
      {/* {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Doubt Post</h3>
            <textarea
              placeholder="Enter your doubt or description"
              value={newPost.description}
              onChange={e => setNewPost({ ...newPost, description:e.target.value })}
            />
            <input
              type="file"

              accept="image/*"
              onChange={e => setNewPost({ ...newPost, image:e.target.files[0] })}
            />
            <div className="modal-actions">
              <button onClick={handleSubmitPost}>Post</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )} */}
      {/* MODAL */}
{showModal && (
  <div className="modal-overlay">
    <div className="modal-content fancy-modal">
      <h2>Post Your Doubt</h2>

      {/* TITLE */}
      <input
        type="text"
        className="fancy-input"
        placeholder="What's your doubt about?"
        value={newPost.title || ''}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />

      {/* DESCRIPTION */}
      <textarea
        className="fancy-textarea"
        placeholder="Explain your doubt in detail..."
        value={newPost.description}
        onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
      />

      {/* TAGS */}
      <input
        type="text"
        className="fancy-input"
        placeholder="Add tags (e.g. calculus, integration)"
        value={newPost.tags || ''}
        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
      />

      {/* IMAGE UPLOAD */}
      <label className="upload-btn">
        📎 Add Media
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => setNewPost({ ...newPost, image: e.target.files[0] })}
        />
      </label>

      {/* ACTION BUTTONS */}
      <div className="modal-actions fancy-buttons">
        <button className="post-btn" onClick={handleSubmitPost}>Post Doubt</button>
        <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}


      <button className="fab" onClick={() => setShowModal(true)}>+</button>
    </div>
  );
};

export default PostLoginHome;

