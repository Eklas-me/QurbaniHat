import { useState, useEffect } from 'react';
import AnimalCard from '../components/AnimalCard';

export default function Animals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    document.title = "All Animals | QurbaniHat";
    fetch('/animals.json')
      .then(res => res.json())
      .then(data => {
        setAnimals(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching animals:", err);
        setLoading(false);
      });
  }, []);

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    if (order === 'lowToHigh') {
      const sorted = [...animals].sort((a, b) => a.price - b.price);
      setAnimals(sorted);
    } else if (order === 'highToLow') {
      const sorted = [...animals].sort((a, b) => b.price - a.price);
      setAnimals(sorted);
    } else {
      setLoading(true);
      fetch('/animals.json')
        .then(res => res.json())
        .then(data => {
          setAnimals(data);
          setLoading(false);
        });
    }
  };

  return (
    <div className="container" style={{ padding: '80px 20px 60px' }}>
      <div className="animals-header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px', 
        flexWrap: 'wrap', 
        gap: '20px' 
      }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800' }}>All Animals</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '10px 20px', borderRadius: '50px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          <label htmlFor="sort" style={{ fontWeight: '700', color: '#666', fontSize: '0.9rem' }}>Sort By Price: </label>
          <select 
            id="sort" 
            value={sortOrder} 
            onChange={handleSort}
            style={{ 
              padding: '5px', 
              borderRadius: '8px', 
              border: 'none', 
              background: 'transparent',
              fontWeight: '700',
              color: 'var(--primary-color)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Discovering livestock...</div>
      ) : (
        <div className="animal-grid">
          {animals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 600px) {
          .animals-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 15px !important;
          }
          .animals-header div {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
