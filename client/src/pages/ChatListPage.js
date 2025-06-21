

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


// // client/src/pages/ChatListPage.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './ChatListPage.css';

// const ChatListPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [text, setText] = useState('');

//   const myEmail = localStorage.getItem('userEmail')?.toLowerCase();
//   const queryParams = new URLSearchParams(location.search);
//   const preSelectedEmail = queryParams.get('selected')?.toLowerCase();

//   // Fetch message history
//   const selectChat = async (userEmail) => {
//     setSelectedUser(userEmail);
//     const res = await fetch(`http://localhost:5000/api/messages/${myEmail}/${userEmail}`);
//     const data = await res.json();
//     setMessages(data);
//   };

//   // Fetch chat users
//   useEffect(() => {
//     if (!myEmail) {
//       navigate('/login');
//       return;
//     }

//     const fetchChats = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/messages/chats/${myEmail}`);
//         const usersWhoChatted = await res.json();

//         const allRes = await fetch('http://localhost:5000/api/auth/all-users');
//         const allUsers = await allRes.json();

//         let chatUsers = usersWhoChatted
//   .map(email => allUsers.find(u => u.email.toLowerCase() === email))
//   .filter(u => u); // remove nulls if any


//         if (preSelectedEmail) {
//           const selectedUserData = allUsers.find(u => u.email.toLowerCase() === preSelectedEmail);
//           if (selectedUserData && !chatUsers.find(u => u.email.toLowerCase() === preSelectedEmail)) {
//             chatUsers = [selectedUserData, ...chatUsers];
//           }
//         }

//         setChats(chatUsers);

//         if (preSelectedEmail) {
//           selectChat(preSelectedEmail);
//         } else if (chatUsers.length > 0) {
//           selectChat(chatUsers[0].email);
//         }
//       } catch (error) {
//         console.error('Error loading chats:', error);
//       }
//     };

//     fetchChats();
//   }, [myEmail]);

//   // Send message
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
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [text, setText] = useState('');

//   const myEmail = localStorage.getItem('userEmail')?.toLowerCase();
//   const queryParams = new URLSearchParams(location.search);
//   const preSelectedEmail = queryParams.get('selected')?.toLowerCase();

//   // Select chat and fetch messages
//   const selectChat = async (userEmail) => {
//     setSelectedUser(userEmail);
//     const res = await fetch(`http://localhost:5000/api/messages/${myEmail}/${userEmail}`);
//     const data = await res.json();
//     setMessages(data);
//   };

//   useEffect(() => {
//     if (!myEmail) {
//       navigate('/login');
//       return;
//     }

//     const fetchChats = async () => {
//       try {
//         // Step 1: Get emails you've chatted with
//         const res = await fetch(`http://localhost:5000/api/messages/chats/${myEmail}`);
//         const usersWhoChatted = await res.json(); // Ordered by recency

//         // Step 2: Get user details
//         const allRes = await fetch('http://localhost:5000/api/auth/all-users');
//         const allUsers = await allRes.json();

//         // Step 3: Map emails to user objects
//         let chatUsers = usersWhoChatted
//           .map(email => allUsers.find(u => u.email.toLowerCase() === email))
//           .filter(u => u); // remove nulls

//         // Step 4: Preselected email handling
//         if (preSelectedEmail) {
//           const selectedUserData = allUsers.find(u => u.email.toLowerCase() === preSelectedEmail);
//           if (selectedUserData && !chatUsers.find(u => u.email.toLowerCase() === preSelectedEmail)) {
//             chatUsers = [selectedUserData, ...chatUsers];
//           }
//         }

//         setChats([...chatUsers]); // force re-render

//         // Step 5: Auto-select default chat
//         if (preSelectedEmail) {
//           selectChat(preSelectedEmail);
//         } else if (chatUsers.length > 0) {
//           selectChat(chatUsers[0].email);
//         }
//       } catch (error) {
//         console.error('Error loading chats:', error);
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

// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate, useLocation }          from 'react-router-dom';
// import './ChatListPage.css';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000', { autoConnect:false });

// export default function ChatListPage () {
//   /* ───── basics ───── */
//   const navigate          = useNavigate();
//   const location          = useLocation();
//   const me                = localStorage.getItem('userEmail')?.toLowerCase();
//   const preSel            = new URLSearchParams(location.search).get('selected')?.toLowerCase();

