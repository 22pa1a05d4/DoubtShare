// client/src/pages/SinglePostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';

const SinglePostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}
/api/posts/${postId}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  if (!post) return <p>Loading post...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Post Details</h2>
      <PostCard post={post} />
    </div>
  );
};

export default SinglePostPage;
