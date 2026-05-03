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

  const IconRight = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '5px' }}><path d="m9 18 6-6-6-6" /></svg>;
  const IconAward = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>;
  const IconShield = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
  const IconTruck = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>;
  const IconInfo = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>;

  return (
    <div className="home-container" style={{ overflowX: 'hidden' }}>
      {/* 1. Hero Section */}
      <section className="hero-section" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        textAlign: 'center',
        overflow: 'hidden',
        paddingTop: '70px'
      }}>
        {/* Blurred Background Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url("/bannar.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
          transform: 'scale(1.05)', // Prevent white edges from blur
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2, color: 'white' }}>
          <div className="animate__animated animate__fadeIn">
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span className="hero-tag" style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 15px', borderRadius: '50px', fontSize: '0.8rem', backdropFilter: 'blur(5px)' }}>
                Certified Farms Only
              </span>
              <span className="hero-tag" style={{ background: 'var(--accent-color)', padding: '6px 15px', borderRadius: '50px', fontSize: '0.8rem', color: 'white' }}>
                Booking Open 2026
              </span>
            </div>

            <h1 className="animate__animated animate__fadeInDown hero-title" style={{ fontSize: 'clamp(2.2rem, 8vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '25px', textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}>
              Bringing the <span style={{ color: 'var(--accent-color)' }}>Best Livestock</span> <br /> to Your Doorstep.
            </h1>

            <p className="animate__animated animate__fadeInUp hero-desc" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: '40px', opacity: '0.9', maxWidth: '750px', margin: '0 auto 40px', textShadow: '0 1px 5px rgba(0,0,0,0.2)' }}>
              Skip the crowded markets. Browse through hundreds of verified, healthy, and premium breeds directly from top-tier farms.
            </p>

            <div className="animate__animated animate__fadeInUp" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '50px' }}>
              <Link to="/animals" className="btn btn-accent animate__animated animate__pulse animate__infinite" style={{ padding: '15px 35px', fontSize: '1.1rem', borderRadius: '50px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                Explore Collection <IconRight />
              </Link>
            </div>

            {/* Responsive Badges Grid */}
            <div className="animate__animated animate__fadeInUp badge-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '15px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {[
                { icon: <IconAward />, text: "Organic Feed" },
                { icon: <IconShield />, text: "Vet Verified" },
                { icon: <IconTruck />, text: "Safe Delivery" },
                { icon: <IconInfo />, text: "Fixed Price" }
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  padding: '12px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <div style={{ color: 'var(--accent-color)', transform: 'scale(0.8)' }}>{stat.icon}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Animals Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="animate__animated animate__fadeInUp" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', color: 'var(--primary-color)', fontWeight: '800' }}>
              Featured Animals
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem', marginTop: '10px' }}>Handpicked healthy livestock for your sacred Qurbani</p>
          </div>

          {loading ? (
            <div className="loading-spinner">Loading premium collection...</div>
          ) : (
            <div className="animal-grid animate__animated animate__fadeInUp">
              {featuredAnimals.map(animal => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Extra Section: Qurbani Tips */}
      <section style={{ padding: '120px 0', backgroundColor: '#f4f7f4', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(27, 94, 32, 0.05) 0%, transparent 70%)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate__animated animate__fadeInUp" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ display: 'inline-block', padding: '8px 20px', borderRadius: '50px', background: 'rgba(27, 94, 32, 0.1)', color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '20px', letterSpacing: '1px' }}>
              EXPERT ADVICE
            </div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', color: 'var(--primary-color)', fontWeight: '800' }}>
              Mastering Your <span style={{ color: 'var(--accent-color)' }}>Qurbani</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {[
              { title: "Age Validation", desc: "Check the teeth! Cows must be 2+ years and goats 1+ year old for a valid sacrifice.", icon: "🦷", gradient: "linear-gradient(135deg, #1b5e20, #2e7d32)" },
              { title: "Health Check", desc: "Bright eyes, moist muzzle, and active movement are key indicators of a healthy animal.", icon: "✨", gradient: "linear-gradient(135deg, #eab308, #ca8a04)" },
              { title: "Quality Texture", desc: "A soft and shiny coat indicates proper nutrition and grooming from the farm.", icon: "🐑", gradient: "linear-gradient(135deg, #2e7d32, #1b5e20)" }
            ].map((tip, i) => (
              <div key={i} className="animate__animated animate__fadeInUp" style={{ padding: '60px 40px', borderRadius: '32px', backgroundColor: 'white', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', textAlign: 'center', transition: '0.3s' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: tip.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '35px', margin: '0 auto 35px', transform: 'rotate(-5deg)', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>{tip.icon}</div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-color)', fontWeight: '700', marginBottom: '15px' }}>{tip.title}</h3>
                <p style={{ color: '#555', lineHeight: '1.8', fontSize: '1.05rem' }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section: Top Breeds */}
      <section style={{ padding: '120px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div className="animate__animated animate__fadeInUp" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{ color: 'var(--primary-color)', fontWeight: '700', fontSize: '1rem', borderBottom: '3px solid var(--accent-color)', paddingBottom: '10px' }}>
              OUR PREMIUM SELECTION
            </span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', color: 'var(--primary-color)', marginTop: '25px' }}>
              Most Popular Breeds
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            {[
              { name: "Deshi Shahi", img: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=800&auto=format&fit=crop", desc: "Highly demanded for its lean meat and natural rearing process.", badge: "Top Rated" },
              { name: "Black Bengal", img: "https://images.unsplash.com/photo-1524024973431-2ad916746881?q=80&w=800&auto=format&fit=crop", desc: "Famous worldwide for its tender and premium quality meat.", badge: "Best Seller" },
              { name: "Red Sindhi", img: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=800&auto=format&fit=crop", desc: "Known for its large body structure and massive weight.", badge: "Premium" }
            ].map((breed, i) => (
              <div key={i} className="animate__animated animate__fadeInUp" style={{ borderRadius: '40px', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 25px 60px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                  <img src={breed.img} alt={breed.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--accent-color)', color: 'white', padding: '8px 18px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '700', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                    {breed.badge}
                  </div>
                </div>
                <div style={{ padding: '40px' }}>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-color)', marginBottom: '15px', fontWeight: '800' }}>{breed.name}</h3>
                  <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.7', marginBottom: '25px' }}>{breed.desc}</p>
                  <Link to="/animals" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                    EXPLORE BREED <IconRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 480px) {
          .hero-section { padding: 40px 15px !important; }
          .hero-tag { font-size: 0.7rem !important; padding: 5px 12px !important; }
          .hero-title { font-size: 2.2rem !important; }
          .badge-grid { grid-template-columns: 1fr 1fr !important; }
          .animal-grid, .badge-grid { gap: 15px !important; }
        }
      `}</style>
    </div>
  );
}
