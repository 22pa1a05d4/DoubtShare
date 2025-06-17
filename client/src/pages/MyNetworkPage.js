
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// import './MyNetworkPage.css';

// const MyNetworkPage = () => {
//   const email = localStorage.getItem('userEmail');
//   const blockKey = `blockedUsers_${email}`;

//   const [following, setFollowing] = useState([]);
//   const [blocked, setBlocked]     = useState([]);
//   const [activeTab, setActiveTab] = useState('following'); // default tab
//   const [menuIdx,   setMenuIdx]   = useState(null);

//   /* fetch both lists once */
//   useEffect(() => {
//     const fetchLists = async () => {
//       const res  = await fetch(`http://localhost:5000/api/auth/following/${email}`);
//       const f    = await res.json();
//       const bl   = JSON.parse(localStorage.getItem(blockKey)) || [];
//       setFollowing(f);
//       setBlocked(bl);
//     };
//     fetchLists();
//   }, [email]);

//   /* ---- actions ---- */
//   const unFollow = async (target) => {
//     await fetch('http://localhost:5000/api/auth/unfollow', {
//       method : 'POST',
//       headers: { 'Content-Type':'application/json' },
//       body   : JSON.stringify({ currentUserEmail: email, targetUserEmail: target }),
//     });
//     setFollowing(prev => prev.filter(e => e !== target));
//     setMenuIdx(null);
//   };

//   const block    = (target) => {
//     const newList = [...blocked, target];
//     localStorage.setItem(blockKey, JSON.stringify(newList));
//     setBlocked(newList);
//     setFollowing(prev => prev.filter(e => e !== target));
//     setMenuIdx(null);
//   };

//   const unBlock  = (target) => {
//     const newList = blocked.filter(e => e !== target);
//     localStorage.setItem(blockKey, JSON.stringify(newList));
//     setBlocked(newList);
//   };
 
//   const hide     = (target) => {    // local hide only
//     setFollowing(prev => prev.filter(e => e !== target));
//     setMenuIdx(null);
//   };

//   /* ---- render helpers ---- */
//   const Row = (emailStr, idx, isBlocked = false) => (
//     <div key={idx} className="net-row">
//       {/* avatar placeholder with first letter */}
//       <div className="avatar">{emailStr[0].toUpperCase()}</div>
//       <div className="row-info">
//         <p className="row-name">{emailStr}</p>
//       </div>

//       {/* right‑side controls */}
//       {isBlocked ? (
//         <button onClick={() => unBlock(emailStr)} className="pill danger">Un‑block</button>
//       ) : (
//         <>
//           <button className="pill">Following</button>
//           <Link to={`/chat-list?selected=${user.email}`}>Message</Link>

           
//           <span className="dots" onClick={() => setMenuIdx(menuIdx === idx ? null : idx)}>⋮</span>
//           {menuIdx === idx && (
//             <div className="mini-menu">
//               <p onClick={() => unFollow(emailStr)}>Un‑follow</p>
//               <p onClick={() => hide(emailStr)}>Hide</p>
//               <p onClick={() => block(emailStr)}>Block</p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );

//   return (
//     <div className="network-wrapper">
//       <h2>My Network</h2>

//       {/* Tabs */}
//       <div className="tabs">
//         <span
//           className={activeTab === 'following' ? 'tab active' : 'tab'}
//           onClick={() => setActiveTab('following')}
//         >
//           Following ({following.length})
//         </span>
//         <span
//           className={activeTab === 'blocked' ? 'tab active' : 'tab'}
//           onClick={() => setActiveTab('blocked')}
//         >
//           Blocked ({blocked.length})
//         </span>
//       </div>

//       {/* Lists */}
//       {activeTab === 'following' ? (
//         following.length === 0 ? <p>No follows yet.</p>
//         : following.map((e,i) => Row(e,i,false))
//       ) : (
//         blocked.length === 0 ? <p>No blocked users.</p>
//         : blocked.map((e,i) => Row(e,i,true))
//       )}
//     </div>
//   );
// };

// export default MyNetworkPage;



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './MyNetworkPage.css';

// const MyNetworkPage = () => {
//   const email = localStorage.getItem('userEmail');
//   const blockKey = `blockedUsers_${email}`;

//   const [following, setFollowing] = useState([]);
//   const [blocked, setBlocked] = useState([]);
//   const [activeTab, setActiveTab] = useState('following');
//   const [menuIdx, setMenuIdx] = useState(null);

//   useEffect(() => {
//     const fetchLists = async () => {
//       const res = await fetch(`http://localhost:5000/api/auth/following/${email}`);
//       const f = await res.json();
//       const bl = JSON.parse(localStorage.getItem(blockKey)) || [];
//       setFollowing(f);
//       setBlocked(bl);
//     };
//     fetchLists();
//   }, [email]);

//   const unFollow = async (target) => {
//     await fetch('http://localhost:5000/api/auth/unfollow', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ currentUserEmail: email, targetUserEmail: target }),
//     });
//     setFollowing(prev => prev.filter(e => e !== target));
//     setMenuIdx(null);
//   };

//   const block = (target) => {
//     const newList = [...blocked, target];
//     localStorage.setItem(blockKey, JSON.stringify(newList));
//     setBlocked(newList);
//     setFollowing(prev => prev.filter(e => e !== target));
//     setMenuIdx(null);
//   };

//   const unBlock = (target) => {
//     const newList = blocked.filter(e => e !== target);
//     localStorage.setItem(blockKey, JSON.stringify(newList));
//     setBlocked(newList);
//   };

//   const hide = (target) => {
//     setFollowing(prev => prev.filter(e => e !== target));
//     setMenuIdx(null);
//   };

