import { Link } from 'react-router-dom';

export default function AnimalCard({ animal }) {
  // Safe SVG icon for the button
  const IconRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '5px' }}><path d="m9 18 6-6-6-6"/></svg>;

  return (
    <div className="animal-card animate__animated animate__fadeInUp" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      position: 'relative',
      backgroundColor: 'white',
      borderRadius: '24px',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
    }}>
      {/* Verified Badge */}
      <div style={{ 
        position: 'absolute', 
        top: '15px', 
        left: '15px', 
        zIndex: 2, 
        backgroundColor: 'rgba(27, 94, 32, 0.9)', 
        color: 'white', 
        padding: '5px 12px', 
        borderRadius: '50px', 
        fontSize: '0.75rem', 
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        backdropFilter: 'blur(5px)'
      }}>
        <span>✓</span> Verified Farm
      </div>

      <div style={{ overflow: 'hidden', height: '220px' }}>
        <img 
          src={animal.image} 
          alt={animal.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            transition: 'transform 0.5s' 
          }} 
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-color)', margin: 0 }}>{animal.name}</h3>
        </div>
        
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px', fontWeight: '500' }}>
          {animal.breed} <span style={{ opacity: 0.3, margin: '0 5px' }}>|</span> {animal.type}
        </p>

        <div style={{ 
          backgroundColor: '#f8f9f8', 
          padding: '12px', 
          borderRadius: '16px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '20px' 
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Weight</span>
            <span style={{ fontWeight: '700', color: '#333' }}>{animal.weight} kg</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</span>
            <span style={{ fontWeight: '700', color: '#333' }}>{animal.location}</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#e65100' }}>৳ {animal.price.toLocaleString()}</span>
          </div>
          
          <Link 
            to={`/details-page/${animal.id}`} 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '12px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            View Details <IconRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
