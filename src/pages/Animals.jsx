import { useState, useEffect } from 'react';
import AnimalCard from '../components/AnimalCard';

export default function Animals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
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
      // Refresh to get default order
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
    <div style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <h1 style={{ color: 'var(--primary-color)' }}>All Animals</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="sort" style={{ fontWeight: 'bold' }}>Sort By Price: </label>
          <select 
            id="sort" 
            value={sortOrder} 
            onChange={handleSort}
            style={{ padding: '8px 15px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading animals...</div>
      ) : (
        <div className="animal-grid">
          {animals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}
    </div>
  );
}
