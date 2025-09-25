import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ElectricBorder from './ElectricBorder'
import FallingText from './FallingText'

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Game Developer | Unity Specialist | VR/AR Enthusiast";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 20px 50px',
      position: 'relative',
      width: '100%'
    }}>
      <div style={{ 
        maxWidth: '900px', 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '700',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.2',
            animation: 'bounce 2s ease-in-out infinite'
          }}>
            Basheer Muhammad Khan
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ marginBottom: '40px' }}
        >
          <h2 style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#7df9ff',
            fontWeight: '400',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {displayText}
            <span style={{ 
              animation: 'blink 1s infinite',
              marginLeft: '2px'
            }}>|</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ElectricBorder
            color="#10b981"
            speed={1}
            chaos={0.4}
            thickness={2}
            style={{ 
              borderRadius: '20px',
              maxWidth: '700px',
              margin: '0 auto'
            }}
          >
            <div style={{
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(30px)',
              borderRadius: '20px',
              padding: '50px 40px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                lineHeight: '1.6',
                color: '#e5e7eb',
                marginBottom: '30px'
              }}>
                Welcome to my portfolio! I'm a passionate game developer with{' '}
                <span style={{ color: '#10b981', fontWeight: '600' }}>3.5+ years</span> of experience 
                in Unity development, specializing in VR/AR experiences and interactive applications.
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                width: '100%'
              }}>
                <a 
                  href="https://www.linkedin.com/in/basheer-muhammad-khan-781263217"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    padding: '12px 24px',
                    border: '2px solid #3b82f6',
                    borderRadius: '25px',
                    transition: 'all 0.3s ease',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3b82f6';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#3b82f6';
                  }}
                >
                  LinkedIn Profile
                </a>

                <button
                  onClick={() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#10b981',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    padding: '12px 24px',
                    border: '2px solid #10b981',
                    borderRadius: '25px',
                    transition: 'all 0.3s ease',
                    background: 'transparent',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#10b981';
                    e.currentTarget.style.color = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#10b981';
                  }}
                >
                  View Projects
                </button>
              </div>
            </div>
          </ElectricBorder>
        </motion.div>

        {/* Interactive Falling Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{ 
            marginTop: '60px',
            width: '100%',
            maxWidth: '800px',
            height: '300px'
          }}
        >
          <FallingText
            text="Welcome to my interactive portfolio! I create immersive games and VR experiences using Unity and cutting-edge technology."
            highlightWords={["interactive", "games", "VR", "Unity", "technology"]}
            highlightClass="highlighted"
            trigger="auto"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="1.3rem"
            mouseConstraintStiffness={0.9}
          />
        </motion.div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;