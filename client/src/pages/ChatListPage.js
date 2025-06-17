

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

// // client/src/pages/ChatListPage.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './ChatListPage.css';

// const ChatListPage = () => {
//   const myEmail = localStorage.getItem('userEmail');
//   const [chats, setChats] = useState([]); // list of users
//   const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [text, setText] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const preSelectedEmail = queryParams.get('selected');

//   const selectChat = async (userEmail) => {
//     setSelectedUser(userEmail);
//     const res = await fetch(`http://localhost:5000/api/messages/${myEmail}/${userEmail}`);
//     const data = await res.json();
//     setMessages(data);
//   };
//   useEffect(() => {
//   const fetchChats = async () => {
//     const res = await fetch(`http://localhost:5000/api/messages/chats/${myEmail}`);
//     const usersWhoChatted = await res.json();

//     const allRes = await fetch('http://localhost:5000/api/auth/all-users');
//     const allUsers = await allRes.json();

//     let chatUsers = allUsers.filter(u => usersWhoChatted.includes(u.email));

//     // ✅ Add preSelected user ONLY IF it came from Network page
//     if (preSelectedEmail) {
//       const selectedUserData = allUsers.find(u => u.email === preSelectedEmail);
//       if (selectedUserData && !chatUsers.find(u => u.email === preSelectedEmail)) {
//         chatUsers = [selectedUserData, ...chatUsers];
//       }
//     }

//     setChats(chatUsers);

//     // ✅ Select chat only accordingly
//     if (preSelectedEmail) {
//       selectChat(preSelectedEmail);
//     } else if (chatUsers.length > 0) {
//       selectChat(chatUsers[0].email);
//     }
//   };

//   fetchChats();
// }, [myEmail]);



//   const sendMessage = async () => {
//     if (!text.trim() || !selectedUser) return;
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



// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './ChatListPage.css';

// const ChatListPage = () => {
//   const myEmail = localStorage.getItem('userEmail')?.toLowerCase();
//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [text, setText] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const preSelectedEmail = queryParams.get('selected')?.toLowerCase();

//   const selectChat = async (userEmail) => {
//     setSelectedUser(userEmail);
//     const res = await fetch(`http://localhost:5000/api/messages/${myEmail}/${userEmail}`);
//     const data = await res.json();
//     setMessages(data);
//   };

//   useEffect(() => {
//     const fetchChats = async () => {
//       const res = await fetch(`http://localhost:5000/api/messages/chats/${myEmail}`);
//       const usersWhoChatted = await res.json();
//       console.log("usersWhoChatted:", usersWhoChatted);

//       const allRes = await fetch('http://localhost:5000/api/auth/all-users');
//       const allUsers = await allRes.json();
//       console.log("allUsers:", allUsers);

//       let chatUsers = allUsers.filter(u => usersWhoChatted.includes(u.email.toLowerCase()));
//       console.log("Filtered chatUsers:", chatUsers);

//       if (preSelectedEmail) {
//         const selectedUserData = allUsers.find(u => u.email.toLowerCase() === preSelectedEmail);
//         if (selectedUserData && !chatUsers.find(u => u.email.toLowerCase() === preSelectedEmail)) {
//           chatUsers = [selectedUserData, ...chatUsers];
//         }
//       }

//       setChats(chatUsers);

//       if (preSelectedEmail) {
//         selectChat(preSelectedEmail);
//       } else if (chatUsers.length > 0) {
//         selectChat(chatUsers[0].email);
//       }
//     };

//     fetchChats();
//   }, [myEmail]);

//   const sendMessage = async () => {
//     if (!text.trim() || !selectedUser) return;
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
  const navigate = useNavigate();
  const location = useLocation();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState('');

  const myEmail = localStorage.getItem('userEmail')?.toLowerCase();
  const queryParams = new URLSearchParams(location.search);
  const preSelectedEmail = queryParams.get('selected')?.toLowerCase();

  // Fetch message history
  const selectChat = async (userEmail) => {
    setSelectedUser(userEmail);
    const res = await fetch(`http://localhost:5000/api/messages/${myEmail}/${userEmail}`);
    const data = await res.json();
    setMessages(data);
  };

  // Fetch chat users
  useEffect(() => {
    if (!myEmail) {
      navigate('/login');
      return;
    }

    const fetchChats = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/messages/chats/${myEmail}`);
        const usersWhoChatted = await res.json();

        const allRes = await fetch('http://localhost:5000/api/auth/all-users');
        const allUsers = await allRes.json();

        let chatUsers = allUsers.filter(u => usersWhoChatted.includes(u.email.toLowerCase()));

        if (preSelectedEmail) {
          const selectedUserData = allUsers.find(u => u.email.toLowerCase() === preSelectedEmail);
          if (selectedUserData && !chatUsers.find(u => u.email.toLowerCase() === preSelectedEmail)) {
            chatUsers = [selectedUserData, ...chatUsers];
          }
        }

        setChats(chatUsers);

        if (preSelectedEmail) {
          selectChat(preSelectedEmail);
        } else if (chatUsers.length > 0) {
          selectChat(chatUsers[0].email);
        }
      } catch (error) {
        console.error('Error loading chats:', error);
      }
    };

    fetchChats();
  }, [myEmail]);

  // Send message
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
