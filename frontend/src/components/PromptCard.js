
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