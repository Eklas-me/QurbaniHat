import { useState } from 'react';
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
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.message || 'Registration failed!');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogle();
      if (res && res.data) {
        toast.success("Google Login successful!");
        navigate('/');
      } else if (res && res.error) {
        toast.error(res.error.message || "Google Login failed!");
      }
    } catch (err) {
      toast.error(err.message || 'Google Login failed!');
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--primary-color)' }}>Register for QurbaniHat</h2>
      
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" required placeholder="Enter your full name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required placeholder="your@email.com" />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo URL</label>
          <input type="url" id="photo" required placeholder="https://example.com/your-photo.jpg" />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required placeholder="Create a strong password" />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div style={{ textAlign: 'center', margin: '20px 0', position: 'relative' }}>
        <hr style={{ border: 'none', borderTop: '1px solid #ddd' }} />
        <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0 10px', color: '#666', fontSize: '0.9rem' }}>
          OR
        </span>
      </div>

      <button onClick={handleGoogleLogin} className="btn btn-outline" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: '20px' }} />
        Login with Google
      </button>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Login here</Link>
      </p>
    </div>
  );
}
