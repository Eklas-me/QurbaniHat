import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Safe SVG Icons
  const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
  const IconClose = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

  return (
    <header>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px' }}>
        
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu} style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🐂</span> QurbaniHat
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
          <NavLink to="/animals" className={({ isActive }) => isActive ? "active-link" : ""}>All Animals</NavLink>
          
          <div style={{ marginLeft: '10px' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Link to="/my-profile">
                  <img src={user.image} alt={user.name} style={{ width: '35px', height: '35px', borderRadius: '50%', border: '2px solid var(--primary-color)', cursor: 'pointer', transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                </Link>
                <button onClick={logout} className="btn btn-outline" style={{ padding: '6px 15px', fontSize: '0.85rem' }}>Logout</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to="/login" className="btn btn-outline" style={{ padding: '8px 20px' }}>Login</Link>
                <Link to="/register" className="btn btn-primary" style={{ padding: '8px 20px' }}>Register</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-btn" onClick={toggleMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-color)', display: 'none' }}>
          {isMenuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={`mobile-sidebar ${isMenuOpen ? 'open' : ''}`} style={{
        position: 'fixed',
        top: 0,
        right: isMenuOpen ? '0' : '-100%',
        width: '280px',
        height: '100vh',
        background: 'white',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
        transition: '0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
        zIndex: 3000,
        padding: '40px 25px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button onClick={toggleMenu} style={{ background: 'none', border: 'none', color: '#666' }}><IconClose /></button>
        </div>

        {user && (
          <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <img src={user.image} alt={user.name} style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px', border: '3px solid var(--primary-color)' }} />
            <h4 style={{ margin: 0 }}>{user.name}</h4>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>{user.email}</p>
          </div>
        )}

        <NavLink to="/" onClick={closeMenu} className="mobile-link">Home</NavLink>
        <NavLink to="/animals" onClick={closeMenu} className="mobile-link">All Animals</NavLink>
        {user && <NavLink to="/my-profile" onClick={closeMenu} className="mobile-link">My Profile</NavLink>}
        
        <div style={{ marginTop: 'auto' }}>
          {user ? (
            <button onClick={() => { logout(); closeMenu(); }} className="btn btn-outline" style={{ width: '100%' }}>Logout</button>
          ) : (
            <Link to="/login" onClick={closeMenu} className="btn btn-primary" style={{ width: '100%' }}>Login</Link>
          )}
        </div>
      </div>

      {/* Overlay Backdrop */}
      {isMenuOpen && <div onClick={closeMenu} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 2500 }}></div>}

      <style>{`
        .active-link { color: var(--primary-color) !important; font-weight: 700; }
        .mobile-link { font-size: 1.2rem; font-weight: 600; color: #333; padding: 10px 0; border-bottom: 1px solid #f9f9f9; }
        .mobile-link.active { color: var(--primary-color); }
        
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