//   const Row = (emailStr, idx, isBlocked = false) => (
//     <div key={idx} className="net-row">
//       <div className="avatar">{emailStr[0].toUpperCase()}</div>
//       <div className="row-info">
//         <p className="row-name">{emailStr}</p>
//       </div>

//       {isBlocked ? (
//         <button onClick={() => unBlock(emailStr)} className="pill danger">Un‑block</button>
//       ) : (
//         <>
//           <button className="pill">Following</button>
//           {/* 🔧 Fixed: use emailStr instead of undefined 'user' */}
// <Link to={`/chat-list?selected=${emailStr}`}>Message</Link>



//           <span className="dots" onClick={() => setMenuIdx(menuIdx === idx ? null : idx)}>⋮</span>
//           {menuIdx === idx && (
//             <div className="mini-menu">
//               <p onClick={() => unFollow(emailStr)}>Un‑follow</p>
//               <p onClick={() => hide(emailStr)}>Hide</p>
//               <p onClick={() => block(emailStr)}>Block</p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );

//   return (
//     <div className="network-wrapper">
//       <h2>My Network</h2>

//       <div className="tabs">
//         <span
//           className={activeTab === 'following' ? 'tab active' : 'tab'}
//           onClick={() => setActiveTab('following')}
//         >
//           Following ({following.length})
//         </span>
//         <span
//           className={activeTab === 'blocked' ? 'tab active' : 'tab'}
//           onClick={() => setActiveTab('blocked')}
//         >
//           Blocked ({blocked.length})
//         </span>
//       </div>

//       {activeTab === 'following' ? (
//         following.length === 0 ? <p>No follows yet.</p>
//           : following.map((e, i) => Row(e, i, false))
//       ) : (
//         blocked.length === 0 ? <p>No blocked users.</p>
//           : blocked.map((e, i) => Row(e, i, true))
//       )}
//     </div>
//   );
// };

// export default MyNetworkPage;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MyNetworkPage.css';
import ProfilePopup from '../components/ProfilePopup';

const MyNetworkPage = () => {
  const email = localStorage.getItem('userEmail');
  const blockKey = `blockedUsers_${email}`;

  const [following, setFollowing] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [activeTab, setActiveTab] = useState('following');
  const [menuIdx, setMenuIdx] = useState(null);
  const [popupUser, setPopupUser] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      const res = await fetch(`http://localhost:5000/api/auth/following/${email}`);
      const f = await res.json();
      const bl = JSON.parse(localStorage.getItem(blockKey)) || [];
      setFollowing(f);
      setBlocked(bl);
    };
    fetchLists();
  }, [email]);

  const unFollow = async (target) => {
    await fetch('http://localhost:5000/api/auth/unfollow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentUserEmail: email, targetUserEmail: target }),
    });
    setFollowing(prev => prev.filter(e => e !== target));
    setMenuIdx(null);
  };

  const block = (target) => {
    const newList = [...blocked, target];
    localStorage.setItem(blockKey, JSON.stringify(newList));
    setBlocked(newList);
    setFollowing(prev => prev.filter(e => e !== target));
    setMenuIdx(null);
  };

  const unBlock = (target) => {
    const newList = blocked.filter(e => e !== target);
    localStorage.setItem(blockKey, JSON.stringify(newList));
    setBlocked(newList);
  };

  const hide = (target) => {
    setFollowing(prev => prev.filter(e => e !== target));
    setMenuIdx(null);
  };

  const handleShowProfile = async (emailStr) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/profile/${emailStr}`);
      const data = await res.json();
      setPopupUser(data);
    } catch (err) {
      console.error('Popup fetch failed:', err);
    }
  };

  const Row = (emailStr, idx, isBlocked = false) => (
    <div
      key={idx}
      className="net-row"
      onClick={() => handleShowProfile(emailStr)}
      style={{ cursor: 'pointer' }}
    >
      <div className="avatar">{emailStr[0].toUpperCase()}</div>

      <div className="row-info">
        <p className="row-name">{emailStr}</p>
      </div>

      {isBlocked ? (
        <button onClick={(e) => { e.stopPropagation(); unBlock(emailStr); }} className="pill danger">Un‑block</button>
      ) : (
        <>
          <button className="pill" onClick={(e) => e.stopPropagation()}>Following</button>
          <Link
            to={`/chat-list?selected=${emailStr}`}
            className="message-link"
            onClick={(e) => e.stopPropagation()}
          >
            Message
          </Link>
          <span
            className="dots"
            onClick={(e) => {
              e.stopPropagation();
              setMenuIdx(menuIdx === idx ? null : idx);
            }}
          >
            ⋮
          </span>
          {menuIdx === idx && (
            <div className="mini-menu" onClick={(e) => e.stopPropagation()}>
              <p onClick={() => unFollow(emailStr)}>Un‑follow</p>
              <p onClick={() => hide(emailStr)}>Hide</p>
              <p onClick={() => block(emailStr)}>Block</p>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="network-wrapper">
      <h2>My Network</h2>

      <div className="tabs">
        <span
          className={activeTab === 'following' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('following')}
        >
          Following ({following.length})
        </span>
        <span
          className={activeTab === 'blocked' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('blocked')}
        >
          Blocked ({blocked.length})
        </span>
      </div>

      {activeTab === 'following' ? (
        following.length === 0 ? <p>No follows yet.</p>
          : following.map((e, i) => Row(e, i, false))
      ) : (
        blocked.length === 0 ? <p>No blocked users.</p>
          : blocked.map((e, i) => Row(e, i, true))
      )}

      {popupUser && <ProfilePopup user={popupUser} onClose={() => setPopupUser(null)} />}
    </div>
  );
};

export default MyNetworkPage;
