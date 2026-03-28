// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { backendURL } from '../helper';

// const PromptCard = ({ prompt, onLike }) => {
//   const [liked, setLiked] = useState(false);
//   const { isAuthenticated } = useAuth();

//   // ✅ Check if already liked on mount
//   useEffect(() => {
//     // Check if this prompt is liked by checking local likes count
//     setLiked(prompt.likes > 50); // Demo logic - real mein backend se check karo
//   }, [prompt.likes]);

//   const showCenteredAlert = (message, bgColor = '#ef4444') => {
//     // Remove existing alerts first
//     const existing = document.querySelector('.auth-alert');
//     if (existing) existing.remove();

//     const alertDiv = document.createElement('div');
//     alertDiv.className = 'auth-alert';
//     alertDiv.innerHTML = `
//       <div style="
//         position: fixed; 
//         top: 50%; left: 50%; 
//         transform: translate(-50%, -50%) scale(1);
//         background: linear-gradient(45deg, ${bgColor}, ${bgColor === '#ef4444' ? '#dc2626' : '#d97706'}); 
//         color: white;
//         padding: 1.75rem 2.5rem; 
//         border-radius: 24px; 
//         z-index: 10001;
//         box-shadow: 0 25px 50px rgba(239,68,68,0.4); 
//         font-weight: 700;
//         text-align: center; 
//         max-width: 340px; 
//         backdrop-filter: blur(20px);
//         border: 1px solid rgba(255,255,255,0.3);
//         animation: alertSlideIn 0.3s ease;
//         font-size: 1.1rem;
//       ">
//         💙 ${message}
//         <div style="font-size: 0.9rem; opacity: 0.95; margin-top: 0.75rem; font-weight: 500;">
//           Click navbar → Sign In with Gmail
//         </div>
//       </div>
//     `;
//     document.body.appendChild(alertDiv);
    
//     // Auto remove with animation
//     setTimeout(() => {
//       alertDiv.style.animation = 'alertSlideOut 0.3s ease forwards';
//       setTimeout(() => alertDiv.remove(), 300);
//     }, 4500);
//   };

//   const handleLike = async (e) => {
//     e.stopPropagation(); // Prevent card hover
    
//     if (!isAuthenticated) {
//       showCenteredAlert('Please sign in to like prompts!');
//       return;
//     }

//     if (!liked) {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           showCenteredAlert('Please login again!', '#f59e0b');
//           return;
//         }

//         console.log('🔥 Liking prompt:', prompt._id);
//         const res = await fetch(`${backendURL}/api/prompts/${prompt._id}/like`, {
//           method: 'PATCH',
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         console.log('Response status:', res.status);
        
//         if (res.ok) {
//           const updatedPrompt = await res.json();
//           setLiked(true);
//           onLike && onLike(prompt._id);
//           console.log('✅ Like successful!');
          
//           // Success animation
//           const successDiv = document.createElement('div');
//           successDiv.innerHTML = `
//             <div style="
//               position: fixed; top: 20%; left: 50%; transform: translateX(-50%);
//               background: linear-gradient(45deg, #10b981, #059669); color: white;
//               padding: 1rem 2rem; border-radius: 20px; z-index: 10001;
//               font-weight: 600; box-shadow: 0 15px 35px rgba(16,185,129,0.4);
//             ">❤️ Liked!</div>
//           `;
//           document.body.appendChild(successDiv);
//           setTimeout(() => successDiv.remove(), 2000);
          
//         } else {
//           console.error('Like failed:', await res.text());
//           showCenteredAlert('Failed to like. Try again!', '#f59e0b');
//         }
//       } catch (error) {
//         console.error('❌ Like network error:', error);
//         showCenteredAlert('Network error. Check connection!', '#f59e0b');
//       }
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(prompt.prompt);
//     const temp = document.createElement('div');
//     temp.textContent = 'Copied!';
//     temp.style.cssText = `
//       position: fixed; top: 20px; right: 20px; 
//       background: linear-gradient(45deg, #10b981, #059669);
//       color: white; padding: 1rem 2rem; border-radius: 50px;
//       font-weight: 600; z-index: 10000; box-shadow: 0 10px 30px rgba(16,185,129,0.4);
//       animation: slideInRight 0.3s ease;
//     `;
//     document.body.appendChild(temp);
//     setTimeout(() => temp.remove(), 2000);
//   };

//   return (
//     <div style={{
//       background: 'rgba(255,255,255,0.05)',
//       borderRadius: '24px',
//       padding: '2rem',
//       backdropFilter: 'blur(20px)',
//       border: '1px solid rgba(255,255,255,0.1)',
//       transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//       cursor: 'pointer',
//       position: 'relative',
//       overflow: 'hidden',
//       minHeight: '420px'
//     }}
//     onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-12px)'}
//     onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//     >
//       {/* Image */}
//       {prompt.imageUrl && (
//         <div style={{
//           width: '100%', height: '200px', borderRadius: '20px',
//           overflow: 'hidden', marginBottom: '1.5rem',
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           position: 'relative'
//         }}>
//           <img 
//             src={prompt.imageUrl} 
//             alt={prompt.title}
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//             onError={(e) => {
//               e.target.style.display = 'none';
//               e.target.parentNode.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
//             }}
//           />
//         </div>
//       )}

