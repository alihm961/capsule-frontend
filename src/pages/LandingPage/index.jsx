import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Shield, Globe } from 'lucide-react';
import './style.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo">🕰 TIME CAPSULE</div>
        <nav className="auth-buttons">
          <Link to="/register" className="signup-btn">Sign up</Link>
          <Link to="/login" className="login-btn">Log in</Link>
        </nav>
      </header>

      <main className="hero-section">
        <div className="hero-left">
          <h1>Preserve your messages<br/> for the future</h1>
          <p>Write messages and add media<br/> to be shared with yourself<br/> or the world at a later time</p>
          <Link to="/register" className="get-started-btn">Get Started</Link>
        </div>
        <div className="hero-right">
          <img src="/src/assets/landing-hero.png" alt="Time Capsule Illustration" />
        </div>
      </main>

      <section className="features-section">
        <h2 className="features-title">Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Clock size={40} className="feature-icon" />
            <h3>Preserve Memories</h3>
            <p>Save messages and media for the future</p>
          </div>
          <div className="feature-card">
            <Shield size={40} className="feature-icon" />
            <h3>Privacy First</h3>
            <p>Control who sees your capsules</p>
          </div>
          <div className="feature-card">
            <Globe size={40} className="feature-icon" />
            <h3>Global Sharing</h3>
            <p>Share publicly with a worldwide wall</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        &copy; 2025 Time Capsule Platform, Powered by Ali Mazloum
      </footer>
    </div>
  );
};

export default LandingPage;