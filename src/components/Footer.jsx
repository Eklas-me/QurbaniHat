import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '60px 0 20px' }}>
      <div className="container">
        <div className="footer-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Logo & Description Section */}
          <div className="footer-section">
            <Link to="/" className="logo" style={{ color: 'white', marginBottom: '20px', display: 'flex', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
              <span style={{ marginRight: '10px' }}>🐄</span> QurbaniHat
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '0.95rem' }}>
              QurbaniHat is the most trusted and premium online marketplace for buying healthy and verified Qurbani animals. We connect you directly with the best farms across Bangladesh to ensure a hassle-free and sacred Qurbani experience for you and your family.
            </p>
          </div>

          {/* Dynamic Quick Links Section */}
          <div className="footer-section">
            <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/animals" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>All Animals</Link></li>
              
              {!user ? (
                <>
                  <li><Link to="/login" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>Login</Link></li>
                  <li><Link to="/register" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>Register</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/my-profile" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>My Profile</Link></li>
                  <li><Link to="/update-profile" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>Update Profile</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Section with Icons */}
          <div className="footer-section">
            <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Contact Us</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.8, fontSize: '0.95rem' }}>
                <Mail size={18} color="var(--accent-color)" /> support@qurbanihat.com
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.8, fontSize: '0.95rem' }}>
                <Phone size={18} color="var(--accent-color)" /> +880 1234 567 890
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.8, fontSize: '0.95rem' }}>
                <MapPin size={18} color="var(--accent-color)" /> 123 Farm Road, Dhaka, Bangladesh
              </li>
            </ul>
            
            {/* Social Icons Section using SVGs for safety */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} QurbaniHat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
