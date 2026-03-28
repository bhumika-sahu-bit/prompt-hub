import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Favorites from './components/Favorites'; // ✅ NEW
import Footer from './components/Footer';
import About from "./components/About";
import PromptsPage from "./components/PromptsPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f23 0%, #1a0f2e 50%, #0f0f23 100%)' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} /> {/* ✅ NEW */}
            <Route path="/about" element={<About />} />
            <Route path="/prompts" element={<PromptsPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
