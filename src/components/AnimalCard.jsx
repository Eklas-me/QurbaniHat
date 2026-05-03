import { Link } from 'react-router-dom';

export default function AnimalCard({ animal }) {
  return (
    <div className="animal-card animate__animated animate__fadeInUp">
      <img src={animal.image} alt={animal.name} className="animal-image" />
      <div className="animal-info">
        <h3>{animal.name}</h3>
        <p style={{ color: '#666', marginBottom: '10px' }}>{animal.breed} • {animal.type}</p>
        <p className="price">৳ {animal.price.toLocaleString()}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.9rem' }}>
          <span>⚖️ {animal.weight} kg</span>
          <span>📍 {animal.location}</span>
        </div>
        <Link to={`/details-page/${animal.id}`} className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
          View Details
        </Link>
      </div>
    </div>
  );
}
