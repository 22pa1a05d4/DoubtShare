// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// // import './ChatPage.css'; // optional

// const ChatPage = () => {
//   const { targetEmail } = useParams(); // from route: /chat/:targetEmail
//   const myEmail = localStorage.getItem('userEmail');

//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const res = await fetch(`http://localhost:5000/api/messages/${myEmail}/${targetEmail}`);
//       const data = await res.json();
//       setMessages(data);
//     };
//     fetchMessages();
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
//     <div className="chatpage-container">
//       <div className="chat-header">
//         <h3>Chat with {targetEmail}</h3>
//       </div>

//       <div className="chat-body">
//         {messages.map((m, i) => (
//           <div key={i} className={`chat-msg ${m.sender === myEmail ? 'sent' : 'received'}`}>
//             <div className="msg-text">{m.text}</div>
//             <div className="msg-time">{new Date(m.time).toLocaleTimeString()}</div>
//           </div>
//         ))}
//       </div>

//       <div className="chat-input-bar">
//         <input
//           type="text"
//           value={text}
//           onChange={e => setText(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


// client/src/pages/ChatPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import './ChatPage.css';

const ChatPage = () => {
  const { targetEmail } = useParams();
  const myEmail = localStorage.getItem('userEmail');

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`http://localhost:5000/api/messages/${myEmail}/${targetEmail}`);
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
  }, [myEmail, targetEmail]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const msg = { sender: myEmail, receiver: targetEmail, text };
    await fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    });
    setMessages(prev => [...prev, { ...msg, time: new Date() }]);
    setText('');
  };

  return (
    <div className="chat-page">
      <h2>Chat with {targetEmail}</h2>
      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === myEmail ? 'my-msg' : 'their-msg'}>
            <p>{m.text}</p>
            <span>{new Date(m.time).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="chat-input-bar">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
