/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Footer = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Logo */}
        <div>
          <div style={styles.logoWrap}>
            <div style={styles.logoIcon}>🍌</div>
            <h2 style={styles.logoText}>PromptHub</h2>
          </div>

          <p style={styles.desc}>
            Discover quality prompts for AI tools and content creation.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h4 style={styles.heading}>RESOURCES</h4>
          <div style={styles.column}>
            <Link to="/blog" style={styles.link}>Blog</Link>
            <Link to="/changelog" style={styles.link}>Changelog</Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={styles.heading}>COMPANY</h4>
          <div style={styles.column}>
            <Link to="/" style={styles.link}>Home</Link>

            {isAuthenticated && (
              <Link to="/favorites" style={styles.link}>
                Favorites
              </Link>
            )}
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 style={styles.heading}>LEGAL</h4>
          <div style={styles.column}>
            <Link to="/privacy" style={styles.link}>Privacy Policy</Link>
            <Link to="/terms" style={styles.link}>Terms</Link>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div style={styles.bottom}>
        <div>© {new Date().getFullYear()} PromptHub</div>
        <div>Created by Lucky ❤️</div>
      </div>
    </footer>
  );
};

// ✅ Styles
const styles = {
  footer: {
    background: "#05060a",
    padding: "80px 40px 30px",
    color: "rgba(255,255,255,0.8)",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    fontFamily: "Inter, sans-serif",
  },
  container: {
    maxWidth: "1300px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "60px",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
  },
  logoIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#a855f7,#ec4899)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "700",
    color: "white",
  },
  desc: {
    color: "rgba(255,255,255,0.55)",
    lineHeight: "1.6",
  },
  heading: {
    color: "white",
    marginBottom: "18px",
    fontWeight: "600",
    fontSize: "14px",
    letterSpacing: "1px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    fontSize: "14px",
  },
  bottom: {
    marginTop: "70px",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    paddingTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "1300px",
    margin: "0 auto",
    fontSize: "14px",
    color: "rgba(255,255,255,0.5)",
  },
};

export default Footer;