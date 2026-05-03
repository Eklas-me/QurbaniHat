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
    <div style={{ padding: '100px 20px 60px' }}> {/* Increased padding to fix overlap */}
      <div className="container animate__animated animate__fadeIn" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--primary-color)', marginBottom: '40px', textAlign: 'center', fontWeight: '800', fontSize: '2.5rem' }}>My Profile</h1>
        
        <div style={{ backgroundColor: 'white', padding: '50px 40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #f0f0f0' }}>
          
          <img 
            src={user.image || 'https://via.placeholder.com/150'} 
            alt={user.name || 'User'} 
            style={{ width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover', border: '5px solid var(--primary-color)', marginBottom: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} 
          />
          
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#333', fontWeight: '700' }}>{user.name || 'User'}</h2>
            <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '40px' }}>{user.email}</p>
            
            <Link to="/update-profile" className="btn btn-primary" style={{ padding: '15px 40px', borderRadius: '50px', fontSize: '1.1rem' }}>
              Update Information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