//   /* ───── state ───── */
//   const [chats, setChats]       = useState([]);           // left list (user objects)
//   const [sel,   setSel]         = useState(null);         // selected user email
//   const [msgs,  setMsgs]        = useState([]);           // messages of current chat
//   const [text,  setText]        = useState('');
//   const fileRef                = useRef();

//   /* ───── helpers ───── */
//   const loadThread = async (withUser) => {
//     setSel(withUser);
//     const r = await fetch(`http://localhost:5000/api/messages/${me}/${withUser}`);
//     setMsgs(await r.json());
//   };

//   /* ───── initial data ───── */
//   useEffect(() => {
//     if (!me){ navigate('/login'); return; }

//     /* connect socket once */
//     socket.connect();
//     socket.emit('register', me);
//     socket.on('receiveMessage', m => {
//       // show message only if open thread
//       if (m.sender.toLowerCase() === sel?.toLowerCase()) {
//         setMsgs(prev => [...prev, m]);
//       }
//     });

//     const fetchChats = async () => {
//       /* 1) recent chat partner emails */
//       const resChats  = await fetch(`http://localhost:5000/api/messages/chats/${me}`);
//       const chatEmails = await resChats.json();

//       /* 2) all users → map */
//       const resUsers  = await fetch('http://localhost:5000/api/auth/all-users');
//       const users     = await resUsers.json();

//       let chatUsers = chatEmails
//         .map(e => users.find(u => u.email.toLowerCase() === e))
//         .filter(Boolean);

//       /* 3) append pre‑selected user if not present */
//       if (preSel){
//         const pre = users.find(u => u.email.toLowerCase() === preSel);
//         if (pre && !chatUsers.find(u => u.email.toLowerCase() === preSel)){
//           chatUsers = [pre, ...chatUsers];
//         }
//       }
//       setChats(chatUsers);

//       /* 4) auto select */
//       if (preSel)      loadThread(preSel);
//       else if (chatUsers.length) loadThread(chatUsers[0].email);
//     };
//     fetchChats();

//     /* cleanup */
//     return () => socket.disconnect();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [me]);

//   /* ───── send helpers ───── */
//   const sendText = async () => {
//     if (!text.trim()) return;
//     const body = { sender:me, receiver:sel, text, type:'text' };
//     await fetch('http://localhost:5000/api/messages', {
//       method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)
//     });
//     socket.emit('sendMessage', body);
//     setMsgs(prev => [...prev, { ...body, time:new Date() }]);
//     setText('');
//   };

//   const sendFile = async (file) => {
//     if (!file) return;
//     const fd = new FormData();
//     fd.append('file', file);
//     fd.append('sender',   me);
//     fd.append('receiver', sel);

//     const r = await fetch('http://localhost:5000/api/messages/file', { method:'POST', body:fd });
//     const saved = await r.json();               // { url, mime, ... }
//     socket.emit('sendMessage', saved);
//     setMsgs(prev => [...prev, saved]);
//   };

//   /* ───── scroll to bottom on message add ───── */
//   const bottomRef = useRef();
//   useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}); }, [msgs]);

//   /* ───── render ───── */
//   return (
//     <div className="chat-wrap">
//       {/* ─────────── left list ─────────── */}
//       <aside className="chat-side">
//         <h3>Messages</h3>
//         {chats.map(u => (
//           <div key={u.email}
//                className={`chat-user ${sel===u.email?'active':''}`}
//                onClick={()=>loadThread(u.email)}>
//             {u.name || u.email}
//           </div>
//         ))}
//       </aside>

//       {/* ─────────── right pane ─────────── */}
//       <section className="chat-main">
//         {sel ? (
//           <>
//             <header className="chat-head">Chat with {sel}</header>

//             <div className="chat-body">
//               {msgs.map((m,i)=>(
//                 <div key={i} className={`bubble ${m.sender===me?'me':'them'}`}>
//                   {m.type==='file'
//                     ? <a href={m.url} target="_blank" rel="noreferrer">📎 {m.originalName}</a>
//                     : m.text}
//                   <span className="t">{new Date(m.time).toLocaleTimeString()}</span>
//                 </div>
//               ))}
//               <div ref={bottomRef}/>
//             </div>

