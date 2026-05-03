import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Register | QurbaniHat";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photo.value;
    const password = e.target.password.value;

    setLoading(true);
    try {
      const res = await register(name, email, password, photoURL);
      if (res && res.data) {
        toast.success("Registration successful! Please login.");
        navigate('/login');
      } else if (res && res.error) {
        toast.error(res.error.message || "Registration failed");
      }
    } catch (err) {
      toast.error(err.message || 'Registration failed!');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      toast.error(err.message || 'Google Login failed!');
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f7f4', minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', padding: '60px 20px' }}>
      <div className="animate__animated animate__fadeInUp" style={{ 
        maxWidth: '500px', 
        width: '100%', 
        margin: '0 auto', 
        background: 'white', 
        padding: '50px 40px', 
        borderRadius: '32px', 
        boxShadow: '0 25px 50px rgba(0,0,0,0.08)' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <span style={{ fontSize: '3rem' }}>📝</span>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-color)', fontWeight: '800', marginTop: '15px' }}>Join QurbaniHat</h2>
          <p style={{ color: '#666', marginTop: '5px' }}>Create your account to start booking</p>
        </div>
        
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="name" style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Full Name</label>
            <input type="text" id="name" required placeholder="Enter your full name" style={{ padding: '14px', borderRadius: '15px', border: '1px solid #eee' }} />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="email" style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Email Address</label>
            <input type="email" id="email" required placeholder="name@example.com" style={{ padding: '14px', borderRadius: '15px', border: '1px solid #eee' }} />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="photo" style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Photo URL</label>
            <input type="url" id="photo" required placeholder="https://image-link.com" style={{ padding: '14px', borderRadius: '15px', border: '1px solid #eee' }} />
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="password" style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Password</label>
            <input type="password" id="password" required placeholder="Create a strong password" style={{ padding: '14px', borderRadius: '15px', border: '1px solid #eee' }} />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '1.1rem', borderRadius: '15px', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Register Now'}
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: '30px 0', position: 'relative' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
          <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0 15px', color: '#888', fontSize: '0.85rem' }}>
            OR
          </span>
        </div>

        <button onClick={handleGoogleLogin} className="btn btn-outline" style={{ 
          width: '100%', 
          padding: '14px', 
          borderRadius: '15px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '12px',
          borderColor: '#ddd',
          color: '#333'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.25.81-.59z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign up with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '30px', color: '#666' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '800' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}
