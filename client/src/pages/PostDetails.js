import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams(); // postId from URL
  const location = useLocation();
  const fromNotif = location.state?.fromNotif;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}
/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        console.error('Post fetch failed', err);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div style={{ padding: '20px' }}>
      {fromNotif && (
        <div style={{ backgroundColor: '#fffae6', border: '1px solid #f0c040', padding: '10px', marginBottom: '10px' }}>
          You arrived here from a notification
        </div>
      )}
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><strong>Posted by:</strong> {post.author}</p>
      <p><small>{new Date(post.createdAt).toLocaleString()}</small></p>
    </div>
  );
};

export default PostDetails;
