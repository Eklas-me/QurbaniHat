import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Safe SVG icons
  const IconUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  const IconLogOut = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

  return (
    <header>
      <div className="container navbar">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <span>🐄 QurbaniHat</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/animals">All Animals</Link>
        </nav>

        <div className="auth-buttons">
          {user ? (
            <div className="user-profile-nav" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Link to="/my-profile" title="My Profile">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="user-avatar" style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <div className="user-avatar" style={{ width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0e0e0', color: '#333' }}>
                    <IconUser />
                  </div>
                )}
              </Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px' }}>
                <IconLogOut /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
