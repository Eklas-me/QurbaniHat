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
      <h2 style={{ marginBottom: '15px', fontSize: '2rem' }}>Oops! Page Not Found</h2>
      <p style={{ color: '#666', marginBottom: '40px', maxWidth: '500px' }}>
        We couldn't find the page you were looking for. It might have been moved, deleted, or never existed.
      </p>
      <Link to="/" className="btn btn-primary animate__animated animate__pulse animate__infinite">
        Back to Home
      </Link>
    </div>
  );
}
