import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimalCard from '../components/AnimalCard';

export default function Home() {
  const [featuredAnimals, setFeaturedAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Home | QurbaniHat";
    fetch('/animals.json')
      .then(res => res.json())
      .then(data => {
        setFeaturedAnimals(data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching animals:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{ 
        backgroundColor: 'var(--primary-color)', 
        color: 'white',
        padding: '80px 20px',
        borderRadius: 'var(--border-radius)',
        marginTop: '20px',
        textAlign: 'center',
        backgroundImage: 'linear-gradient(rgba(46, 125, 50, 0.9), rgba(46, 125, 50, 0.8)), url("https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <h1 className="animate__animated animate__fadeInDown" style={{ fontSize: '3rem', marginBottom: '20px' }}>
          Find Your Perfect Qurbani Animal
        </h1>
        <p className="animate__animated animate__fadeInUp" style={{ fontSize: '1.2rem', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
          Browse verified, healthy, and premium breeds of cows and goats for your Qurbani. Direct from the farm to your door.
        </p>
        <Link to="/animals" className="btn btn-accent animate__animated animate__pulse animate__infinite" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
          Browse Animals
        </Link>
      </section>

      {/* Featured Animals Section */}
      <section style={{ padding: '60px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.2rem', color: 'var(--primary-color)' }}>
          Featured Animals
        </h2>
        {loading ? (
          <div className="loading-spinner">Loading animals...</div>
        ) : (
          <div className="animal-grid">
            {featuredAnimals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/animals" className="btn btn-primary">View All Animals</Link>
        </div>
      </section>

      {/* Top Breeds Section */}
      <section style={{ padding: '40px 0', backgroundColor: 'white', borderRadius: 'var(--border-radius)', margin: '40px 0', boxShadow: 'var(--box-shadow)' }}>
        <div style={{ padding: '0 30px' }}>
          <h2 style={{ marginBottom: '30px', color: 'var(--primary-color)' }}>Top Breeds</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px', padding: '20px', backgroundColor: 'var(--background)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '10px' }}>Deshi Shahi</h3>
              <p>Known for lean meat and natural rearing process. Highly demanded for Qurbani.</p>
            </div>
            <div style={{ flex: '1', minWidth: '250px', padding: '20px', backgroundColor: 'var(--background)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '10px' }}>Black Bengal Goat</h3>
              <p>Premium quality meat with world-class reputation. Perfect for small family Qurbani.</p>
            </div>
            <div style={{ flex: '1', minWidth: '250px', padding: '20px', backgroundColor: 'var(--background)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '10px' }}>Red Sindhi</h3>
              <p>Large body structure and heavy weight. Ideal for those looking for big animals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Qurbani Tips Section (Extra Section 1) */}
      <section style={{ padding: '40px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--primary-color)' }}>Qurbani Tips</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', borderLeft: '4px solid var(--accent-color)', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '10px' }}>Check Teeth for Age</h3>
            <p>Ensure the animal meets the Islamic age requirement by checking its teeth. Cows should be at least 2 years old.</p>
          </div>
          <div style={{ padding: '20px', borderLeft: '4px solid var(--accent-color)', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '10px' }}>Physical Health</h3>
            <p>Look for bright eyes, active movement, and a shiny coat. The animal should not have any broken horns or physical defects.</p>
          </div>
          <div style={{ padding: '20px', borderLeft: '4px solid var(--accent-color)', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '10px' }}>Feeding Habits</h3>
            <p>A healthy animal will eat continuously. Observe the animal eating before making your final selection.</p>
          </div>
        </div>
      </section>
      
      {/* How it Works (Extra Section 2) */}
      <section style={{ padding: '50px 20px', backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: 'var(--border-radius)', textAlign: 'center', margin: '40px 0' }}>
        <h2 style={{ marginBottom: '30px' }}>How Booking Works</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>1</div>
            <h4>Browse</h4>
            <p>Select your preferred animal</p>
          </div>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>2</div>
            <h4>Login</h4>
            <p>Create account or login</p>
          </div>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>3</div>
            <h4>Book</h4>
            <p>Fill up the booking form</p>
          </div>
        </div>
      </section>
    </div>
  );
}
