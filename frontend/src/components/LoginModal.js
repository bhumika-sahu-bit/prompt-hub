import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  // 🔥 ESC key close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith('@gmail.com')) {
      setError('Please use a valid Gmail address');
      return;
    }

    setLoading(true);
    try {
      await login(email, name || email.split('@')[0]);
      onClose();
    } catch {
      setError('Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="modal-header">
          <h2>Welcome to PromptHub</h2>
          <p>Sign in to save prompts & favorites</p>
        </div>

        {/* ERROR */}
        {error && <div className="error-box">{error}</div>}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="form">

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="yourname@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Display Name (optional)</label>
            <input
              type="text"
              placeholder="Your display name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading || !email} className="submit-btn">
            {loading ? "Signing in..." : "Sign in with Gmail"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="modal-footer">
          <p>Continue without login</p>
          <button onClick={onClose} className="skip-btn">
            Skip for now
          </button>
        </div>

      </div>

      <style>{`

/* 🔥 OVERLAY (PERFECT CENTER FIX) */
.modal-overlay{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
background:rgba(0,0,0,0.75);
backdrop-filter:blur(12px);
z-index:9999;
animation:fadeIn 0.3s ease;
}

/* 🔥 BOX */
.modal-box{
width:100%;
max-width:420px;
background:#111;
border-radius:18px;
padding:2.2rem;
border:1px solid rgba(255,255,255,0.08);
box-shadow:0 20px 60px rgba(0,0,0,0.6);
animation:scaleIn 0.3s ease;
}

/* HEADER */
.modal-header{
text-align:center;
margin-bottom:1.8rem;
}

.modal-header h2{
color:#fff;
font-size:1.8rem;
margin-bottom:6px;
}

.modal-header p{
color:rgba(255,255,255,0.6);
font-size:0.95rem;
}

/* ERROR */
.error-box{
background:rgba(255,0,0,0.1);
border:1px solid rgba(255,0,0,0.3);
color:#ff6b6b;
padding:10px;
border-radius:8px;
margin-bottom:1rem;
text-align:center;
}

/* FORM */
.form{
display:flex;
flex-direction:column;
gap:1rem;
}

/* INPUT */
.input-group label{
color:#ccc;
font-size:0.85rem;
margin-bottom:4px;
display:block;
}

.input-group input{
width:100%;
padding:12px;
border-radius:10px;
border:1px solid rgba(255,255,255,0.1);
background:rgba(255,255,255,0.05);
color:#fff;
outline:none;
transition:0.2s;
}

.input-group input:focus{
border-color:#a855f7;
box-shadow:0 0 10px rgba(168,85,247,0.4);
}

/* BUTTON */
.submit-btn{
margin-top:10px;
padding:14px;
border:none;
border-radius:12px;
font-weight:600;
background:linear-gradient(45deg,#a855f7,#ec4899);
color:#fff;
cursor:pointer;
transition:0.3s;
}

.submit-btn:hover{
opacity:0.9;
transform:translateY(-1px);
}

/* FOOTER */
.modal-footer{
text-align:center;
margin-top:1.2rem;
color:rgba(255,255,255,0.5);
font-size:0.85rem;
}

.skip-btn{
margin-top:8px;
padding:10px;
width:100%;
background:rgba(255,255,255,0.08);
border:1px solid rgba(255,255,255,0.15);
color:white;
border-radius:10px;
cursor:pointer;
}

/* ANIMATIONS */
@keyframes fadeIn{
from{opacity:0;}
to{opacity:1;}
}

@keyframes scaleIn{
from{
transform:scale(0.85);
opacity:0;
}
to{
transform:scale(1);
opacity:1;
}
}

      `}</style>

    </div>
  );
};

export default LoginModal;