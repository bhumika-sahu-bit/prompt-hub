import React, { useState } from 'react';
import { backendURL } from '../helper';

const CreatePromptModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    imageUrl: ''
  });
  const [imageSource, setImageSource] = useState('url');
  const [localImagePreview, setLocalImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ✅ Size validation - Max 5MB
      if (file.size > 5 * 1024 * 1024) {
        setError('Image too large! Max 5MB allowed.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        // ✅ Base64 size check (after encoding)
        const base64Size = (e.target.result.length * 3) / 4 / 1024 / 1024; // MB
        if (base64Size > 10) {
          setError('Image too large after processing! Try smaller image or use URL.');
          return;
        }
        
        setLocalImagePreview(e.target.result);
        setFormData({ ...formData, imageUrl: e.target.result });
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.prompt.trim()) return 'Prompt text is required';
    if (!formData.imageUrl.trim()) return 'Image is required';
    if (formData.prompt.length > 5000) return 'Prompt too long! Max 5000 characters';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // ✅ Real API call to backend
      const res = await fetch(`${backendURL}/api/prompts`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Failed to save prompt');
      }

      const savedPrompt = await res.json();
      console.log('✅ Saved to MongoDB:', savedPrompt._id);
      onSave(savedPrompt);
      onClose();
      
    } catch (error) {
      console.error('❌ API Error:', error);
      setError('Failed to save. Using local storage...');
      
      // ✅ Fallback - local save
      setTimeout(() => {
        onSave(formData);
        onClose();
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(20px)'
    }} onClick={onClose}>
      
      <div style={{
        background: 'rgba(20,20,40,0.95)',
        backdropFilter: 'blur(30px)',
        borderRadius: '24px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '650px',
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid rgba(168,85,247,0.3)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '2rem' 
        }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Create New Prompt ✨
          </h2>
          <button 
            onClick={onClose} 
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(239,68,68,0.3)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.2)',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: '12px',
            padding: '1rem',
            color: '#f87171',
            marginBottom: '1.5rem',
            fontSize: '0.95rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Title */}
          <div>
            <label style={{ display: 'block', color: 'white', fontWeight: '600', marginBottom: '0.75rem', fontSize: '1.05rem' }}>
              📝 Title <span style={{ color: '#a855f7' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              maxLength={100}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                color: 'white',
                fontSize: '1.1rem',
                outline: 'none',
                transition: 'all 0.3s',
                backdropFilter: 'blur(10px)'
              }}
              placeholder="Enter a catchy title for your prompt"
              required
            />
          </div>

          {/* Image Section - REQUIRED */}
          <div>
            <label style={{ display: 'block', color: 'white', fontWeight: '600', marginBottom: '1rem', fontSize: '1.05rem' }}>
              🖼️ Image <span style={{ color: '#a855f7' }}>*</span>
            </label>
            
            {/* Radio Buttons */}
            <div style={{
              display: 'flex',
              gap: '1.25rem',
              marginBottom: '1.25rem',
              background: 'rgba(255,255,255,0.05)',
              padding: '1.25rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                cursor: 'pointer', 
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                flex: 1,
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(168,85,247,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <input
                  type="radio"
                  value="url"
                  checked={imageSource === 'url'}
                  onChange={() => {
                    setImageSource('url');
                    setLocalImagePreview(null);
                  }}
                  style={{ accentColor: '#a855f7' }}
                />
                <span>🌐 Image URL</span>
              </label>
              
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                cursor: 'pointer', 
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                flex: 1,
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(168,85,247,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <input
                  type="radio"
                  value="local"
                  checked={imageSource === 'local'}
                  onChange={() => setImageSource('local')}
                  style={{ accentColor: '#a855f7' }}
                />
                <span>💾 Local File</span>
              </label>
            </div>

            {/* URL Input */}
            {imageSource === 'url' && (
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => {
                  setFormData({...formData, imageUrl: e.target.value});
                  setLocalImagePreview(null);
                  setError('');
                }}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                placeholder="https://example.com/your-image.jpg"
              />
            )}

            {/* Local File Input + Preview */}
            {imageSource === 'local' && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: '2px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                />
                {localImagePreview && (
                  <div style={{
                    width: '100%',
                    height: '160px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '3px solid #a855f7',
                    marginTop: '1rem',
                    boxShadow: '0 10px 30px rgba(168,85,247,0.3)'
                  }}>
                    <img 
                      src={localImagePreview} 
                      alt="Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Prompt Text */}
          <div>
            <label style={{ display: 'block', color: 'white', fontWeight: '600', marginBottom: '0.75rem', fontSize: '1.05rem' }}>
              🤖 AI Prompt <span style={{ color: '#a855f7' }}>*</span>
            </label>
            <textarea
              rows="5"
              value={formData.prompt}
              onChange={(e) => setFormData({...formData, prompt: e.target.value})}
              maxLength={5000}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                color: 'white',
                fontSize: '1.05rem',
                fontFamily: 'Inter, monospace',
                resize: 'vertical',
                outline: 'none',
                lineHeight: '1.6',
                minHeight: '120px'
              }}
              placeholder="Write your AI prompt here...&#10;&#10;e.g., 'A cyberpunk cityscape at night with neon lights, ultra detailed, 8k'"
            />
            <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', mt: '0.5rem' }}>
              {formData.prompt.length}/5000
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formData.title.trim() || !formData.prompt.trim() || !formData.imageUrl.trim()}
            style={{
              width: '100%',
              background: loading || !formData.title.trim() || !formData.prompt.trim() || !formData.imageUrl.trim() 
                ? 'rgba(168,85,247,0.4)' 
                : 'linear-gradient(45deg, #a855f7, #ec4899)',
              color: 'white',
              padding: '1.5rem 2rem',
              border: 'none',
              borderRadius: '20px',
              fontSize: '1.125rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 20px 40px rgba(168,85,247,0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {loading ? (
              <>
                <span style={{ 
                  display: 'inline-block', 
                  width: '1.5rem', 
                  height: '1.5rem', 
                  border: '2px solid rgba(255,255,255,0.3)', 
                  borderTop: '2px solid white', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite', 
                  marginRight: '0.75rem' 
                }} />
                Saving to Database...
              </>
            ) : (
              '🚀 Create & Save Prompt'
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CreatePromptModal;
