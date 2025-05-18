//idk
// import React from 'react';
// import FeedNavbar from '../components/FeedNavbar';
// import './PostLoginHome.css';

// const PostLoginHome = () => {
//   return (
//     <div className="post-login-home">
//       <FeedNavbar />
//       <div className="main-content">
//       <div className="left-sidebar">
//   <div className="profile-summary-card">
//     <div className="profile-header">
//       <div className="profile-banner"></div>
//       <img src="/avatar.png" alt="Profile" className="profile-avatar" />
//     </div>
    
//     <div className="profile-info">
//       <h3>Bhavagna Prathipati</h3>
//       <p className="profile-desc">Attended Vishnu Institute of Technology (Autonomous)</p>
//       <p className="profile-location">Bhimavaram, Andhra Pradesh</p>
//     </div>
//     <hr />
//     <div className="profile-stats">
//       <p>Saved posts</p>
//       <p>My posts</p>
//       <p>Logout</p>
//     </div>
   
//   </div>

// </div>

//         <div className="feed">
//           <h2>Welcome back!</h2>
//           <div className="post">Post 1 content goes here...</div>
//           <div className="post">Post 2 content goes here...</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostLoginHome;


//1st

// import React, { useEffect, useState } from 'react';
// import FeedNavbar from '../components/FeedNavbar';
// import './PostLoginHome.css';

// const PostLoginHome = () => {
//   const [userInfo, setUserInfo] = useState({
//     name: '',
//     college: '',
//     branch: ''
//   });

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const email = localStorage.getItem('userEmail');
//       console.log("Email",email);
//       if (!email) {
//         console.warn("No userEmail found in localStorage");
//         return;
//       }
      

//       try {
//         const res = await fetch(`http://localhost:5000/api/auth/profile/${email}`);
//         const data = await res.json();
//         console.log("fetched:",data);
//         setUserInfo(data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   return (
//     <div className="post-login-home">
//       <FeedNavbar />
//       <div className="main-content">
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
//               <p>My posts</p>
//               <p>Logout</p>
//             </div>
//           </div>
//         </div>

//         <div className="feed">
//           <h2>Welcome back!</h2>
//           <div className="post">Post 1 content goes here...</div>
//           <div className="post">Post 2 content goes here...</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostLoginHome;





import React, { useEffect, useState } from 'react';
import FeedNavbar from '../components/FeedNavbar';
import './PostLoginHome.css';

const PostLoginHome = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    college: '',
    branch: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({
    description: '',
    image: null
  });
  const [userPosts,setUserPosts]=useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const email = localStorage.getItem('userEmail');
      console.log("Email", email);
      if (!email) {
        console.warn("No userEmail found in localStorage");
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/auth/profile/${email}`);
        const data = await res.json();
        console.log("fetched:", data);
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserDetails();
  }, []);
  const fetchMyPosts=async()=>{
    const email = localStorage.getItem('userEmail');
    if(!email)return;
    try{
      const res=await fetch(`http://localhost:5000/api/posts/my-posts/${email}`);
      const data=await res.json();
      setUserPosts(data);
    }catch(err){
      console.error('Error fetching user data:', err);
    }
  };
  const handleSubmitPost = async () => {
    if (!newPost.description.trim()) {
      alert("Description is required!");
      return;
    }

    const formData = new FormData();
    formData.append("description", newPost.description);
    if (newPost.image) {
      formData.append("image", newPost.image);
    }
    formData.append("email", localStorage.getItem("userEmail"));

    try {
      const res = await fetch("http://localhost:5000/api/posts/create", {
        method: "POST",
        body: formData,
      });

      const result = await res.text();
      alert(result);
      setShowModal(false);
      setNewPost({ description: '', image: null });
    } catch (err) {
      console.error("Post upload failed:", err);
      alert("Error uploading post");
    }
  };

  return (
    <div className="post-login-home">
      <FeedNavbar />
      <div className="main-content">
        <div className="left-sidebar">
          <div className="profile-summary-card">
            <div className="profile-header">
              <div className="profile-banner"></div>
              <img src="/avatar.png" alt="Profile" className="profile-avatar" />
            </div>

            <div className="profile-info">
              <h3>{userInfo.name || 'Loading...'}</h3>
              <p className="profile-desc">Studying at {userInfo.college}</p>
              <p className="profile-location">{userInfo.branch}</p>
            </div>

            <hr />
            <div className="profile-stats">
              <p>Saved posts</p>
              <p onClick={fetchMyPosts} style={{cursor:'pointer',color:'grey'}}>My posts</p>
              <p>Logout</p>
            </div>
          </div>
        </div>

        <div className="feed">
          <h2>Welcome back!</h2>
          {userPosts.length > 0 && (
  <div className="my-posts-section">
    <h3>My Posts</h3>
    {userPosts.map((post) => (
      <div key={post._id} className="post">
        <p>{post.description}</p>
        {post.image && (
          <img
            src={`http://localhost:5000/uploads/${post.image}`}
            alt="User Post"
            style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }}
          />
        )}
      </div>
    ))}
  </div>
)}

        </div>
      </div>

      {/* Modal for adding post */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Doubt Post</h3>
            <textarea
              placeholder="Enter your doubt or description"
              value={newPost.description}
              onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewPost({ ...newPost, image: e.target.files[0] })}
            />
            <div className="modal-actions">
              <button onClick={handleSubmitPost}>Post</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button className="fab" onClick={() => setShowModal(true)}>+</button>
    </div>
  );
};

export default PostLoginHome;