//       {/* Title */}
//       <h3 style={{
//         fontSize: '1.5rem', fontWeight: '800', color: 'white',
//         marginBottom: '1rem', lineHeight: '1.3',
//         background: 'linear-gradient(45deg, #a855f7, #ec4899)',
//         WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
//       }}>
//         {prompt.title}
//       </h3>

//       {/* Preview */}
//       <p style={{
//         color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', fontSize: '1rem',
//         marginBottom: '1.75rem', maxHeight: '100px', overflow: 'hidden',
//         fontFamily: 'Inter, -apple-system, sans-serif'
//       }}>
//         {/* "{prompt.prompt.substring(0, 150)}..." */}
//         "{(prompt?.prompt || 'No prompt available').substring(0, 120)}..."

//       </p>

//       {/* Action Buttons */}
//       <div style={{
//         display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//         gap: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)'
//       }}>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             handleCopy();
//           }}
//           style={{
//             flex: 1, background: 'rgba(255,255,255,0.08)', color: 'white',
//             border: 'none', padding: '1.125rem 1.75rem', borderRadius: '16px',
//             fontWeight: '700', cursor: 'pointer', fontSize: '1rem',
//             transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//             border: '1px solid rgba(255,255,255,0.15)'
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.background = 'rgba(255,255,255,0.15)';
//             e.target.style.transform = 'translateY(-2px)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.background = 'rgba(255,255,255,0.08)';
//             e.target.style.transform = 'translateY(0)';
//           }}
//         >
//           📋 Copy Prompt
//         </button>

//         <button
//           onClick={handleLike}
//           disabled={liked}
//           style={{
//             width: '68px', height: '68px', borderRadius: '20px',
//             background: liked 
//               ? 'rgba(107,114,128,0.6)' 
//               : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
//             color: 'white', border: 'none', fontSize: '1.75rem',
//             cursor: liked ? 'not-allowed' : 'pointer',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             boxShadow: liked 
//               ? 'none' 
//               : '0 15px 35px rgba(239,68,68,0.5)',
//             position: 'relative', overflow: 'hidden',
//             transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
//           }}
//           onMouseEnter={(e) => {
//             if (!liked && isAuthenticated) {
//               e.target.style.transform = 'scale(1.05)';
//               e.target.style.boxShadow = '0 20px 45px rgba(239,68,68,0.6)';
//             }
//           }}
//           onMouseLeave={(e) => {
//             if (!liked && isAuthenticated) {
//               e.target.style.transform = 'scale(1)';
//               e.target.style.boxShadow = '0 15px 35px rgba(239,68,68,0.5)';
//             }
//           }}
//         >
//           {liked ? '❤️' : '🤍'}
//           <span style={{ 
//             position: 'absolute', bottom: '4px', right: '4px',
//             fontSize: '0.75rem', fontWeight: '700', opacity: '0.9'
//           }}>
//             {prompt.likes}
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PromptCard;


import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { backendURL } from '../helper';

