import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {

const [showLogin, setShowLogin] = useState(false);
const { user, logout, isAuthenticated, loading } = useAuth();

return (
<>
<nav className="navbar">

<div className="nav-container">

{/* LEFT LOGO */}
<Link to="/" className="logo">
PromptHub
</Link>

{/* RIGHT MENU */}
<div className="nav-links">

<Link to="/">Home</Link>
<Link to="/favorites">Favorites</Link>
<Link to="/about">About</Link>

{isAuthenticated ? (
<>
<span className="user-name">
{user?.name || user?.email?.split('@')[0]}
</span>

<button className="logout-btn" onClick={logout}>
Logout
</button>
</>
) : (
<button 
className="login-btn"
onClick={() => setShowLogin(true)}
disabled={loading}
>
{loading ? "Loading..." : "Login"}
</button>
)}

</div>

</div>

</nav>

{/* LOGIN MODAL */}
{showLogin && (
<LoginModal onClose={() => setShowLogin(false)} />
)}

<style>{`

.navbar{
position:fixed;
top:0;
width:100%;
background:rgba(0,0,0,0.85);
backdrop-filter:blur(12px);
border-bottom:1px solid rgba(255,255,255,0.08);
z-index:1000;
}

.nav-container{
max-width:1200px;
margin:auto;
height:60px;
display:flex;
align-items:center;
justify-content:space-between;
padding:0 20px;
}

/* LOGO */
.logo{
color:#fff;
font-size:1.2rem;
font-weight:700;
text-decoration:none;
letter-spacing:1px;
transition:0.3s;
}

.logo:hover{
color:#ffd166;
}

/* LINKS */
.nav-links{
display:flex;
align-items:center;
gap:25px;
}

.nav-links a{
color:rgba(255,255,255,0.7);
text-decoration:none;
position:relative;
transition:0.3s;
}

.nav-links a:hover{
color:#fff;
}

.nav-links a::after{
content:'';
position:absolute;
left:0;
bottom:-5px;
width:0%;
height:2px;
background:#ffd166;
transition:0.3s;
}

.nav-links a:hover::after{
width:100%;
}

/* USER */
.user-name{
background:rgba(255,255,255,0.08);
padding:5px 12px;
border-radius:20px;
font-size:0.85rem;
}

/* BUTTONS */
.login-btn{
border:1px solid rgba(255,255,255,0.4);
background:transparent;
color:white;
padding:6px 14px;
border-radius:6px;
cursor:pointer;
transition:0.3s;
}

.login-btn:hover{
background:#ffd166;
color:#000;
}

.logout-btn{
background:rgba(255,0,0,0.1);
border:1px solid rgba(255,0,0,0.3);
color:#ff6b6b;
padding:6px 12px;
border-radius:6px;
cursor:pointer;
transition:0.3s;
}

.logout-btn:hover{
background:#ff4d4d;
color:white;
}

/* MOBILE */
@media(max-width:768px){
.nav-links{
gap:15px;
font-size:0.85rem;
}
}

`}</style>

</>
);
};

export default Navbar;