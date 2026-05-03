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

  // Simple SVG components to avoid library issues
  const IconRight = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '5px' }}><path d="m9 18 6-6-6-6"/></svg>;
  const IconAward = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;
  const IconShield = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
  const IconTruck = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
  const IconInfo = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
  const IconCheck = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

  return (
    <div className="home-container" style={{ overflow: 'hidden' }}>
      {/* 1. Hero Section - Centered Layout */}
      <section className="hero-section" style={{
        position: 'relative',
        minHeight: '650px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(rgba(13, 46, 16, 0.8), rgba(13, 46, 16, 0.5)), url("https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, color: 'white' }}>
          <div className="animate__animated animate__fadeIn">
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
              <span className="animate__animated animate__fadeInLeft animate__delay-1s" style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 15px', borderRadius: '50px', fontSize: '0.85rem', backdropFilter: 'blur(5px)' }}>
                Certified Farms Only
              </span>
              <span className="animate__animated animate__fadeInRight animate__delay-1s" style={{ background: 'var(--accent-color)', padding: '6px 15px', borderRadius: '50px', fontSize: '0.85rem', color: 'white' }}>
                Booking Open 2026
              </span>
            </div>
            <h1 className="animate__animated animate__fadeInDown" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '25px' }}>
              Bringing the <span style={{ color: 'var(--accent-color)' }}>Best Livestock</span> <br/> to Your Doorstep.
            </h1>
            <p className="animate__animated animate__fadeInUp animate__delay-1s" style={{ fontSize: '1.25rem', marginBottom: '40px', opacity: '0.9', maxWidth: '750px', margin: '0 auto 40px' }}>
              Skip the crowded markets. Browse through hundreds of verified, healthy, and premium breeds of cows and goats directly from top-tier farms.
            </p>
            <div className="animate__animated animate__fadeInUp animate__delay-1s" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '50px' }}>
              <Link to="/animals" className="btn btn-accent animate__animated animate__pulse animate__infinite" style={{ padding: '18px 40px', fontSize: '1.15rem', display: 'flex', alignItems: 'center', borderRadius: '50px' }}>
                Explore Collection <IconRight />
              </Link>
            </div>
            
            {/* Badges centered below */}
            <div className="animate__animated animate__fadeInUp animate__delay-2s" style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '20px', 
              flexWrap: 'wrap',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {[
                { icon: <IconAward />, text: "100% Organic Feed" },
                { icon: <IconShield />, text: "Vet Verified" },
                { icon: <IconTruck />, text: "Safe Delivery" },
                { icon: <IconInfo />, text: "Fixed Price" }
              ].map((stat, i) => (
                <div key={i} className="animate__animated animate__fadeIn" style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  backdropFilter: 'blur(10px)', 
                  padding: '12px 25px', 
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <div style={{ color: 'var(--accent-color)' }}>{stat.icon}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{stat.text}</div>
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
            <h2 style={{ fontSize: '2.8rem', color: 'var(--primary-color)', marginBottom: '15px' }}>
              Featured Animals
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Handpicked healthy livestock for your sacred Qurbani</p>
          </div>
          
          {loading ? (
            <div className="loading-spinner">Loading animals...</div>
          ) : (
            <div className="animal-grid animate__animated animate__fadeInUp">
              {featuredAnimals.map(animal => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link to="/animals" className="btn btn-primary animate__animated animate__fadeInUp" style={{ padding: '15px 35px', display: 'inline-flex', alignItems: 'center', borderRadius: '50px', fontSize: '1.1rem' }}>
              View All Animals <IconRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Extra Section: Qurbani Tips */}
      <section style={{ padding: '120px 0', backgroundColor: '#f4f7f4', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(27, 94, 32, 0.05) 0%, transparent 70%)', zIndex: 0 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate__animated animate__fadeInUp" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ display: 'inline-block', padding: '8px 20px', borderRadius: '50px', background: 'rgba(27, 94, 32, 0.1)', color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '20px', letterSpacing: '1px' }}>
              EXPERT ADVICE
            </div>
            <h2 style={{ fontSize: '3.5rem', color: 'var(--primary-color)', fontWeight: '800', marginBottom: '20px' }}>
              Mastering Your <span style={{ color: 'var(--accent-color)' }}>Qurbani</span>
            </h2>
            <p style={{ color: '#666', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
              Ensure a meaningful and hassle-free sacrifice with our comprehensive livestock selection guide.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {[
              { title: "Age Validation", desc: "Check the teeth! Cows must have at least 2 permanent teeth (2 years old) and goats should be 1 year old.", icon: "🦷", gradient: "linear-gradient(135deg, #1b5e20, #2e7d32)" },
              { title: "Health Inspection", desc: "Active ears, moist muzzle, and bright eyes are signs of health. Avoid animals with any physical deformities.", icon: "✨", gradient: "linear-gradient(135deg, #eab308, #ca8a04)" },
              { title: "Quality Texture", desc: "A soft, shiny, and smooth coat indicates proper nutrition and grooming from the farm.", icon: "🐑", gradient: "linear-gradient(135deg, #2e7d32, #1b5e20)" }
            ].map((tip, i) => (
              <div key={i} className="animate__animated animate__fadeInUp" style={{ padding: '60px 40px', borderRadius: '32px', backgroundColor: 'white', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid rgba(255,255,255,0.8)', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: tip.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '35px', margin: '0 auto 35px', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', transform: 'rotate(-5deg)' }}>{tip.icon}</div>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-color)', fontWeight: '700', marginBottom: '20px' }}>{tip.title}</h3>
                <p style={{ color: '#555', lineHeight: '1.8', fontSize: '1.1rem' }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Extra Section: Top Breeds - BEAUTIFIED */}
      <section style={{ padding: '120px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div className="animate__animated animate__fadeInUp" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{ color: 'var(--primary-color)', fontWeight: '700', fontSize: '1rem', borderBottom: '3px solid var(--accent-color)', paddingBottom: '10px' }}>
              OUR PREMIUM SELECTION
            </span>
            <h2 style={{ fontSize: '3rem', color: 'var(--primary-color)', marginTop: '25px', marginBottom: '20px' }}>
              Most Popular Breeds
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Discover the most sought-after livestock breeds known for their quality, size, and tradition.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '40px' }}>
            {[
              { 
                name: "Deshi Shahi", 
                img: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=800&auto=format&fit=crop", 
                desc: "Highly demanded for its lean meat and natural rearing process. A classic choice for Qurbani.",
                badge: "Top Rated"
              },
              { 
                name: "Black Bengal Goat", 
                img: "https://images.unsplash.com/photo-1524024973431-2ad916746881?q=80&w=800&auto=format&fit=crop", 
                desc: "Famous worldwide for its tender and premium quality meat. Ideal for small family celebrations.",
                badge: "Best Seller"
              },
              { 
                name: "Red Sindhi", 
                img: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=800&auto=format&fit=crop", 
                desc: "Known for its large body structure and massive weight. Best for those seeking grand animals.",
                badge: "Premium"
              }
            ].map((breed, i) => (
              <div key={i} className="animate__animated animate__fadeInUp" style={{ 
                borderRadius: '40px', 
                overflow: 'hidden', 
                backgroundColor: 'white',
                boxShadow: '0 25px 60px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.04)',
                position: 'relative'
              }}>
                <div style={{ position: 'relative', overflow: 'hidden', height: '280px' }}>
                  <img src={breed.img} alt={breed.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="breed-img" />
                  <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--accent-color)', color: 'white', padding: '8px 18px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '700', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                    {breed.badge}
                  </div>
                </div>
                <div style={{ padding: '40px' }}>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-color)', marginBottom: '15px', fontWeight: '800' }}>{breed.name}</h3>
                  <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '25px' }}>{breed.desc}</p>
                  <Link to="/animals" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', borderBottom: '2px solid transparent', transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.borderBottom = '2px solid var(--primary-color)'} onMouseOut={e => e.currentTarget.style.borderBottom = '2px solid transparent'}>
                    SEE ALL {breed.name.toUpperCase()} <IconRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