//             <footer className="chat-input-row">
//               <input ref={fileRef} type="file" style={{display:'none'}}
//                      onChange={e=>{ sendFile(e.target.files[0]); e.target.value=''; }}/>
//               <button className="pin" onClick={()=>fileRef.current.click()}>📎</button>
//               <input className="msg-input"
//                      value={text}
//                      onKeyDown={e=>e.key==='Enter' && sendText()}
//                      onChange={e=>setText(e.target.value)}
//                      placeholder="Type message…"/>
//               <button className="send" onClick={sendText}>Send</button>
//             </footer>
//           </>
//         ):(
//           <div className="chat-placeholder">Select a chat to start messaging</div>
//         )}
//       </section>
//     </div>
//   );
// }

// // client/src/pages/ChatListPage.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './ChatListPage.css';

// const mimeIsImg   = m => m?.startsWith('image/');
// const mimeIsVideo = m => m?.startsWith('video/');
// const mimeIsAudio = m => m?.startsWith('audio/');

// export default function ChatListPage () {
//   /* ----- basics ----- */
//   const nav          = useNavigate();
//   const loc          = useLocation();
//   const me           = localStorage.getItem('userEmail')?.toLowerCase();
//   const preSel       = new URLSearchParams(loc.search).get('selected')?.toLowerCase();

//   /* ----- state ----- */
//   const [threadList, setThreadList] = useState([]);   // left pane
//   const [withUser,   setWithUser]   = useState(null); // email
//   const [msgs,       setMsgs]       = useState([]);
//   const [text,       setText]       = useState('');

//   const fileInpRef = useRef(null);
//   const bottomRef  = useRef(null);

//   /* scroll down on every new msg */
//   useEffect(() => bottomRef.current?.scrollIntoView({ behaviour:'smooth' }), [msgs]);

//   /* ----- load chats + default thread ----- */
//   useEffect(() => {
//     if (!me) { nav('/login'); return; }

//     const load = async () => {
//       /* who did I chat with? */
//       const r1   = await fetch(`http://localhost:5000/api/messages/chats/${me}`);
//       const peers = await r1.json();

//       /* get user records */
//       const r2   = await fetch('http://localhost:5000/api/auth/all-users');
//       const users= await r2.json();

//       let list = peers
//         .map(e => users.find(u => u.email.toLowerCase() === e))
//         .filter(Boolean);

//       if (preSel) {
//         const extra = users.find(u => u.email.toLowerCase() === preSel);
//         if (extra && !list.find(u => u.email.toLowerCase() === preSel)) {
//           list = [extra, ...list];
//         }
//       }
//       setThreadList(list);

//       const first = preSel || (list[0]?.email);
//       if (first) selectThread(first);
//     };
//     load();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [me]);

//   /* ----- load messages for one thread ----- */
//   const selectThread = async (email) => {
//     setWithUser(email);
//     const r = await fetch(`http://localhost:5000/api/messages/${me}/${email}`);
//     setMsgs(await r.json());
//   };
  
//   /* ----- send text ----- */
//   const sendText = async () => {
//     if (!text.trim()) return;
//     const body = { sender:me, receiver:withUser, text };

//     const r = await fetch('http://localhost:5000/api/messages', {
//       method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)
//     });
//     const saved = await r.json();
//     setMsgs(prev => [...prev, saved]);
//     setText('');
//   };

//   /* ----- send file ----- */
//   const sendFile = async (file) => {
//     if (!file) return;
//     const fd = new FormData();
//     fd.append('file', file);
//     fd.append('sender',   me);
//     fd.append('receiver', withUser);

//     const r = await fetch('http://localhost:5000/api/messages/file', {
//       method:'POST', body:fd
//     });
//     const saved = await r.json();
//     setMsgs(prev => [...prev, saved]);
//   };

//   /* ----- render ----- */
//   return (
//     <div className="chat-wrap">
//       {/* ---------- left ---------- */}
//       <aside className="chat-side">
//         <h3>Messages</h3>
//         {threadList.map(u => (
//           <div key={u.email}
//                className={`chat-user ${withUser===u.email ? 'active':''}`}
//                onClick={() => selectThread(u.email)}>
//             {u.name || u.email}
//           </div>
//         ))}
//       </aside>

//       {/* ---------- right ---------- */}
//       <section className="chat-main">
//         {!withUser ? (
//           <div className="chat-placeholder">Select a chat to start messaging</div>
//         ) : (
//           <>
//             <header className="chat-head">Chat with {withUser}</header>

