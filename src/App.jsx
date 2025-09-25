import React, { useEffect } from 'react'
import Ballpit from './components/Ballpit'
import NavMenu from './components/NavMenu'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectCards from './components/ProjectCards'
import './styles.css'

function App() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Basheer Muhammad Khan - Senior Unity Developer | VR/AR Specialist | Game Development Expert";
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Senior Unity Developer with 3.5+ years experience in game development, VR/AR applications, and interactive solutions. Specialized in Unity, C#, mobile games, and immersive experiences.');
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    // Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'Unity Developer, VR AR Developer, Game Development, C# Programming, Mobile Games, Virtual Reality, Augmented Reality, Unity 3D, Game Designer, Interactive Applications');
    if (!document.querySelector('meta[name="keywords"]')) {
      document.head.appendChild(metaKeywords);
    }

    // Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', 'Basheer Muhammad Khan - Senior Unity Developer & VR/AR Specialist');
    if (!document.querySelector('meta[property="og:title"]')) {
      document.head.appendChild(ogTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', 'Professional Unity Developer specializing in immersive gaming experiences, VR/AR applications, and cross-platform solutions. 20+ commercial projects delivered.');
    if (!document.querySelector('meta[property="og:description"]')) {
      document.head.appendChild(ogDescription);
    }

    // Author
    const metaAuthor = document.querySelector('meta[name="author"]') || document.createElement('meta');
    metaAuthor.setAttribute('name', 'author');
    metaAuthor.setAttribute('content', 'Basheer Muhammad Khan');
    if (!document.querySelector('meta[name="author"]')) {
      document.head.appendChild(metaAuthor);
    }

  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: 'transparent'
    }}>
      {/* 3D Ballpit Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <Ballpit />
      </div>

  {/* Navigation Menu (replaces old InteractiveMenu) */}
  <NavMenu />

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}>
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Projects Section */}
        <ProjectCards />

        {/* Contact Section */}
        <section id="contact" style={{
          padding: '6rem 2rem',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #00ff88, #00ccff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700'
            }}>
              Let's Create Something Amazing Together
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Ready to bring your vision to life? I'm available for freelance projects, 
              full-time opportunities, and consulting work. Let's discuss how we can 
              create exceptional gaming experiences and innovative solutions together.
            </p>

            <div style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                borderRadius: '15px',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                minWidth: '200px'
              }}>
                <h3 style={{ color: '#00ff88', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                  📧 Professional Email
                </h3>
                <p style={{ color: 'white', fontSize: '1rem' }}>
                  basheer.dev@gmail.com
                </p>
              </div>

              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(0, 204, 255, 0.1)',
                borderRadius: '15px',
                border: '1px solid rgba(0, 204, 255, 0.3)',
                minWidth: '200px'
              }}>
                <h3 style={{ color: '#00ccff', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                  💼 LinkedIn Profile
                </h3>
                <p style={{ color: 'white', fontSize: '1rem' }}>
                  Professional Network
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => window.open('mailto:basheer.dev@gmail.com?subject=Project Inquiry - Unity Development&body=Hello Basheer,%0D%0A%0D%0AI would like to discuss a potential project opportunity...', '_blank')}
                style={{
                  padding: '14px 28px',
                  backgroundColor: '#00ff88',
                  color: 'black',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 10px 20px rgba(0, 255, 136, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                📧 Send Email
              </button>
              
              <button
                onClick={() => window.open('https://www.linkedin.com/in/basheer-muhammad-khan-781263217/', '_blank')}
                style={{
                  padding: '14px 28px',
                  backgroundColor: 'transparent',
                  color: '#00ccff',
                  border: '2px solid #00ccff',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#00ccff';
                  e.target.style.color = 'black';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 10px 20px rgba(0, 204, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#00ccff';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                💼 Connect on LinkedIn
              </button>
            </div>

            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ 
                color: '#00ff88', 
                marginBottom: '1rem',
                fontSize: '1.2rem',
                fontWeight: '600'
              }}>
                🚀 Services Available
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1rem'
              }}>
                <div>✅ Custom Game Development</div>
                <div>✅ VR/AR Applications</div>
                <div>✅ Unity Consulting</div>
                <div>✅ Performance Optimization</div>
                <div>✅ Cross-Platform Porting</div>
                <div>✅ Technical Architecture</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
