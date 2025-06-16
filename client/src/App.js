import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import PostLoginHome from './pages/PostLoginHome';
import MyPostsPage    from './pages/MyPostsPage'; 
import NotificationsPage from './pages/NotificationsPage';
import MyNetworkPage from './pages/MyNetworkPage';

import SinglePostPage from './pages/SinglePostPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hom" element={<PostLoginHome />} />
        <Route path="/my-posts" element={<MyPostsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
         <Route path="/network" element={<MyNetworkPage />} />
        <Route path="/posts/:postId" element={<SinglePostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