//             <div className="chat-body">
//               {msgs.map((m,i)=>(
//                 <div key={i} className={`bubble ${m.sender===me?'me':'them'}`}>
//                   {m.type==='file' ? (
//                     mimeIsImg(m.mime)   ? <img src={m.url} alt="img"  className="bubble-img"/> :
//                     mimeIsVideo(m.mime) ? <video src={m.url} controls className="bubble-media"/> :
//                     mimeIsAudio(m.mime) ? <audio src={m.url} controls/> :
//                     <a href={m.url} target="_blank" rel="noreferrer">📎 {m.originalName}</a>
//                   ) : m.text}
//                   <span className="t">{new Date(m.time).toLocaleTimeString()}</span>
//                 </div>
//               ))}
//               <div ref={bottomRef}/>
//             </div>

//             <footer className="chat-input-row">
//               <input ref={fileInpRef} type="file" style={{display:'none'}}
//                      onChange={e=>{ sendFile(e.target.files[0]); e.target.value=''; }}/>
//               <button className="pin" onClick={()=>fileInpRef.current.click()}>📎</button>

//               <textarea
//                 className="msg-box"
//                 rows={2}
//                 value={text}
//                 placeholder="Type message…"
//                 onChange={e=>setText(e.target.value)}
//                 onKeyDown={e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); sendText(); } }}
//               />

//               <button className="send" onClick={sendText}>Send</button>
//             </footer>
//           </>
//         )}
//       </section>
//     </div>
//   );
// }

//final
// client/src/pages/ChatListPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation }            from 'react-router-dom';
import './ChatListPage.css';

/* quick helpers for mime‑type checks */
const mimeIsImg   = m => m?.startsWith('image/');
const mimeIsVideo = m => m?.startsWith('video/');
const mimeIsAudio = m => m?.startsWith('audio/');

