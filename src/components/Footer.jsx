export default function Footer() {
  return (
    <footer>
      <div className="container footer-content">
        <div className="footer-section">
          <h3>QurbaniHat</h3>
          <p>The most trusted online marketplace for buying healthy and verified Qurbani animals.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul style={{ lineHeight: '2' }}>
            <li><a href="/">Home</a></li>
            <li><a href="/animals">All Animals</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul style={{ lineHeight: '2' }}>
            <li>Email: support@qurbanihat.com</li>
            <li>Phone: +880 1234 567 890</li>
            <li>Address: 123 Farm Road, Dhaka, Bangladesh</li>
          </ul>
          <div className="social-links">
            <a href="#" style={{ textDecoration: 'underline' }}>Facebook</a>
            <a href="#" style={{ textDecoration: 'underline' }}>Twitter</a>
            <a href="#" style={{ textDecoration: 'underline' }}>Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} QurbaniHat. All rights reserved.</p>
      </div>
    </footer>
  );
}
