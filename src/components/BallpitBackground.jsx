import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const BallpitBackground = ({ 
  ballCount = 50,
  colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'],
}) => {
  const balls = useMemo(() => {
    return Array.from({ length: ballCount }, (_, i) => ({
      id: i,
      size: Math.random() * 40 + 20, // 20-60px
      x: Math.random() * 100, // 0-100%
      y: Math.random() * 100, // 0-100%
      color: colors[Math.floor(Math.random() * colors.length)],
      animationDelay: Math.random() * 10, // 0-10s
      animationDuration: Math.random() * 5 + 3, // 3-8s
    }))
  }, [ballCount, colors])

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      overflow: 'hidden', 
      pointerEvents: 'none', 
      zIndex: -1 
    }}>
      {balls.map((ball) => (
        <motion.div
          key={ball.id}
          style={{
            position: 'absolute',
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            backgroundColor: ball.color,
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            borderRadius: '50%',
            filter: 'blur(2px)',
            opacity: 0.4,
          }}
          animate={{
            y: ['-20px', '20px', '-20px'],
            x: ['-10px', '10px', '-10px'],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: ball.animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ball.animationDelay,
          }}
        />
      ))}
      
      {/* Additional floating particles for depth */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            borderRadius: '50%',
            opacity: 0.2,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

export default BallpitBackground