import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '60vh',
      textAlign: 'center'
    }}>
      <h1 className="animate__animated animate__bounce" style={{ fontSize: '5rem', color: 'var(--primary-color)', marginBottom: '20px' }}>
        404
      </h1>
      <h2 style={{ marginBottom: '20px' }}>Page Not Found</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary animate__animated animate__pulse animate__infinite">
        Back to Home
      </Link>
    </div>
  );
}
