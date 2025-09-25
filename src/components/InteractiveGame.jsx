import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const InteractiveGame = ({ onPortfolioItemCollected, onSectionReached }) => {
  const gameLoopRef = useRef();
  const [gameState, setGameState] = useState({
    car: { 
      x: 10, 
      y: 50, 
      rotation: 0,
      speed: 0,
      maxSpeed: 3
    },
    gameStarted: false,
    collectedItems: [],
    keys: {},
    currentDestination: null
  });

  // Portfolio destinations on the map
  const destinations = {
    home: { x: 10, y: 50, name: "Home Base", icon: "🏠", section: "home" },
    skills: { x: 25, y: 25, name: "Skills Lab", icon: "⚡", section: "about" },
    projects: { x: 75, y: 35, name: "Project Gallery", icon: "🎮", section: "projects" },
    experience: { x: 45, y: 75, name: "Experience Hub", icon: "⭐", section: "about" },
    contact: { x: 85, y: 70, name: "Contact Center", icon: "📧", section: "contact" }
  };

  // Collectible items scattered around the map
  const collectibles = [
    { id: 1, x: 20, y: 40, name: "Unity Mastery", icon: "⚡", color: "#ff6b6b", collected: false },
    { id: 2, x: 35, y: 30, name: "C# Skills", icon: "💻", color: "#4ecdc4", collected: false },
    { id: 3, x: 60, y: 25, name: "VR Experience", icon: "🥽", color: "#45b7d1", collected: false },
    { id: 4, x: 70, y: 50, name: "Mobile Games", icon: "📱", color: "#96ceb4", collected: false },
    { id: 5, x: 50, y: 60, name: "Team Leadership", icon: "👥", color: "#ffeaa7", collected: false },
    { id: 6, x: 80, y: 55, name: "AR Projects", icon: "🛍️", color: "#fd79a8", collected: false }
  ];

  const [items, setItems] = useState(collectibles);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      setGameState(prev => ({
        ...prev,
        keys: { ...prev.keys, [e.key.toLowerCase()]: true }
      }));
    };

    const handleKeyUp = (e) => {
      setGameState(prev => ({
        ...prev,
        keys: { ...prev.keys, [e.key.toLowerCase()]: false }
      }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop for car movement
  useEffect(() => {
    if (!gameState.gameStarted) return;

    const gameLoop = () => {
      setGameState(prev => {
        const newState = { ...prev };
        
        // Car controls
        if (prev.keys['w'] || prev.keys['arrowup']) {
          newState.car.speed = Math.min(prev.car.speed + 0.2, prev.car.maxSpeed);
        } else if (prev.keys['s'] || prev.keys['arrowdown']) {
          newState.car.speed = Math.max(prev.car.speed - 0.2, -prev.car.maxSpeed / 2);
        } else {
          newState.car.speed *= 0.95; // Friction
        }

        // Steering
        if (prev.keys['a'] || prev.keys['arrowleft']) {
          newState.car.rotation -= 3;
        }
        if (prev.keys['d'] || prev.keys['arrowright']) {
          newState.car.rotation += 3;
        }

        // Move car based on rotation and speed
        const radians = (newState.car.rotation * Math.PI) / 180;
        newState.car.x += Math.cos(radians) * newState.car.speed * 0.5;
        newState.car.y += Math.sin(radians) * newState.car.speed * 0.5;

        // Keep car within bounds
        newState.car.x = Math.max(0, Math.min(100, newState.car.x));
        newState.car.y = Math.max(0, Math.min(100, newState.car.y));

        return newState;
      });

      // Check for item collection
      checkCollisions();

      // Check destination arrivals
      checkDestinations();

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.gameStarted, gameState.keys]);

  // Check collisions with collectible items
  const checkCollisions = () => {
    const carX = gameState.car.x;
    const carY = gameState.car.y;
    
    setItems(prevItems => {
      return prevItems.map(item => {
        if (!item.collected) {
          const distance = Math.sqrt(
            Math.pow(carX - item.x, 2) + Math.pow(carY - item.y, 2)
          );
          
          if (distance < 5) { // Collection radius
            // Collect the item
            setGameState(prev => ({
              ...prev,
              collectedItems: [...prev.collectedItems, item]
            }));
            
            // Notify parent
            if (onPortfolioItemCollected) {
              onPortfolioItemCollected({
                ...item,
                description: `Collected: ${item.name}`,
                type: 'driving-item'
              });
            }
            
            return { ...item, collected: true };
          }
        }
        return item;
      });
    });
  };

  // Check if car reached any destinations
  const checkDestinations = () => {
    const carX = gameState.car.x;
    const carY = gameState.car.y;
    
    Object.entries(destinations).forEach(([key, dest]) => {
      const distance = Math.sqrt(
        Math.pow(carX - dest.x, 2) + Math.pow(carY - dest.y, 2)
      );
      
      if (distance < 8 && gameState.currentDestination !== key) {
        setGameState(prev => ({
          ...prev,
          currentDestination: key
        }));
        
        // Auto navigate to portfolio section
        if (onSectionReached && dest.section) {
          onSectionReached(dest.section);
          setTimeout(() => {
            const element = document.getElementById(dest.section);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 500);
        }
      }
    });
  };

  const startGame = () => {
    setGameState(prev => ({ ...prev, gameStarted: true }));
  };

  const resetGame = () => {
    setGameState({
      car: { x: 10, y: 50, rotation: 0, speed: 0, maxSpeed: 3 },
      gameStarted: false,
      collectedItems: [],
      keys: {},
      currentDestination: null
    });
    setItems(collectibles.map(item => ({ ...item, collected: false })));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
      zIndex: gameState.gameStarted ? 100 : -1,
      pointerEvents: gameState.gameStarted ? 'auto' : 'none',
      transition: 'all 0.5s ease'
    }}>
      {/* Game Map */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, #1e3a8a 0%, #0f172a 100%)',
        overflow: 'hidden'
      }}>
        
        {/* Road Network */}
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <pattern id="roadPattern" patternUnits="userSpaceOnUse" width="20" height="10">
              <rect width="20" height="10" fill="#374151"/>
              <rect x="8" y="4" width="4" height="2" fill="#fbbf24"/>
            </pattern>
          </defs>
          
          {/* Road connections */}
          <path
            d={`M ${10 * window.innerWidth / 100} ${50 * window.innerHeight / 100} 
                Q ${20 * window.innerWidth / 100} ${30 * window.innerHeight / 100}
                  ${25 * window.innerWidth / 100} ${25 * window.innerHeight / 100}`}
            stroke="#374151"
            strokeWidth="40"
            fill="none"
          />
          <path
            d={`M ${25 * window.innerWidth / 100} ${25 * window.innerHeight / 100}
                Q ${50 * window.innerWidth / 100} ${20 * window.innerHeight / 100}
                  ${75 * window.innerWidth / 100} ${35 * window.innerHeight / 100}`}
            stroke="#374151"
            strokeWidth="40"
            fill="none"
          />
          <path
            d={`M ${10 * window.innerWidth / 100} ${50 * window.innerHeight / 100}
                Q ${30 * window.innerWidth / 100} ${65 * window.innerHeight / 100}
                  ${45 * window.innerWidth / 100} ${75 * window.innerHeight / 100}`}
            stroke="#374151"
            strokeWidth="40"
            fill="none"
          />
          <path
            d={`M ${75 * window.innerWidth / 100} ${35 * window.innerHeight / 100}
                Q ${80 * window.innerWidth / 100} ${50 * window.innerHeight / 100}
                  ${85 * window.innerWidth / 100} ${70 * window.innerHeight / 100}`}
            stroke="#374151"
            strokeWidth="40"
            fill="none"
          />
        </svg>

        {/* Destinations */}
        {Object.entries(destinations).map(([key, dest]) => (
          <motion.div
            key={key}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              left: `${dest.x}%`,
              top: `${dest.y}%`,
              transform: 'translate(-50%, -50%)',
              width: '60px',
              height: '60px',
              background: gameState.currentDestination === key 
                ? 'linear-gradient(135deg, #00ff88, #00ccff)' 
                : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              border: '3px solid #fff',
              boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)'
            }}
          >
            {dest.icon}
            <div style={{
              position: 'absolute',
              top: '70px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '4px 8px',
              borderRadius: '10px',
              whiteSpace: 'nowrap'
            }}>
              {dest.name}
            </div>
          </motion.div>
        ))}

        {/* Collectible Items */}
        {items.map(item => (
          !item.collected && (
            <motion.div
              key={item.id}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '30px',
                height: '30px',
                background: item.color,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                border: '2px solid #fff',
                boxShadow: `0 0 15px ${item.color}`,
                cursor: 'pointer'
              }}
              title={item.name}
            >
              {item.icon}
            </motion.div>
          )
        ))}

        {/* Player Car */}
        <motion.div
          style={{
            position: 'absolute',
            left: `${gameState.car.x}%`,
            top: `${gameState.car.y}%`,
            transform: `translate(-50%, -50%) rotate(${gameState.car.rotation}deg)`,
            width: '40px',
            height: '20px',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            borderRadius: '8px 16px 16px 8px',
            border: '2px solid #fff',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
            transition: 'transform 0.1s ease'
          }}
        >
          {/* Car windows */}
          <div style={{
            position: 'absolute',
            top: '2px',
            left: '8px',
            right: '2px',
            height: '8px',
            background: '#1e40af',
            borderRadius: '4px'
          }} />
          {/* Exhaust effect when moving */}
          {Math.abs(gameState.car.speed) > 0.5 && (
            <div style={{
              position: 'absolute',
              right: '40px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '2px',
              animation: 'exhaust 0.3s infinite'
            }} />
          )}
        </motion.div>
      </div>

      {/* Game UI */}
      {!gameState.gameStarted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.9)',
            padding: '2rem',
            borderRadius: '20px',
            border: '2px solid #00ff88',
            textAlign: 'center',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h2 style={{ color: '#00ff88', marginBottom: '1rem', fontSize: '2rem' }}>
            � Portfolio Road Trip
          </h2>
          <p style={{ color: '#fff', marginBottom: '1.5rem', opacity: 0.8 }}>
            Drive around and collect portfolio items!<br/>
            Visit destinations to explore different sections.
          </p>
          <div style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1.5rem', opacity: 0.7 }}>
            <div>🎮 WASD or Arrow Keys to drive</div>
            <div>🎯 Drive over glowing items to collect them</div>
            <div>📍 Visit destinations to explore portfolio sections</div>
          </div>
          <button
            onClick={startGame}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #00ff88, #00ccff)',
              color: '#000',
              border: 'none',
              borderRadius: '25px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            🚀 Start Driving!
          </button>
        </motion.div>
      ) : (
        <>
          {/* Speed and Progress Display */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '1rem',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#fff'
          }}>
            <div>🚗 Speed: {Math.abs(gameState.car.speed * 10).toFixed(0)} mph</div>
            <div>📦 Items: {gameState.collectedItems.length}/{collectibles.length}</div>
            {gameState.currentDestination && (
              <div style={{ color: '#00ff88' }}>
                📍 At: {destinations[gameState.currentDestination]?.name}
              </div>
            )}
          </div>

          {/* Reset Button */}
          <button
            onClick={resetGame}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '10px 20px',
              background: 'rgba(239, 68, 68, 0.8)',
              color: '#fff',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer'
            }}
          >
            🔄 Reset
          </button>

          {/* Collected Items Display */}
          {gameState.collectedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(0, 0, 0, 0.8)',
                padding: '1rem',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                maxWidth: '250px'
              }}
            >
              <h4 style={{ color: '#00ff88', marginBottom: '0.5rem' }}>
                🏆 Collected Items
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {gameState.collectedItems.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      background: item.color,
                      color: '#fff',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    {item.icon} {item.name}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes exhaust {
          0% { opacity: 0.8; transform: translateY(-50%) scale(1); }
          100% { opacity: 0; transform: translateY(-50%) scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default InteractiveGame;