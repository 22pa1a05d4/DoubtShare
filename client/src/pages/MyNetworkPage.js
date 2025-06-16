// import React, { useEffect, useState } from 'react';

// const MyNetworkPage = () => {
//   const email = localStorage.getItem('userEmail');
//   const [following, setFollowing] = useState([]);
//   const [blocked,   setBlocked]   = useState([]);

//   /* helper to read / write localStorage blocked list */
//   const blockKey = `blockedUsers_${email}`;

//   /* fetch following + blocked */
//   useEffect(() => {
//     const loadData = async () => {
//       const res  = await fetch(`http://localhost:5000/api/auth/following/${email}`);
//       const list = await res.json();
//       setFollowing(list);

//       const bl = JSON.parse(localStorage.getItem(blockKey)) || [];
//       setBlocked(bl);
//     };
//     loadData();
//   }, [email]);

//   /* Un‑follow */
//   const unfollow = async (target) => {
//     await fetch('http://localhost:5000/api/auth/unfollow', {   // we’ll add this route
//       method : 'POST',
//       headers: { 'Content-Type':'application/json' },
//       body   : JSON.stringify({ currentUserEmail: email, targetUserEmail: target }),
//     });
//     setFollowing(prev => prev.filter(e => e !== target));
//     window.dispatchEvent(new Event('profile-updated'));  // optional refresh
//   };

//   /* Un‑block */
//   const unblock = (target) => {
//     const newList = blocked.filter(e => e !== target);
//     localStorage.setItem(blockKey, JSON.stringify(newList));
//     setBlocked(newList);
//   };

//   return (
//     <div style={{ padding:'20px' }}>
//       <h2>My Network</h2>
//       <div style={{ display:'flex', gap:'40px' }}>
//         {/* Following column */}
//         <div style={{ flex:1 }}>
//           <h3>Following ({following.length})</h3>
//           {following.length === 0
//             ? <p>No follows yet.</p>
//             : following.map(e => (
//                 <div key={e} style={{ border:'1px solid #ddd', padding:'8px', marginBottom:'6px' }}>
//                   {e}
//                   <button style={{ float:'right' }} onClick={() => unfollow(e)}>Unfollow</button>
//                 </div>
//               ))
//           }
//         </div>

//         {/* Blocked column */}
//         <div style={{ flex:1 }}>
//           <h3>Blocked ({blocked.length})</h3>
//           {blocked.length === 0
//             ? <p>No blocked accounts.</p>
//             : blocked.map(e => (
//                 <div key={e} style={{ border:'1px solid #ddd', padding:'8px', marginBottom:'6px' }}>
//                   {e}
//                   <button style={{ float:'right' }} onClick={() => unblock(e)}>Unblock</button>
//                 </div>
//               ))
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyNetworkPage;



import React, { useEffect, useState } from 'react';
import './MyNetworkPage.css';

const MyNetworkPage = () => {
  const email = localStorage.getItem('userEmail');
  const blockKey = `blockedUsers_${email}`;

  const [following, setFollowing] = useState([]);
  const [blocked, setBlocked]     = useState([]);
  const [activeTab, setActiveTab] = useState('following'); // default tab
  const [menuIdx,   setMenuIdx]   = useState(null);

  /* fetch both lists once */
  useEffect(() => {
    const fetchLists = async () => {
      const res  = await fetch(`http://localhost:5000/api/auth/following/${email}`);
      const f    = await res.json();
      const bl   = JSON.parse(localStorage.getItem(blockKey)) || [];
      setFollowing(f);
      setBlocked(bl);
    };
    fetchLists();
  }, [email]);

  /* ---- actions ---- */
  const unFollow = async (target) => {
    await fetch('http://localhost:5000/api/auth/unfollow', {
      method : 'POST',
      headers: { 'Content-Type':'application/json' },
      body   : JSON.stringify({ currentUserEmail: email, targetUserEmail: target }),
    });
    setFollowing(prev => prev.filter(e => e !== target));
    setMenuIdx(null);
  };

  const block    = (target) => {
    const newList = [...blocked, target];
    localStorage.setItem(blockKey, JSON.stringify(newList));
    setBlocked(newList);
    setFollowing(prev => prev.filter(e => e !== target));
    setMenuIdx(null);
  };

  const unBlock  = (target) => {
    const newList = blocked.filter(e => e !== target);
    localStorage.setItem(blockKey, JSON.stringify(newList));
    setBlocked(newList);
  };

  const hide     = (target) => {    // local hide only
    setFollowing(prev => prev.filter(e => e !== target));
    setMenuIdx(null);
  };

  /* ---- render helpers ---- */
  const Row = (emailStr, idx, isBlocked = false) => (
    <div key={idx} className="net-row">
      {/* avatar placeholder with first letter */}
      <div className="avatar">{emailStr[0].toUpperCase()}</div>
      <div className="row-info">
        <p className="row-name">{emailStr}</p>
      </div>

      {/* right‑side controls */}
      {isBlocked ? (
        <button onClick={() => unBlock(emailStr)} className="pill danger">Un‑block</button>
      ) : (
        <>
          <button className="pill">Following</button>
          <span className="dots" onClick={() => setMenuIdx(menuIdx === idx ? null : idx)}>⋮</span>
          {menuIdx === idx && (
            <div className="mini-menu">
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

      {/* Tabs */}
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

      {/* Lists */}
      {activeTab === 'following' ? (
        following.length === 0 ? <p>No follows yet.</p>
        : following.map((e,i) => Row(e,i,false))
      ) : (
        blocked.length === 0 ? <p>No blocked users.</p>
        : blocked.map((e,i) => Row(e,i,true))
      )}
    </div>
  );
};

export default MyNetworkPage;
