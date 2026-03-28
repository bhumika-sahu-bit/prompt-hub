import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

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
    } catch (err) {
      setError('Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)'
    }} onClick={onClose}>
      <div style={{
        background: 'rgba(20,20,40,0.98)', 
        borderRadius: '24px', 
        padding: '3rem 2.5rem',
        width: '100%', 
        maxWidth: '480px', 
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid rgba(168,85,247,0.4)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
      }} onClick={(e) => e.stopPropagation()}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{
            fontSize: '2.25rem', 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #a855f7, #ec4899)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Welcome to PromptHub ✨
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
            Sign in with your Gmail to save likes & prompts
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.2)', 
            border: '1px solid rgba(239,68,68,0.5)', 
            borderRadius: '12px',
            padding: '1rem 1.25rem', 
            color: '#f87171', 
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontSize: '0.95rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', color: 'white', fontWeight: '600', marginBottom: '0.75rem' }}>
              📧 Gmail Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@gmail.com"
              required
              style={{
                width: '100%', padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: 'white',
                fontSize: '1.1rem', outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'white', fontWeight: '600', marginBottom: '0.75rem' }}>
              👤 Display Name (Optional)
            Laksh</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your display name"
              style={{
                width: '100%', padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: 'white',
                fontSize: '1.1rem', outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            style={{
              width: '100%', 
              background: loading || !email ? 'rgba(168,85,247,0.4)' : 'linear-gradient(45deg, #a855f7, #ec4899)',
              color: 'white', padding: '1.5rem', borderRadius: '20px', border: 'none',
              fontSize: '1.125rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 20px 40px rgba(168,85,247,0.4)'
            }}
          >
            {loading ? (
              <>
                <span style={{ 
                  display: 'inline-block', width: '1.5rem', height: '1.5rem', 
                  border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', 
                  borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '0.75rem' 
                }} />
                Signing in...
              </>
            ) : (
              '🚀 Sign In with Gmail'
            )}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', marginTop: '1.5rem', 
          color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' 
        }}>
          <p>Continue as guest → No likes saved</p>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white',
              padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)',
              fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem'
            }}
          >
            Skip for now
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginModal;
