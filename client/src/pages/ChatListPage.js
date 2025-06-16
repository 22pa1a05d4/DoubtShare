// // client/src/pages/ChatPage.js
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// // import './ChatPage.css';

// const ChatPage = () => {
//   const { targetEmail } = useParams();
//   const myEmail = localStorage.getItem('userEmail');

//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/messages/${myEmail}/${targetEmail}`)
//       .then(res => res.json())
//       .then(setMessages);
//   }, [myEmail, targetEmail]);

//   const sendMessage = async () => {
//     if (!text.trim()) return;
//     const msg = { sender: myEmail, receiver: targetEmail, text };
//     await fetch('http://localhost:5000/api/messages', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(msg),
//     });
//     setMessages(prev => [...prev, { ...msg, time: new Date() }]);
//     setText('');
//   };

//   return (
//     <div className="chat-container">
//       <h2>Chat with {targetEmail}</h2>
//       <div className="chat-box">
//         {messages.map((m, i) => (
//           <div key={i} className={m.sender === myEmail ? 'my-msg' : 'their-msg'}>
//             <p>{m.text}</p>
//             <span>{new Date(m.time).toLocaleTimeString()}</span>
//           </div>
//         ))}
//       </div>
//       <div className="input-bar">
//         <input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

// // client/src/pages/ChatListPage.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ChatListPage.css';

// const ChatListPage = () => {
//   const myEmail = localStorage.getItem('userEmail');
//   const [chats, setChats] = useState([]); // list of emails you messaged
//   const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [text, setText] = useState('');
//   const navigate = useNavigate();

//   // Simulate recent users (you can fetch from server in real apps)
//   useEffect(() => {
//     fetch('http://localhost:5000/api/auth/all-users')
//       .then(res => res.json())
//       .then(data => {
//         const otherUsers = data.filter(user => user.email !== myEmail);
//         setChats(otherUsers);
//       });
//   }, [myEmail]);

//   const selectChat = async (userEmail) => {
//     setSelectedUser(userEmail);
//     const res = await fetch(`http://localhost:5000/api/messages/${myEmail}/${userEmail}`);
//     const data = await res.json();
//     setMessages(data);
//   };

//   const sendMessage = async () => {
//     if (!text.trim()) return;
//     const msg = { sender: myEmail, receiver: selectedUser, text };
//     await fetch('http://localhost:5000/api/messages', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(msg),
//     });
//     setMessages(prev => [...prev, { ...msg, time: new Date() }]);
//     setText('');
//   };

//   return (
//     <div className="chatlist-container">
//       <div className="sidebar">
//         <h3>Messages</h3>
//         {chats.map(user => (
//           <div
//             key={user.email}
//             className={`chat-user ${selectedUser === user.email ? 'active' : ''}`}
//             onClick={() => selectChat(user.email)}
//           >
//             {user.name || user.email}
//           </div>
//         ))}
//       </div>

//       <div className="chat-window">
//         {selectedUser ? (
//           <>
//             <div className="chat-header">Chat with {selectedUser}</div>
//             <div className="chat-body">
//               {messages.map((m, i) => (
//                 <div key={i} className={`msg ${m.sender === myEmail ? 'sent' : 'received'}`}>
//                   <div className="msg-text">{m.text}</div>
//                   <div className="msg-time">{new Date(m.time).toLocaleTimeString()}</div>
//                 </div>
//               ))}
//             </div>
//             <div className="chat-input">
//               <input
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Type a message..."
//               />
//               <button onClick={sendMessage}>Send</button>
//             </div>
//           </>
//         ) : (
//           <div className="chat-placeholder">Select a chat to start messaging</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatListPage;

// client/src/pages/ChatListPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ChatListPage.css';

const ChatListPage = () => {
  const myEmail = localStorage.getItem('userEmail');
  const [chats, setChats] = useState([]); // list of users
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preSelectedEmail = queryParams.get('selected');

  const selectChat = async (userEmail) => {
    setSelectedUser(userEmail);
    const res = await fetch(`http://localhost:5000/api/messages/${myEmail}/${userEmail}`);
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch('http://localhost:5000/api/auth/all-users');
      const data = await res.json();
      const otherUsers = data.filter(user => user.email !== myEmail);
      setChats(otherUsers);

      // If URL has ?selected=user@example.com, pre-select that chat
      if (preSelectedEmail && otherUsers.find(u => u.email === preSelectedEmail)) {
        selectChat(preSelectedEmail);
      }
    };
    fetchChats();
  }, [myEmail]);

  const sendMessage = async () => {
    if (!text.trim() || !selectedUser) return;
    const msg = { sender: myEmail, receiver: selectedUser, text };

    await fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    });

    setMessages(prev => [...prev, { ...msg, time: new Date() }]);
    setText('');
  };

  return (
    <div className="chatlist-container">
      <div className="sidebar">
        <h3>Messages</h3>
        {chats.map(user => (
          <div
            key={user.email}
            className={`chat-user ${selectedUser === user.email ? 'active' : ''}`}
            onClick={() => selectChat(user.email)}
          >
            {user.name || user.email}
          </div>
        ))}
      </div>

      <div className="chat-window">
        {selectedUser ? (
          <>
            <div className="chat-header">Chat with {selectedUser}</div>
            <div className="chat-body">
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.sender === myEmail ? 'sent' : 'received'}`}>
                  <div className="msg-text">{m.text}</div>
                  <div className="msg-time">{new Date(m.time).toLocaleTimeString()}</div>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="chat-placeholder">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default ChatListPage;
