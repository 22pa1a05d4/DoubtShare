import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const currentEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}
/api/posts/saved/${currentEmail}`);
        const data = await res.json();
        setSavedPosts(data);
      } catch (err) {
        console.error('Error fetching saved posts', err);
      }
    };

    fetchSaved();
  }, []);

  return (
    <div className="saved-posts-page">
      <h2>My Saved Posts</h2>
      {savedPosts.length === 0 ? (
        <p>You haven't saved any posts yet.</p>
      ) : (
        savedPosts.map(post => (
          <PostCard key={post._id} post={post} refreshFeed={() => {}} />
        ))
      )}
    </div>
  );
};

export default SavedPosts;
