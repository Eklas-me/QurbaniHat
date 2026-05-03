import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header>
      <div className="container navbar">
        <Link to="/" className="logo">
          <span>🐄 QurbaniHat</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/animals">All Animals</Link>
        </nav>

        <div className="auth-buttons">
          {user ? (
            <div className="user-profile-nav">
              <Link to="/my-profile" title="My Profile">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="user-avatar" />
                ) : (
                  <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0e0e0', color: '#333' }}>
                    <UserIcon size={20} />
                  </div>
                )}
              </Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