export default function ChatListPage () {
  /* ─────────────────── runtime basics ─────────────────── */
  const nav           = useNavigate();
  const loc           = useLocation();
  const me            = localStorage.getItem('userEmail')?.toLowerCase();
  const preSelected   = new URLSearchParams(loc.search).get('selected')?.toLowerCase();

  /* ─────────────────── component state ─────────────────── */
  const [threads, setThreads] = useState([]);  // left‑hand list (user objects)
  const [withUser, setWithUser] = useState(null);
  const [msgs,     setMsgs]     = useState([]);  // messages for active thread
  const [text,     setText]     = useState('');

  /* refs */
  const fileRef   = useRef(null);  // <input type=file … >
  const bottomRef = useRef(null);  // autoscroll helper

  /* ─────────────────── helper: fetch message thread ─────────────────── */
  const loadThread = async (partnerEmail) => {
    setWithUser(partnerEmail);
    const res   = await fetch(
      `http://localhost:5000/api/messages/${me}/${partnerEmail}`
    );
    const data  = await res.json();
    setMsgs(data);
  };
const deleteChat = async () => {
  if (!window.confirm(`Delete all messages with ${withUser}?`)) return;

  try {
    const res = await fetch(
      `http://localhost:5000/api/messages/thread/${me}/${withUser}`,
      { method: 'DELETE' }
    );
    if (res.ok) {
      setMsgs([]); // Clear chat window
      alert('Chat deleted successfully!');
    } else {
      alert('Failed to delete chat');
    }
  } catch (err) {
    console.error('Delete chat failed:', err);
  }
};

  /* ─────────────────── on mount: load chat list & first thread ─────────────────── */
  useEffect(() => {
    if (!me) { nav('/login'); return; }

    const bootstrap = async () => {
      /* 1) all partners (by recent activity) */
      const resPartners = await fetch(`http://localhost:5000/api/messages/chats/${me}`);
      const partnerEmails = await resPartners.json();          // ["a@x","b@y", …]

      /* 2) map → user objects */
      const resUsers = await fetch('http://localhost:5000/api/auth/all-users');
      const allUsers = await resUsers.json();
      let list = partnerEmails
        .map(e => allUsers.find(u => u.email.toLowerCase() === e))
        .filter(Boolean);

      /* 3) include ?selected=user@x.com if not in list yet */
      if (preSelected) {
        const selUser = allUsers.find(u => u.email.toLowerCase() === preSelected);
        if (selUser && !list.find(u => u.email.toLowerCase() === preSelected)) {
          list = [selUser, ...list];
        }
      }
      setThreads(list);

      /* 4) pick default thread */
      const first = preSelected || list?.[0]?.email;
      if (first) loadThread(first);
    };

    bootstrap();
    // eslint‑disable‑next‑line react‑hooks/exhaustive‑deps
  }, [me]);

  /* ─────────────────── auto‑scroll down whenever msgs changes ─────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [msgs]);

  /* ─────────────────── send helpers ─────────────────── */
  const sendText = async () => {
    if (!text.trim() || !withUser) return;

    const payload = { sender:me, receiver:withUser, text };

    const res = await fetch('http://localhost:5000/api/messages/send', {
      method : 'POST',
      headers: { 'Content-Type':'application/json' },
      body   : JSON.stringify(payload)
    });
    if (res.ok) {
      setMsgs(prev => [...prev, { ...payload, time:new Date() }]);
      setText('');
    }
  };
const deleteMessage = async (id) => {
  if (!window.confirm('Delete this message?')) return;

  try {
    const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setMsgs(prev => prev.filter(m => m._id !== id));
    } else {
      alert('Failed to delete message');
    }
  } catch (err) {
    console.error('Delete message error:', err);
  }
};

  const sendFile = async (file) => {
    if (!file || !withUser) return;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('sender',   me);
    fd.append('receiver', withUser);

    const res = await fetch('http://localhost:5000/api/messages/file', {
      method:'POST', body:fd
    });
    if (res.ok) {
      const saved = await res.json();          // {url, mimeType, ...}
      setMsgs(prev => [...prev, saved]);
    }
  };

  /* ─────────────────── UI ─────────────────── */
  return (
    <div className="chat-wrap">

      {/* ──────────────── left side (threads) ──────────────── */}
      <aside className="chat-side">
        <h3>Messages</h3>
        {threads.map(u => (
          <div key={u.email}
               className={`chat-user ${withUser===u.email ? 'active':''}`}
               onClick={() => loadThread(u.email)}>
            {u.name || u.email}
          </div>
        ))}
      </aside>

      {/* ──────────────── right side (conversation) ──────────────── */}
      <section className="chat-main">
        {!withUser ? (
          <div className="chat-placeholder">
            Select a chat to start messaging
          </div>
        ) : (
          <>
            {/* header */}
            <header className="chat-head">
              Chat with {withUser}
              <div style={{ float: 'right' }}>
    <button onClick={deleteChat} style={{ marginRight: '10px' }}>🗑️ Delete Chat</button>
  </div>
            </header>

            {/* message area */}
            <div className="chat-body">
              {msgs.map((m,i) => (
                <div key={i} className={`bubble ${m.sender===me ? 'me':'them'}`}>
                  {/* text or media preview */}
                  {m.mimeType ? (
                    mimeIsImg(m.mimeType)   ? (
                      <img src={m.media || m.url} alt="img" className="bubble-img"/>
                    ) : mimeIsVideo(m.mimeType) ? (
                      <video src={m.media || m.url} controls className="bubble-media"/>
                    ) : mimeIsAudio(m.mimeType) ? (
                      <audio src={m.media || m.url} controls/>
                    ) : (
                      <a href={m.media || m.url} target="_blank" rel="noreferrer">
                        📎 {m.originalName || 'file'}
                      </a>
                    )
                  ) : (
                    m.text
                  )}
                   {m.sender === me && (
      <span
        style={{ color: 'red', float: 'right', cursor: 'pointer' }}
        onClick={() => deleteMessage(m._id)}
      >
        ❌
      </span>
    )}
                  <span className="t">
                    {new Date(m.time).toLocaleTimeString()}
                  </span>
                </div>
              ))}
              <div ref={bottomRef}/>
            </div>

            {/* input row */}
            <footer className="chat-input-row">
              {/* hidden file input */}
              <input
                ref={fileRef}
                type="file"
                style={{ display:'none' }}
                onChange={e => { sendFile(e.target.files[0]); e.target.value=''; }}
              />

              <button className="pin" onClick={() => fileRef.current.click()}>
                📎
              </button>

              <textarea
                className="msg-box"
                rows={2}
                value={text}
                placeholder="Type message…"
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendText();
                  }
                }}
              />

              <button className="send" onClick={sendText}>
                Send
              </button>
            </footer>
          </>
        )}
      </section>
    </div>
  );
}

