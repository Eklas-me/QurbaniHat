import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Info, Award, ShieldCheck, Truck } from 'lucide-react';
import AnimalCard from '../components/AnimalCard';

export default function Home() {
  const [featuredAnimals, setFeaturedAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Home | QurbaniHat";
    fetch('/animals.json')
      .then(res => res.json())
      .then(data => {
        setFeaturedAnimals(data.slice(0, 6));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching animals:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container">
      {/* 1. Hero Section - Full Width and Responsive */}
      <section className="hero-section" style={{
        position: 'relative',
        minHeight: '550px',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(135deg, rgba(27, 94, 32, 0.95) 0%, rgba(27, 94, 32, 0.6) 100%), url("https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%'
      }}>
        <div className="container" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 0.8fr', 
          gap: '40px', 
          alignItems: 'center',
          position: 'relative', 
          zIndex: 2, 
          color: 'white',
          padding: '40px 24px'
        }}>
          <div className="hero-content animate__animated animate__fadeInLeft">
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: '50px', fontSize: '0.8rem', backdropFilter: 'blur(5px)' }}>
                Certified Farms Only
              </span>
              <span style={{ background: 'var(--accent-color)', padding: '5px 12px', borderRadius: '50px', fontSize: '0.8rem', color: 'white' }}>
                Booking Open 2026
              </span>
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px' }}>
              Bringing the <br/> <span style={{ color: 'var(--accent-color)' }}>Best Livestock</span> <br/> to Your Doorstep.
            </h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: '0.9', maxWidth: '500px' }}>
              Skip the crowded markets. Browse through verified, healthy, and premium breeds of cows and goats directly from top-tier farms.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link to="/animals" className="btn btn-accent" style={{ padding: '15px 30px', fontSize: '1rem' }}>
                Explore Collection <ChevronRight size={18} />
              </Link>
            </div>
          </div>
          
          <div className="hero-stats animate__animated animate__fadeInRight" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {[
              { icon: <Award size={24} />, text: "100% Organic Feed" },
              { icon: <ShieldCheck size={24} />, text: "Vet Verified" },
              { icon: <Truck size={24} />, text: "Safe Delivery" },
              { icon: <Info size={24} />, text: "Fixed Price" }
            ].map((stat, i) => (
              <div key={i} style={{ 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(10px)', 
                padding: '20px', 
                borderRadius: '20px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ color: 'var(--accent-color)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Featured Animals Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '50px' }}>
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
          
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/animals" className="btn btn-primary" style={{ padding: '12px 30px' }}>
              View All Animals <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Extra Section: Qurbani Tips */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '50px' }}>
            Qurbani Tips
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { title: "Check Teeth for Age", desc: "Ensure the animal meets the Islamic age requirement. Cows should be at least 2 years and goats 1 year old." },
              { title: "Physical Health", desc: "Look for bright eyes and active movement. The animal should not have any physical defects or broken horns." },
              { title: "Shiny Coat", desc: "A shiny and clean skin coat is a primary indicator of a healthy and well-fed livestock." }
            ].map((tip, i) => (
              <div key={i} className="animate__animated animate__fadeInUp" style={{ 
                padding: '30px', 
                borderRadius: '20px', 
                backgroundColor: 'var(--background)',
                borderLeft: '5px solid var(--accent-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <Info color="var(--accent-color)" size={28} />
                  <h3 style={{ fontSize: '1.3rem' }}>{tip.title}</h3>
                </div>
                <p style={{ color: '#555', lineHeight: '1.6' }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Extra Section: Top Breeds */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '50px' }}>
            Top Breeds
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {[
              { 
                name: "Deshi Shahi", 
                img: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=800&auto=format&fit=crop", 
                desc: "Highly demanded for its lean meat and natural rearing process. A classic choice for Qurbani." 
              },
              { 
                name: "Black Bengal Goat", 
                img: "https://images.unsplash.com/photo-1524024973431-2ad916746881?q=80&w=800&auto=format&fit=crop", 
                desc: "Famous worldwide for its tender and premium quality meat. Ideal for small family celebrations." 
              },
              { 
                name: "Red Sindhi", 
                img: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=800&auto=format&fit=crop", 
                desc: "Known for its large body structure and massive weight. Best for those seeking grand animals." 
              }
            ].map((breed, i) => (
              <div key={i} className="animate__animated animate__fadeInUp" style={{ 
                borderRadius: '24px', 
                overflow: 'hidden', 
                backgroundColor: 'white',
                boxShadow: 'var(--box-shadow)'
              }}>
                <img src={breed.img} alt={breed.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '25px' }}>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-color)', marginBottom: '10px' }}>{breed.name}</h3>
                  <p style={{ color: '#666', fontSize: '0.95rem' }}>{breed.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
