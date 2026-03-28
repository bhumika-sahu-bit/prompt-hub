


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
    border-bottom: 2px solid transparent;
    transition: color 0.2s, border-color 0.2s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .bp-nav-link:hover {
    color: #fff;
  }
  .bp-nav-link.active {
    color: #fff;
    border-bottom: 2px solid #fff;
  }

  /* Dropdown wrapper */
  .bp-dropdown {
    position: relative;
  }
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
    padding: 6px 4px;
    font-family: 'DM Sans', sans-serif;
    transition: color 0.2s;
    white-space: nowrap;
  }
  .bp-dropdown-trigger:hover { color: #fff; }
  .bp-dropdown-trigger svg {
    transition: transform 0.2s;
  }
  .bp-dropdown:hover .bp-dropdown-trigger svg {
    transform: rotate(180deg);
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
    box-shadow: 0 16px 40px rgba(0,0,0,0.5);
  }
  .bp-dropdown:hover .bp-dropdown-menu { display: block; }
  .bp-dropdown-item {
    display: block;
    padding: 9px 14px;
    color: rgba(255,255,255,0.75);
    font-size: 0.88rem;
    font-weight: 500;
    text-decoration: none;
    border-radius: 8px;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
    font-family: 'DM Sans', sans-serif;
  }
  .bp-dropdown-item:hover {
    background: rgba(255,255,255,0.07);
    color: #fff;
  }

  /* Icon buttons */
  .bp-icon-btn {
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50%;
    cursor: pointer;
    color: rgba(255,255,255,0.7);
    transition: background 0.2s, color 0.2s;
    font-size: 1rem;
  }
  .bp-icon-btn:hover {
    background: rgba(255,255,255,0.12);
    color: #fff;
  }

  /* Login button */
  .bp-login-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.35);
    border-radius: 8px;
    padding: 7px 20px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    white-space: nowrap;
  }
  .bp-login-btn:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.6);
  }

  /* User greeting */
  .bp-user-chip {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    padding: 6px 14px;
    white-space: nowrap;
  }

  /* Logout */
  .bp-logout-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    color: #f87171;
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.25);
    border-radius: 8px;
    padding: 7px 16px;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .bp-logout-btn:hover { background: rgba(239,68,68,0.18); }

  /* Favorites link */
  .bp-fav-link {
    color: rgba(255,255,255,0.75);
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    padding: 6px 4px;
    transition: color 0.2s;
    white-space: nowrap;
    font-family: 'DM Sans', sans-serif;
  }
  .bp-fav-link:hover { color: #fbbf24; }
`;

let navStylesInjected = false;
function injectNavStyles() {
  if (navStylesInjected) return;
  const s = document.createElement('style');
  s.textContent = NAV_STYLES;
  document.head.appendChild(s);
  navStylesInjected = true;
}

/* Chevron icon */
const ChevronDown = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* Globe icon */
const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

/* Moon icon */
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout, isAuthenticated, loading } = useAuth();

  // Inject styles on first render
  React.useEffect(() => { injectNavStyles(); }, []);

  return (
    <nav className="bp-nav" style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000,
      // background: 'rgba(10,10,12,0.97)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: '0 2rem',
        height: '60px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>

        {/* ── Logo ── */}
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🍌</span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: '700',
              fontSize: '1.05rem',
              color: '#fff',
              letterSpacing: '-0.01em'
            }}>
              PromptHub
            </span>
          </div>
        </Link>

        {/* ── Center nav links ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1.75rem',
          flex: 1, justifyContent: 'center'
        }}>

          {/* AI Tools dropdown */}
          <div className="bp-dropdown">
            <button className="bp-dropdown-trigger">
              AI Tools <ChevronDown />
            </button>
            <div className="bp-dropdown-menu">
              <a href="#" className="bp-dropdown-item">ChatGPT</a>
              <a href="#" className="bp-dropdown-item">Midjourney</a>
              <a href="#" className="bp-dropdown-item">Stable Diffusion</a>
              <a href="#" className="bp-dropdown-item">DALL·E</a>
            </div>
          </div>

          {/* Prompts dropdown */}
          <div className="bp-dropdown">
            <button className="bp-dropdown-trigger">
              Prompts <ChevronDown />
            </button>
            <div className="bp-dropdown-menu">
              <Link to="/" className="bp-dropdown-item">All Prompts</Link>
              {isAuthenticated && (
                <Link to="/favorites" className="bp-dropdown-item">⭐ Favorites</Link>
              )}
            </div>
          </div>

          <Link to="/pricing" className="bp-nav-link">Pricing</Link>
          <Link to="/blog"    className="bp-nav-link">Blog</Link>
          <a href="#"         className="bp-nav-link">Openclaw Case</a>

        </div>

        {/* ── Right side ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>

          {isAuthenticated ? (
            <>
              <span className="bp-user-chip">
                {user?.name || user?.email?.split('@')[0]} 👋
              </span>
              <button className="bp-logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Dark mode toggle */}
              <button className="bp-icon-btn" title="Toggle theme">
                <MoonIcon />
              </button>

              {/* Language / globe */}
              <button className="bp-icon-btn" title="Language">
                <GlobeIcon />
              </button>

              {/* Login */}
              <button
                className="bp-login-btn"
                onClick={() => setShowLogin(true)}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Log in'}
              </button>
            </>
          )}

        </div>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </nav>
  );
};

export default Navbar;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import LoginModal from './LoginModal';
// import { useAuth } from '../contexts/AuthContext';

// const NAV_STYLES = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

// .bp-nav {
//   font-family: 'DM Sans', sans-serif;
// }

// .bp-nav-link {
//   color: rgba(255,255,255,0.75);
//   font-size: 0.95rem;
//   font-weight: 500;
//   text-decoration: none;
//   padding: 6px 4px;
//   transition: color 0.2s;
// }
// .bp-nav-link:hover { color: #fff; }

// /* Dropdown */
// .bp-dropdown { position: relative; }

// .bp-dropdown-trigger {
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   color: rgba(255,255,255,0.75);
//   font-size: 0.95rem;
//   font-weight: 500;
//   background: none;
//   border: none;
//   cursor: pointer;
// }

// .bp-dropdown-menu {
//   display: none;
//   position: absolute;
//   top: calc(100% + 12px);
//   left: 50%;
//   transform: translateX(-50%);
//   background: #1a1a1e;
//   border: 1px solid rgba(255,255,255,0.1);
//   border-radius: 12px;
//   padding: 8px;
//   min-width: 160px;
//   z-index: 999;
// }

// .bp-dropdown:hover .bp-dropdown-menu { display:block }

// .bp-dropdown-item {
//   display:block;
//   padding:9px 14px;
//   color:rgba(255,255,255,0.75);
//   text-decoration:none;
//   border-radius:8px;
// }

// .bp-dropdown-item:hover {
//   background:rgba(255,255,255,0.07);
//   color:#fff;
// }

// /* Search */
// .bp-search {
//   background: rgba(255,255,255,0.06);
//   border:1px solid rgba(255,255,255,0.1);
//   border-radius:8px;
//   padding:4px 10px;
// }

// .bp-search input{
//   background:transparent;
//   border:none;
//   outline:none;
//   color:white;
//   font-size:0.9rem;
//   width:170px;
// }

// /* Buttons */

// .bp-login-btn {
//   font-size:0.9rem;
//   font-weight:600;
//   color:#fff;
//   background:transparent;
//   border:1.5px solid rgba(255,255,255,0.35);
//   border-radius:8px;
//   padding:7px 18px;
//   cursor:pointer;
// }

// .bp-login-btn:hover{
//   background:rgba(255,255,255,0.08)
// }

// .bp-user-chip {
//   font-size:0.88rem;
//   background:rgba(255,255,255,0.07);
//   border:1px solid rgba(255,255,255,0.1);
//   border-radius:20px;
//   padding:6px 14px;
// }

// .bp-logout-btn {
//   font-size:0.88rem;
//   color:#f87171;
//   background:rgba(239,68,68,0.1);
//   border:1px solid rgba(239,68,68,0.25);
//   border-radius:8px;
//   padding:7px 16px;
//   cursor:pointer;
// }
// `;

// let injected=false;

// function injectStyles(){
//  if(injected) return
//  const s=document.createElement("style")
//  s.textContent=NAV_STYLES
//  document.head.appendChild(s)
//  injected=true
// }

// const ChevronDown = () => (
// <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
// stroke="currentColor" strokeWidth="2.5">
// <polyline points="6 9 12 15 18 9"/>
// </svg>
// )

// const Navbar = () => {

// const [showLogin,setShowLogin]=useState(false)
// const [search,setSearch]=useState("")

// const {user,logout,isAuthenticated,loading}=useAuth()

// React.useEffect(()=>{injectStyles()},[])

// const handleSearch=(e)=>{
// e.preventDefault()
// if(!search.trim()) return
// window.location.href=`/?search=${encodeURIComponent(search)}`
// }

// return (

// <nav className="bp-nav" style={{
// position:'fixed',
// top:0,
// width:'100%',
// zIndex:1000,
// backdropFilter:'blur(24px)',
// borderBottom:'1px solid rgba(255,255,255,0.08)'
// }}>

// <div style={{
// maxWidth:'1400px',
// margin:'0 auto',
// padding:'0 2rem',
// height:'60px',
// display:'flex',
// alignItems:'center',
// justifyContent:'space-between'
// }}>

// {/* Logo */}

// <Link to="/" style={{textDecoration:'none'}}>

// <div style={{display:'flex',alignItems:'center',gap:'9px'}}>

// <span style={{fontSize:'1.4rem'}}>🍌</span>

// <span style={{
// fontWeight:'700',
// fontSize:'1.05rem',
// color:'#fff'
// }}>
// PromptHub
// </span>

// </div>

// </Link>


// {/* Search */}

// <form onSubmit={handleSearch} className="bp-search">

// <input
// type="text"
// placeholder="Search prompts..."
// value={search}
// onChange={(e)=>setSearch(e.target.value)}
// />

// </form>


// {/* Center Links */}

// <div style={{
// display:'flex',
// alignItems:'center',
// gap:'1.7rem'
// }}>

// {/* AI Tools */}

// <div className="bp-dropdown">

// <button className="bp-dropdown-trigger">
// AI Tools <ChevronDown/>
// </button>

// <div className="bp-dropdown-menu">

// <a href="https://chat.openai.com" target="_blank" className="bp-dropdown-item" rel="noreferrer">ChatGPT</a>

// <a href="https://gemini.google.com" target="_blank" className="bp-dropdown-item" rel="noreferrer">Gemini</a>

// <a href="https://claude.ai" target="_blank" className="bp-dropdown-item" rel="noreferrer">Claude</a>

// <a href="https://www.midjourney.com" target="_blank" className="bp-dropdown-item" rel="noreferrer">Midjourney</a>

// <a href="https://stability.ai" target="_blank" className="bp-dropdown-item" rel="noreferrer">Stable Diffusion</a>

// </div>

// </div>

// <Link to="/about" className="bp-nav-link">
// About
// </Link>

// {isAuthenticated && (
// <Link to="/favorites" className="bp-nav-link">
// ⭐ Favorites
// </Link>
// )}

// </div>


// {/* Right */}

// <div style={{display:'flex',alignItems:'center',gap:'10px'}}>

// {isAuthenticated ? (

// <>

// <span className="bp-user-chip">
// {user?.name || user?.email?.split('@')[0]} 👋
// </span>

// <button className="bp-logout-btn" onClick={logout}>
// Logout
// </button>

// </>

// ):(

// <button
// className="bp-login-btn"
// onClick={()=>setShowLogin(true)}
// disabled={loading}
// >

// {loading?'Loading...':'Log in'}

// </button>

// )}

// </div>

// </div>

// {showLogin && <LoginModal onClose={()=>setShowLogin(false)}/>}

// </nav>

// )

// }

// export default Navbar


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import LoginModal from './LoginModal';
// import { useAuth } from '../contexts/AuthContext';

// const Navbar = () => {

// const [menuOpen,setMenuOpen]=useState(false)
// const [showLogin,setShowLogin]=useState(false)

// const {user,logout,isAuthenticated,loading}=useAuth()

// return (

// <nav style={{
// position:'fixed',
// top:0,
// width:'100%',
// zIndex:1000,
// background:'rgba(0,0,0,0.8)',
// backdropFilter:'blur(20px)',
// borderBottom:'1px solid rgba(255,255,255,0.08)'
// }}>

// <div style={{
// maxWidth:'1200px',
// margin:'0 auto',
// padding:'0 1rem',
// height:'60px',
// display:'flex',
// alignItems:'center',
// justifyContent:'space-between',
// position:'relative',
// }}>

// {/* LEFT LOGO */}
// <Link to="/" style={{
// color:'#fff',
// textDecoration:'none',
// fontWeight:'700',
// fontSize:'1.1rem'
// }}>
// 🍌 PromptHub
// </Link>

// {/* HAMBURGER */}
// <div 
// onClick={()=>setMenuOpen(!menuOpen)}
// style={{
// display:'none',
// fontSize:'1.6rem',
// cursor:'pointer',
// color:'#fff'
// }}
// className="hamburger"
// >
// ☰
// </div>

// {/* CENTER + RIGHT */}
// <div className={`nav-menu ${menuOpen ? "active":""}`}>

// {/* CENTER LINKS */}
// <div className="nav-links">
// <Link to="/">Home</Link>
// <Link to="/about">About</Link>

// {isAuthenticated && (
// <Link to="/favorites">Favorites</Link>
// )}
// </div>

// {/* RIGHT SIDE */}
// <div className="nav-right">

// {isAuthenticated ? (
// <>
// <span className="user-name">
// {user?.name || user?.email?.split('@')[0]}
// </span>

// <button className="logout-btn" onClick={logout}>
// Logout
// </button>
// </>
// ):(
// <button 
// className="login-btn"
// onClick={()=>setShowLogin(true)}
// disabled={loading}
// >
// {loading?'Loading...':'Login'}
// </button>
// )}

// </div>

// </div>

// </div>
// <style>{`

// .nav-menu{
// display:flex;
// align-items:center;
// gap:30px;
// }

// .nav-links{
// display:flex;
// gap:20px;
// }

// .nav-links a{
// color:rgba(255,255,255,0.75);
// text-decoration:none;
// font-size:0.95rem;
// }

// .nav-links a:hover{
// color:#fff;
// }

// .nav-right{
// display:flex;
// align-items:center;
// gap:10px;
// }

// .user-name{
// background:rgba(255,255,255,0.08);
// padding:5px 12px;
// border-radius:20px;
// font-size:0.85rem;
// }

// .logout-btn{
// background:rgba(255,0,0,0.1);
// border:1px solid rgba(255,0,0,0.3);
// color:#ff6b6b;
// padding:6px 12px;
// border-radius:6px;
// cursor:pointer;
// }

// .login-btn{
// border:1px solid rgba(255,255,255,0.4);
// background:transparent;
// color:white;
// padding:6px 14px;
// border-radius:6px;
// cursor:pointer;
// }

// /* 🔥 MOBILE FIX START */
// @media(max-width:768px){

// .hamburger{
// display:block !important;
// position:absolute;
// right:20px;
// top:15px;
// z-index:1100;
// }

// .nav-menu{
// position:fixed;                 /* 🔥 CHANGE */
// top:60px;
// left:0;
// width:100%;
// height:calc(100vh - 60px);      /* full screen */
// background:#0f0f0f;             /* dark bg fix */
// flex-direction:column;
// align-items:flex-start;
// padding:20px;
// display:none;
// z-index:1000;
// }

// .nav-menu.active{
// display:flex;
// }

// .nav-links{
// flex-direction:column;
// width:100%;
// gap:15px;
// }

// .nav-links a{
// font-size:1rem;
// }

// .nav-right{
// flex-direction:column;
// width:100%;
// align-items:flex-start;
// gap:12px;
// margin-top:10px;
// }

// }
// /* 🔥 MOBILE FIX END */

// `}</style>

// {showLogin && <LoginModal onClose={()=>setShowLogin(false)}/>}

// </nav>

// )
// }

// export default Navbar;