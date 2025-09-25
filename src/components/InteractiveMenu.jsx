import React, { useState, useEffect } from 'react'
import ElectricBorder from './ElectricBorder'

const InteractiveMenu = ({ onGameModeToggle, isGameMode }) => {
  const [activeSection, setActiveSection] = useState('about');

  const menuItems = [
    { id: 'game', label: 'Game', icon: '🚗', color: '#ff6b35' },
    { id: 'about', label: 'About', icon: '👨‍💻', color: '#8b5cf6' },
    { id: 'about', label: 'Profile', icon: '🎯', color: '#e91e63' },
    { id: 'projects', label: 'Projects', icon: '🎮', color: '#10b981' },
    { id: 'contact', label: 'Contact', icon: '📧', color: '#ef4444' }
  ];

  // Update active section based on scroll position
  useEffect(() => {
    if (isGameMode) return; // Don't update active section in game mode

    const updateActiveSection = () => {
      const sections = ['about', 'projects', 'contact'];
      const scrollY = window.scrollY + 200; // Offset for early activation
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollY >= section.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial check

    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [isGameMode]);

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId);
    console.log('Navigating to section:', sectionId);
    
    // Handle game mode toggle
    if (sectionId === 'game') {
      onGameModeToggle(true);
      return;
    }
    
    // Exit game mode and navigate to regular sections
    if (isGameMode) {
      onGameModeToggle(false);
    }
    
    // Smooth scroll to section
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn('Section not found:', sectionId);
      }
    }, isGameMode ? 300 : 0); // Delay if exiting game mode
  };

  return (
    <nav style={{
      position: 'fixed',
      top: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      padding: '10px'
    }}>
      <ElectricBorder
        color="#7df9ff"
        speed={0.8}
        chaos={0.3}
        thickness={2}
        style={{ borderRadius: '50px' }}
      >
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '50px',
          padding: '15px 25px',
          display: 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          {menuItems.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleMenuClick(item.id)}
              style={{
                background: activeSection === item.id ? item.color : 'transparent',
                border: activeSection === item.id ? 'none' : `1px solid ${item.color}40`,
                color: activeSection === item.id ? '#000' : item.color,
                padding: '12px 18px',
                borderRadius: '30px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.background = `${item.color}20`;
                  e.currentTarget.style.borderColor = item.color;
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = `${item.color}40`;
                }
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </ElectricBorder>
    </nav>
  );
};

export default InteractiveMenu;