import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "My Profile | QurbaniHat";
  }, []);

  if (!user) return null;

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '30px', textAlign: 'center' }}>My Profile</h1>
      
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--box-shadow)', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
        
        <img 
          src={user.image || 'https://via.placeholder.com/150'} 
          alt={user.name || 'User'} 
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary-color)', marginBottom: '20px' }} 
        />
        
        <div style={{ textAlign: 'center', width: '100%' }}>
          <h2 style={{ marginBottom: '10px' }}>{user.name || 'No Name Provided'}</h2>
          <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '30px' }}>{user.email}</p>
          
          <Link to="/update-profile" className="btn btn-primary" style={{ minWidth: '200px' }}>
            Update Information
          </Link>
        </div>
      </div>
    </div>
  );
}
