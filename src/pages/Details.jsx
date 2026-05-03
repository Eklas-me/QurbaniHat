import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

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
    // In a real app, send data to backend here.
    toast.success(`Booking successful for ${animal.name}! We will contact you soon.`);
    e.target.reset(); // Reset form on submit as required
  };

  if (loading) {
    return <div className="loading-spinner">Loading animal details...</div>;
  }

  if (!animal) return null;

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', backgroundColor: 'white', padding: '30px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--box-shadow)' }}>
        
        {/* Animal Details Image */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <img 
            src={animal.image} 
            alt={animal.name} 
            style={{ width: '100%', borderRadius: 'var(--border-radius)', objectFit: 'cover', height: '400px' }} 
          />
        </div>

        {/* Animal Info */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>{animal.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
            {animal.category} | {animal.breed}
          </p>
          
          <div style={{ backgroundColor: 'var(--background)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <p className="price" style={{ fontSize: '2rem', marginBottom: '15px' }}>
              ৳ {animal.price.toLocaleString()}
            </p>
            <ul style={{ lineHeight: '2', fontSize: '1.1rem' }}>
              <li><strong>Type:</strong> {animal.type}</li>
              <li><strong>Weight:</strong> {animal.weight} kg</li>
              <li><strong>Age:</strong> {animal.age} years</li>
              <li><strong>Location:</strong> {animal.location}</li>
            </ul>
          </div>
          
          <h3 style={{ marginBottom: '10px' }}>Description</h3>
          <p style={{ lineHeight: '1.8', color: '#444', marginBottom: '30px' }}>{animal.description}</p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="form-container" style={{ marginTop: '50px', maxWidth: '600px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary-color)' }}>
          Book {animal.name}
        </h2>
        <form onSubmit={handleBooking}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required placeholder="Enter your full name" />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" required placeholder="Enter your email" />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" required placeholder="Enter your phone number" />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Delivery Address</label>
            <input type="text" id="address" required placeholder="Enter full address" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px', fontSize: '1.1rem', padding: '12px' }}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
