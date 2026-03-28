import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PromptCard from './PromptCard';
import { backendURL } from '../helper';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setFavorites([]);
      setLoading(false);
      return;
    }
    
    fetchFavorites();
  }, [user, isAuthenticated]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`${backendURL}/api/users/favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const favPrompts = await res.json();
        setFavorites(favPrompts);
      }
    } catch (error) {
      console.error('Favorites error:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', padding: '8rem 2rem 2rem', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a0f2e 50%)',
        color: 'white', textAlign: 'center'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '3rem', fontWeight: 'bold',
            background: 'linear-gradient(45deg, #a855f7, #ec4899)', 
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            ⭐ Favorites
          </h1>
          <p style={{ fontSize: '1.3rem', opacity: 0.8, maxWidth: '500px' }}>
            Sign in to see your liked prompts! 
            <br />Your favorites are saved forever ✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', padding: '8rem 2rem 2rem',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a0f2e 50%)',
      color: 'white'
    }}>
      <div style={{ 
        maxWidth: '1400px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' 
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 'bold',
          background: 'linear-gradient(45deg, #fbbf24, #f59e0b)', 
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          ⭐ Your Favorites
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
          {user?.name || user?.email?.split('@')[0]}'s liked prompts
        </p>
      </div>

      {loading ? (
        <div style={{ 
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          height: '400px', fontSize: '1.5rem', color: 'rgba(255,255,255,0.6)'
        }}>
          Loading your favorites...
        </div>
      ) : favorites.length === 0 ? (
        <div style={{ 
          textAlign: 'center', padding: '4rem 2rem', 
          color: 'rgba(255,255,255,0.5)' 
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⭐</div>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
            No favorites yet
          </h3>
          <p style={{ fontSize: '1.1rem' }}>
            Like some prompts on the home page to see them here!
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem', maxWidth: '1400px', margin: '0 auto'
        }}>
          {favorites.map((prompt) => (
            <PromptCard 
              key={prompt._id} 
              prompt={prompt} 
              onLike={() => fetchFavorites()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