/* ─── Styles injected once ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    0%   { transform: scale(0.7); opacity: 0; }
    70%  { transform: scale(1.15); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateY(10px) scale(0.9); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes toastOut {
    from { opacity: 1; }
    to   { opacity: 0; transform: translateY(-8px) scale(0.9); }
  }

  .bp-card {
    font-family: 'DM Sans', sans-serif;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.08);
    cursor: pointer;
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1),
                box-shadow 0.35s cubic-bezier(0.4,0,0.2,1);
    position: relative;
    animation: fadeUp 0.45s ease both;
    max-width: 500px;
    width: 100%;
    background: #111;
  }
  .bp-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 28px 52px rgba(0,0,0,0.65);
  }

  /* Full-card image */
  .bp-img-wrap {
    position: relative;
    width: 100%;
    height: 550px;
    background: #1e1e24;
    overflow: hidden;
  }
  .bp-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    transition: transform 0.55s ease;
  }
  .bp-card:hover .bp-img-wrap img {
    transform: scale(1.06);
  }

  /* Gradient scrim — top clear, bottom dark for text */
  .bp-img-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.04) 0%,
      rgba(0,0,0,0.08) 35%,
      rgba(0,0,0,0.62) 62%,
      rgba(0,0,0,0.90) 100%
    );
    pointer-events: none;
    z-index: 1;
  }

  /* Badge top-left */
  .bp-badge {
    font-family: 'Syne', sans-serif;
    position: absolute;
    top: 13px;
    left: 13px;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #fff;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    padding: 5px 11px;
    border-radius: 7px;
    border: 1px solid rgba(255,255,255,0.13);
    z-index: 3;
    white-space: nowrap;
    max-width: calc(100% - 80px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Heart top-right */
  .bp-heart-btn {
    position: absolute;
    top: 11px;
    right: 11px;
    z-index: 3;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
    padding: 0;
    outline: none;
  }
  .bp-heart-btn:hover:not(:disabled) {
    background: rgba(239,68,68,0.35);
    transform: scale(1.12);
  }
  .bp-heart-btn:disabled { cursor: default; }
  .bp-heart-btn.liked .bp-heart-icon {
    animation: popIn 0.35s ease;
  }
  .bp-heart-icon {
    font-size: 1rem;
    line-height: 1;
    display: block;
  }
  .bp-like-count {
    font-size: 0.58rem;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    line-height: 1;
    margin-top: 1px;
  }

  /* Overlay body — transparent, sits on image at bottom */
  .bp-overlay-body {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 14px 14px 16px;
    background: transparent;
  }

  .bp-prompt-text {
    font-size: 0.84rem;
    color: rgba(255,255,255,0.82);
    line-height: 1.6;
    margin: 0 0 12px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bp-actions {
    display: flex;
    gap: 8px;
  }
  .bp-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.83rem;
    font-weight: 600;
    padding: 9px 0;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: background 0.22s, transform 0.18s;
    letter-spacing: 0.01em;
    outline: none;
  }
  .bp-btn:hover  { transform: translateY(-2px); }
  .bp-btn:active { transform: translateY(0); }

  .bp-btn-copy {
    background: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.9);
    border: 1px solid rgba(255,255,255,0.18);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  .bp-btn-copy:hover { background: rgba(255,255,255,0.22); }

  .bp-btn-create {
    background: rgba(255,255,255,0.92);
    color: #111;
  }
  .bp-btn-create:hover { background: #fff; }

  /* Toast */
  .bp-toast {
    position: fixed;
    top: 22px;
    right: 22px;
    padding: 11px 20px;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    color: #fff;
    z-index: 99999;
    box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    animation: toastIn 0.28s ease;
    pointer-events: none;
  }
`;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected) return;
  const s = document.createElement('style');
  s.textContent = STYLES;
  document.head.appendChild(s);
  stylesInjected = true;
}

function showToast(msg, color = '#10b981') {
  const el = document.createElement('div');
  el.className = 'bp-toast';
  el.style.background = color;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'toastOut 0.28s ease forwards';
    setTimeout(() => el.remove(), 300);
  }, 2200);
}

/* ─── Component ─── */
const PromptCard = ({ prompt, onLike }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(prompt.likes ?? 0);
  const { isAuthenticated } = useAuth();

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    setLiked(prompt.likes > 50);
    setLikeCount(prompt.likes ?? 0);
  }, [prompt.likes]);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      showToast('Sign in to like prompts 💙', '#6366f1');
      return;
    }
    if (liked) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) { showToast('Please login again!', '#f59e0b'); return; }
      const res = await fetch(`${backendURL}/api/prompts/${prompt._id}/like`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setLiked(true);
        setLikeCount(c => c + 1);
        onLike && onLike(prompt._id);
        showToast('Liked! ❤️', '#ef4444');
      } else {
        showToast('Failed to like. Try again!', '#f59e0b');
      }
    } catch {
      showToast('Network error. Check connection!', '#f59e0b');
    }
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    showToast('Copied! 📋', '#10b981');
  };

 const handleCreate = (e) => {
  e.stopPropagation();

  const encodedPrompt = encodeURIComponent(prompt.prompt);

  window.open(`https://gemini.google.com/app?q=${encodedPrompt}`, "_blank");
};

  const previewText = (prompt?.prompt || 'No prompt available').substring(0, 150) + '...';

  return (
    <div className="bp-card">
      <div className="bp-img-wrap">

        {/* Image */}
        {prompt.imageUrl ? (
          <img
            src={prompt.imageUrl}
            alt={prompt.title}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #2d2d3a, #1a1a22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.12)', fontSize: '3rem'
          }}>✦</div>
        )}

        {/* Title badge */}
        <div className="bp-badge">{prompt.title}</div>

        {/* Heart button */}
        <button
          className={`bp-heart-btn${liked ? ' liked' : ''}`}
          onClick={handleLike}
          disabled={liked}
          title={liked ? 'Liked' : 'Like this prompt'}
        >
          <span className="bp-heart-icon">{liked ? '❤️' : '🤍'}</span>
          <span className="bp-like-count">{likeCount}</span>
        </button>

        {/* Text + buttons — transparent overlay at bottom of image */}
        <div className="bp-overlay-body">
          <p className="bp-prompt-text">{previewText}</p>
          <div className="bp-actions">
            <button className="bp-btn bp-btn-copy" onClick={handleCopy}>
              📋 Copy
            </button>
            <button className="bp-btn bp-btn-create" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PromptCard;