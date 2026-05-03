import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Safe SVG icons
  const IconBack = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="m15 18-6-6 6-6"/></svg>;
  const IconScale = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"/><path d="M3 7h18"/></svg>;
  const IconMap = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
  const IconAward = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;

  useEffect(() => {
    fetch('/animals.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.id === parseInt(id));
        if (found) {
          setAnimal(found);
          document.title = `${found.name} | QurbaniHat`;
        } else {
          toast.error("Animal not found!");
          navigate('/animals');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching details:", err);
        setLoading(false);
      });
  }, [id, navigate]);

  const handleBooking = (e) => {
    e.preventDefault();
    toast.success(`Success! Booking request for ${animal.name} sent.`, {
        duration: 4000,
        position: 'bottom-right'
    });
    e.target.reset();
  };

  if (loading) return <div className="loading-spinner">Loading animal details...</div>;
  if (!animal) return null;

  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      {/* Back Link */}
      <div style={{ marginBottom: '40px' }}>
        <Link to="/animals" style={{ display: 'flex', alignItems: 'center', color: '#666', fontWeight: '600', transition: '0.3s' }}>
          <IconBack /> Back to Collection
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'start' }}>
        
        {/* Left: Clear Image Showcase */}
        <div className="animate__animated animate__fadeInLeft">
          <div style={{ borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', backgroundColor: 'white', padding: '10px' }}>
            <img 
              src={animal.image} 
              alt={animal.name} 
              style={{ width: '100%', height: 'auto', maxHeight: '600px', borderRadius: '24px', objectFit: 'contain', background: '#f8f9f8' }} 
            />
          </div>
          
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '20px' }}>Description</h2>
            <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#555' }}>{animal.description}</p>
          </div>
        </div>

        {/* Right: Info & Full Booking Form */}
        <div className="animate__animated animate__fadeInRight">
          <div style={{ marginBottom: '30px' }}>
            <span style={{ background: 'var(--accent-color)', color: 'white', padding: '6px 18px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {animal.category}
            </span>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary-color)', margin: '15px 0' }}>{animal.name}</h1>
            <p style={{ fontSize: '1.4rem', color: '#e65100', fontWeight: '900' }}>৳ {animal.price.toLocaleString()}</p>
          </div>

          {/* Detailed Specs Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
            {[
              { icon: <IconScale />, label: "Weight", value: animal.weight + " kg" },
              { icon: <IconMap />, label: "Location", value: animal.location },
              { icon: <IconAward />, label: "Breed", value: animal.breed },
              { icon: <IconAward />, label: "Age", value: animal.age + " Years" }
            ].map((spec, i) => (
              <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.02)', border: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#888', fontSize: '0.85rem', marginBottom: '8px' }}>
                  {spec.icon} {spec.label}
                </div>
                <span style={{ fontWeight: '800', fontSize: '1.1rem', color: '#333' }}>{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Full Booking Form - Required Fields */}
          <div style={{ background: 'white', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-color)', marginBottom: '25px', textAlign: 'center' }}>Reserve Now</h3>
            <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Full Name</label>
                <input type="text" placeholder="Enter your full name" required style={{ padding: '12px' }} />
              </div>
              
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Email Address</label>
                <input type="email" placeholder="Enter your email" required style={{ padding: '12px' }} />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Phone Number</label>
                <input type="tel" placeholder="Enter your phone number" required style={{ padding: '12px' }} />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Full Address</label>
                <input type="text" placeholder="Enter your shipping address" required style={{ padding: '12px' }} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.1rem', borderRadius: '15px', marginTop: '10px' }}>
                Confirm Booking Request
              </button>
            </form>
            <p style={{ textAlign: 'center', color: '#888', fontSize: '0.8rem', marginTop: '20px' }}>
              * Our agent will contact you shortly to confirm the details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
