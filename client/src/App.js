import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import Home from './pages/Home';
import PostLoginHome from './pages/PostLoginHome';
import MyPostsPage    from './pages/MyPostsPage'; 
import NotificationsPage from './pages/NotificationsPage';
import MyNetworkPage from './pages/MyNetworkPage';
import ChatListPage from './pages/ChatListPage';
import SinglePostPage from './pages/SinglePostPage';
import SavedPosts from './pages/SavedPosts';
import ChatPage from './pages/ChatPage';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home />}/> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/hom" element={<PostLoginHome />} />
        <Route path="/my-posts" element={<MyPostsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
         <Route path="/network" element={<MyNetworkPage />} />
        <Route path="/posts/:postId" element={<SinglePostPage />} />
        <Route path="/chat/:targetEmail" element={<ChatPage />} />
<Route path="/chat-list" element={<ChatListPage />} />
<Route path="/saved-posts" element={<SavedPosts />} />

      </Routes>
    </Router>
  );
}

export default App;
