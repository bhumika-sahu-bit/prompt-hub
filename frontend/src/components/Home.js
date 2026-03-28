// import React, { useState, useEffect } from 'react';
// // import PromptCard from './PromptCard';
// import CreatePromptModal from './CreatePromptModal';
// import video from '../assets/bgvideo.mp4';
// import { backendURL } from '../helper';
// import PromptCard from './PromptCard'; // or wherever it lives
// console.log('TYPE:', typeof PromptCard, PromptCard);

// const Home = () => {
//   const [prompts, setPrompts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [videoLoaded, setVideoLoaded] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPrompts();
//   }, []);

//   const fetchPrompts = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${backendURL}/api/prompts`);
      
//       if (!res.ok) {
//         throw new Error('API not responding');
//       }
      
//       const data = await res.json();
      
//       // ✅ SAFETY CHECK - Ensure data is array
//       if (Array.isArray(data)) {
//         setPrompts(data);
//       } else {
//         console.log('API returned non-array:', data);
//         setPrompts([]); // Empty array instead of undefined
//       }
//     } catch (error) {
//       console.error('API Error:', error);
//       // ✅ FALLBACK DATA - Always array
//       setPrompts([
//         // {
//         //   _id: '1',
//         //   title: 'Midjourney Portrait Generator',
//         //   prompt: 'A highly detailed portrait of a cyberpunk character, neon lights, dramatic lighting, ultra realistic, 8k',
//         //   imageUrl: 'https://plus.unsplash.com/premium_photo-1733760125442-efad43dd88c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
//         //   likes: 124,
//         //   createdAt: new Date()
//         // },
//          {
//     _id: '1',
//     title: 'Midjourney Portrait',
//     prompt: 'Cyberpunk portrait with neon lights...', // ✅ REQUIRED
//     imageUrl: '...',
//     likes: 124
//   },
//         {
//           _id: '2',
//           title: 'ChatGPT Blog Writer',
//           prompt: 'Write a 1000 word blog post about [TOPIC] that is SEO optimized, engaging, and includes practical tips for readers.',
//           likes: 89,
//           createdAt: new Date()
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSavePrompt = async (newPrompt) => {
//     try {
//       const res = await fetch(`${backendURL}/api/prompts`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newPrompt)
//       });
//       const savedPrompt = await res.json();
//       setPrompts([savedPrompt, ...prompts]);
//     } catch (error) {
//       console.error('Save error:', error);
//       // Fallback local save
//       const promptData = {
//         ...newPrompt,
//         _id: Date.now().toString(),
//         likes: 0,
//         createdAt: new Date()
//       };
//       setPrompts([promptData, ...prompts]);
//     }
//     setShowModal(false);
//   };

//   return (
//     <div style={{ paddingTop: '4rem' }}>
//       {/* Hero Section */}
//       <section style={{ 
//         position: 'relative',
//         height: '100vh',
//         overflow: 'hidden'
//       }}>
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           style={{
//             position: 'absolute',
//             inset: 0,
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//             opacity: 0.3
//           }}
//           onLoadedData={() => setVideoLoaded(true)}
//         >
//           {/* <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-mixing-purple-and-blue-1159-large.mp4" type="video/mp4" /> */}
//           <source src={video} type="video/mp4" />

//         </video>
        
//         <div style={{
//           position: 'absolute',
//           inset: 0,
//           background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)'
//         }} />
        
//         <div style={{
//           position: 'relative',
//           zIndex: 10,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           height: '100%',
//           textAlign: 'center',
//           padding: '1rem',
//           color: 'white'
//         }}>
//           <div style={{ maxWidth: '800px' }}>
//             <h1 style={{
//               fontSize: 'clamp(2.5rem, 8vw, 5rem)',
//               fontWeight: 'bold',
//               background: 'linear-gradient(45deg, #a855f7, #ec4899, #3b82f6)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               marginBottom: '2rem'
//             }}>
//               All Prompts in One Place
//             </h1>
//             <p style={{
//               fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
//               opacity: 0.95,
//               marginBottom: '3rem',
//               lineHeight: '1.6',
//               maxWidth: '600px',
//               marginLeft: 'auto',
//               marginRight: 'auto'
//             }}>
//               Discover thousands of ready-to-use prompts for AI tools. 
//               Simply copy, paste, and create amazing content instantly.
//             </p>
//             <button
//               onClick={() => setShowModal(true)}
//               style={{
//                 background: 'linear-gradient(45deg, #a855f7, #ec4899)',
//                 color: 'white',
//                 padding: '1.25rem 3.5rem',
//                 border: 'none',
//                 borderRadius: '50px',
//                 fontSize: '1.25rem',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.5)',
//                 transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.transform = 'translateY(-4px)';
//                 e.target.style.boxShadow = '0 35px 60px -12px rgba(168, 85, 247, 0.7)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = 'translateY(0)';
//                 e.target.style.boxShadow = '0 25px 50px -12px rgba(168, 85, 247, 0.5)';
//               }}
//             >
//               ✨ Create Your Prompt
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Prompts Grid */}
//       <section style={{ 
//         padding: '5rem 1rem', 
//         maxWidth: '1400px',
//         margin: '0 auto'
//       }}>
//         <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
//           <h2 style={{
//             fontSize: 'clamp(2rem, 5vw, 3.5rem)',
//             fontWeight: 'bold',
//             color: 'white',
//             marginBottom: '1.5rem'
//           }}>
//             Latest Prompts
//           </h2>
//           <p style={{
//             fontSize: '1.25rem',
//             color: 'rgba(255,255,255,0.7)',
//             maxWidth: '600px',
//             margin: '0 auto'
//           }}>
//             Browse through our collection of high-quality prompts created by the community
//           </p>
//         </div>

//         {loading ? (
//           <div style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '300px',
//             fontSize: '1.5rem',
//             color: 'rgba(255,255,255,0.6)'
//           }}>
//             🔄 Loading prompts...
//           </div>
//         ) : prompts.length === 0 ? (
//           <div style={{
//             textAlign: 'center',
//             padding: '4rem 2rem',
//             color: 'rgba(255,255,255,0.5)'
//           }}>
//             <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
//               No prompts yet
//             </h3>
//             <p>Create your first prompt to get started!</p>
//           </div>
//         ) : (
//           // ✅ SAFETY CHECK - Only render if array
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
//             gap: '2rem',
//             marginTop: '2rem'
//           }}>
//             {prompts.map((prompt) => (
//               <PromptCard 
//                 key={prompt._id} 
//                 prompt={prompt} 
//                 onLike={fetchPrompts}
//               />
//             ))}
//           </div>
//         )}
//       </section>

//       {showModal && (
//         <CreatePromptModal 
//           onClose={() => setShowModal(false)} 
//           onSave={handleSavePrompt}
//         />
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import CreatePromptModal from './CreatePromptModal';
import video from '../assets/bgvideo.mp4';
import { backendURL } from '../helper';
import PromptCard from './PromptCard';
import { useNavigate } from "react-router-dom";
console.log('TYPE:', typeof PromptCard, PromptCard);



/* ── Hero animation styles injected once ── */
const HERO_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');

  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroBadgePop {
    from { opacity: 0; transform: scale(0.88) translateY(8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes btnShimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes subtlePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); }
    50%       { box-shadow: 0 0 0 10px rgba(99,102,241,0); }
  }

  .hero-title {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(3rem, 8vw, 6.5rem);
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: #fff;
    margin: 0 0 1.5rem;
    opacity: 0;
    animation: heroFadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.15s forwards;
  }
  .hero-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(1rem, 2.2vw, 1.2rem);
    color: rgba(255,255,255,0.55);
    line-height: 1.7;
    max-width: 560px;
    margin: 0 auto 2.8rem;
    opacity: 0;
    animation: heroFadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.35s forwards;
  }
  .hero-btns {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
    opacity: 0;
    animation: heroFadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.52s forwards;
  }

  /* Primary — purple fill with shimmer */
  .hero-btn-primary {
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    padding: 14px 34px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    background: linear-gradient(
      110deg,
      #5b4ef0 0%, #7c6cf8 40%, #a78bfa 55%, #7c6cf8 70%, #5b4ef0 100%
    );
    background-size: 200% auto;
    animation: btnShimmer 3.5s linear infinite, subtlePulse 2.8s ease-in-out infinite;
    transition: transform 0.2s, opacity 0.2s;
    letter-spacing: 0.01em;
  }
  .hero-btn-primary:hover {
    transform: translateY(-3px) scale(1.03);
    opacity: 0.92;
  }

  /* Secondary — dark bordered */
  .hero-btn-secondary {
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    padding: 14px 34px;
    border-radius: 50px;
    border: 1.5px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(8px);
    cursor: pointer;
    transition: background 0.22s, transform 0.2s, border-color 0.22s;
    letter-spacing: 0.01em;
  }
  .hero-btn-secondary:hover {
    background: rgba(255,255,255,0.10);
    border-color: rgba(255,255,255,0.32);
    transform: translateY(-3px);
  }

  /* Section heading */
  .section-title {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 400;
    color: #fff;
    margin: 0 0 1rem;
    letter-spacing: -0.015em;
  }
`;

let heroStylesInjected = false;
function injectHeroStyles() {
  if (heroStylesInjected) return;
  const s = document.createElement('style');
  s.textContent = HERO_STYLES;
  document.head.appendChild(s);
  heroStylesInjected = true;
}

const Home = () => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    injectHeroStyles();
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendURL}/api/prompts`);
      if (!res.ok) throw new Error('API not responding');
      const data = await res.json();
      if (Array.isArray(data)) {
        setPrompts(data);
      } else {
        console.log('API returned non-array:', data);
        setPrompts([]);
      }
    } catch (error) {
      console.error('API Error:', error);
      setPrompts([
        {
          _id: '1',
          title: 'Midjourney Portrait',
          prompt: 'Cyberpunk portrait with neon lights...',
          imageUrl: '',
          likes: 124
        },
        {
          _id: '2',
          title: 'ChatGPT Blog Writer',
          prompt: 'Write a 1000 word blog post about [TOPIC] that is SEO optimized, engaging, and includes practical tips for readers.',
          likes: 89,
          createdAt: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrompt = async (newPrompt) => {
    try {
      const res = await fetch(`${backendURL}/api/prompts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPrompt)
      });
      const savedPrompt = await res.json();
      setPrompts([savedPrompt, ...prompts]);
    } catch (error) {
      console.error('Save error:', error);
      const promptData = {
        ...newPrompt,
        _id: Date.now().toString(),
        likes: 0,
        createdAt: new Date()
      };
      setPrompts([promptData, ...prompts]);
    }
    setShowModal(false);
  };

  console.log(videoLoaded);



  return (
    
    <div style={{ paddingTop: '4rem' }}>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        width: '100%',
      }}>
        {/* Background video */}
        <video
          autoPlay loop muted playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.18 , pointerEvents:'none'  
          }}
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Vignette overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)'
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          height: '100%', textAlign: 'center',
          padding: '1rem', color: 'white'
        }}>
          <div style={{ maxWidth: '860px' }}>

            <h1 className="hero-title">
              All Prompts in One Place <br/>Discover Quality Prompts
            </h1>

            <p className="hero-sub">
              Discover thousands of ready-to-use prompts for AI tools.
              Simply copy, paste, and create amazing content instantly.
            </p>

            <div className="hero-btns">
              <button
                className="hero-btn-primary"
                onClick={() => setShowModal(true)}
              >
                ✨ Create Your Prompt
              </button>
              {/* <button
                className="hero-btn-secondary"
                onClick={() => {
                  document.getElementById('prompts-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse Prompts
              </button> */}
              <button
  className="hero-btn-secondary"
  onClick={() => navigate("/prompts")}
>
  Browse Prompts
</button>
            </div>

          </div>
        </div>
      </section>

      {/* ── Prompts Grid ── */}
      <section
        id="prompts-section"
        style={{
          padding: '5rem 1rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title">Latest Prompts</h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '520px',
            margin: '0 auto'
          }}>
            Browse through our collection of high-quality prompts created by the community
          </p>
        </div>

        {loading ? (
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            height: '300px', fontSize: '1.5rem', color: 'rgba(255,255,255,0.4)'
          }}>
            🔄 Loading prompts...
          </div>
        ) : prompts.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem 2rem',
            color: 'rgba(255,255,255,0.4)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No prompts yet</h3>
            <p>Create your first prompt to get started!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt._id}
                prompt={prompt}
                onLike={fetchPrompts}
              />
            ))}
          </div>
        )}
      </section>

      {showModal && (
        <CreatePromptModal
          onClose={() => setShowModal(false)}
          onSave={handleSavePrompt}
        />
      )}
    </div>
  );
};

export default Home;
