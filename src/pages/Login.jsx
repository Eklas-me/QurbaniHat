import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    document.title = "Login | QurbaniHat";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    try {
      const res = await login(email, password);
      // better-auth might not throw on error, it uses data/error pattern. 
      // Our context handles the toast inside its login function.
      if (res && res.data) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      toast.error(err.message || 'Login failed!');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogle();
      if (res && res.data) {
        toast.success("Google Login successful!");
        navigate(from, { replace: true });
      } else if (res && res.error) {
        toast.error(res.error.message || "Google Login failed!");
      }
    } catch (err) {
      toast.error(err.message || 'Google Login failed!');
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--primary-color)' }}>Login to QurbaniHat</h2>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required placeholder="your@email.com" />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required placeholder="Enter your password" />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
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
        Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Register here</Link>
      </p>
    </div>
  );
}
