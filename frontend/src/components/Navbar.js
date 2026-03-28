
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { useAuth } from '../contexts/AuthContext';

const NAV_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

.bp-nav {
  font-family: 'DM Sans', sans-serif;
}

.bp-nav-link {
  color: rgba(255,255,255,0.75);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  padding: 6px 4px;
  transition: color 0.2s;
}
.bp-nav-link:hover { color: #fff; }

/* Dropdown */
.bp-dropdown { position: relative; }

.bp-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(255,255,255,0.75);
  font-size: 0.95rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
}

.bp-dropdown-menu {
  display: none;
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: #1a1a1e;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 8px;
  min-width: 160px;
  z-index: 999;
}

.bp-dropdown:hover .bp-dropdown-menu { display:block }

.bp-dropdown-item {
  display:block;
  padding:9px 14px;
  color:rgba(255,255,255,0.75);
  text-decoration:none;
  border-radius:8px;
}

.bp-dropdown-item:hover {
  background:rgba(255,255,255,0.07);
  color:#fff;
}

/* Search */
.bp-search {
  background: rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:8px;
  padding:4px 10px;
}

.bp-search input{
  background:transparent;
  border:none;
  outline:none;
  color:white;
  font-size:0.9rem;
  width:170px;
}

/* Buttons */

.bp-login-btn {
  font-size:0.9rem;
  font-weight:600;
  color:#fff;
  background:transparent;
  border:1.5px solid rgba(255,255,255,0.35);
  border-radius:8px;
  padding:7px 18px;
  cursor:pointer;
}

.bp-login-btn:hover{
  background:rgba(255,255,255,0.08)
}

.bp-user-chip {
  font-size:0.88rem;
  background:rgba(255,255,255,0.07);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:20px;
  padding:6px 14px;
}

.bp-logout-btn {
  font-size:0.88rem;
  color:#f87171;
  background:rgba(239,68,68,0.1);
  border:1px solid rgba(239,68,68,0.25);
  border-radius:8px;
  padding:7px 16px;
  cursor:pointer;
}
`;

let injected=false;

function injectStyles(){
 if(injected) return
 const s=document.createElement("style")
 s.textContent=NAV_STYLES
 document.head.appendChild(s)
 injected=true
}

const ChevronDown = () => (
<svg width="13" height="13" viewBox="0 0 24 24" fill="none"
stroke="currentColor" strokeWidth="2.5">
<polyline points="6 9 12 15 18 9"/>
</svg>
)

const Navbar = () => {

const [showLogin,setShowLogin]=useState(false)
const [search,setSearch]=useState("")

const {user,logout,isAuthenticated,loading}=useAuth()

React.useEffect(()=>{injectStyles()},[])

const handleSearch=(e)=>{
e.preventDefault()
if(!search.trim()) return
window.location.href=`/?search=${encodeURIComponent(search)}`
}

return (

<nav className="bp-nav" style={{
position:'fixed',
top:0,
width:'100%',
zIndex:1000,
backdropFilter:'blur(24px)',
borderBottom:'1px solid rgba(255,255,255,0.08)'
}}>

<div style={{
maxWidth:'1400px',
margin:'0 auto',
padding:'0 2rem',
height:'60px',
display:'flex',
alignItems:'center',
justifyContent:'space-between'
}}>

{/* Logo */}

<Link to="/" style={{textDecoration:'none'}}>

<div style={{display:'flex',alignItems:'center',gap:'9px'}}>

<span style={{fontSize:'1.4rem'}}>🍌</span>

<span style={{
fontWeight:'700',
fontSize:'1.05rem',
color:'#fff'
}}>
PromptHub
</span>

</div>

</Link>


{/* Search */}

<form onSubmit={handleSearch} className="bp-search">

<input
type="text"
placeholder="Search prompts..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</form>


{/* Center Links */}

<div style={{
display:'flex',
alignItems:'center',
gap:'1.7rem'
}}>

{/* AI Tools */}

<div className="bp-dropdown">

<button className="bp-dropdown-trigger">
AI Tools <ChevronDown/>
</button>

<div className="bp-dropdown-menu">

<a href="https://chat.openai.com" target="_blank" className="bp-dropdown-item" rel="noreferrer">ChatGPT</a>

<a href="https://gemini.google.com" target="_blank" className="bp-dropdown-item" rel="noreferrer">Gemini</a>

<a href="https://claude.ai" target="_blank" className="bp-dropdown-item" rel="noreferrer">Claude</a>

<a href="https://www.midjourney.com" target="_blank" className="bp-dropdown-item" rel="noreferrer">Midjourney</a>

<a href="https://stability.ai" target="_blank" className="bp-dropdown-item" rel="noreferrer">Stable Diffusion</a>

</div>

</div>

<Link to="/about" className="bp-nav-link">
About
</Link>

{isAuthenticated && (
<Link to="/favorites" className="bp-nav-link">
⭐ Favorites
</Link>
)}

</div>


{/* Right */}

<div style={{display:'flex',alignItems:'center',gap:'10px'}}>

{isAuthenticated ? (

<>

<span className="bp-user-chip">
{user?.name || user?.email?.split('@')[0]} 👋
</span>

<button className="bp-logout-btn" onClick={logout}>
Logout
</button>

</>

):(

<button
className="bp-login-btn"
onClick={()=>setShowLogin(true)}
disabled={loading}
>

{loading?'Loading...':'Log in'}

</button>

)}

</div>

</div>

{showLogin && <LoginModal onClose={()=>setShowLogin(false)}/>}

</nav>

)

}

export default Navbar