import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaDownload, FaPlay, FaGamepad, FaVrCardboard, FaCode } from 'react-icons/fa'
import ElectricBorder from './ElectricBorder'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const titles = [
    'Unity Game Developer',
    'VR/AR Specialist', 
    'Simulation Expert',
    'Technical Designer'
  ]

  useEffect(() => {
    const title = titles[currentIndex]
    let charIndex = 0
    const typingSpeed = 100
    const erasingSpeed = 50
    const delayBetweenTitles = 2000

    const typeWriter = () => {
      if (charIndex < title.length) {
        setDisplayText(title.substring(0, charIndex + 1))
        charIndex++
        setTimeout(typeWriter, typingSpeed)
      } else {
        setTimeout(eraseText, delayBetweenTitles)
      }
    }

    const eraseText = () => {
      if (charIndex > 0) {
        setDisplayText(title.substring(0, charIndex - 1))
        charIndex--
        setTimeout(eraseText, erasingSpeed)
      } else {
        setCurrentIndex((prev) => (prev + 1) % titles.length)
      }
    }

    typeWriter()
  }, [currentIndex])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="space-y-4">
            <motion.span 
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              🎮 Welcome to my digital realm
            </motion.span>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <motion.div 
                className="text-white block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Hi, I'm
              </motion.div>
              <motion.div 
                className="text-game-gradient block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Basheer
              </motion.div>
            </h1>

            <div className="text-2xl lg:text-3xl font-semibold text-gray-300 h-12 flex items-center">
              <span>I'm a </span>
              <span className="text-blue-400 ml-2 border-r-2 border-blue-400 animate-pulse min-w-[300px] text-left">
                {displayText}
              </span>
            </div>
          </motion.div>

          <motion.p 
            className="text-lg text-gray-400 leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            Unity Game Developer with 3.5+ years of experience specializing in VR/AR, 
            simulation systems, and multiplayer mechanics. Bringing imagination to life, 
            one line of code at a time.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <ElectricBorder color="blue" intensity="high">
              <button className="btn game-style">
                <FaDownload />
                Download CV
              </button>
            </ElectricBorder>

            <ElectricBorder color="purple" intensity="medium">
              <a 
                href="https://www.linkedin.com/in/basheer-muhammad-khan-781263217" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn ghost"
              >
                <FaPlay />
                LinkedIn Profile
              </a>
            </ElectricBorder>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex gap-8 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">3.5+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">25+</div>
              <div className="text-sm text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">10+</div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual Content */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative w-full max-w-lg mx-auto">
            <ElectricBorder color="blue" intensity="high" className="float">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 aspect-square flex items-center justify-center">
                <motion.div 
                  className="text-center"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaGamepad className="text-8xl text-blue-400 mb-4" />
                  <div className="text-2xl font-bold text-white mb-2">Game Dev</div>
                  <div className="text-sm text-gray-400">Unity • VR/AR • Simulation</div>
                </motion.div>

                {/* Floating Icons */}
                <motion.div 
                  className="absolute top-4 right-4"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaVrCardboard className="text-2xl text-purple-400" />
                </motion.div>

                <motion.div 
                  className="absolute bottom-4 left-4"
                  animate={{ 
                    y: [0, -8, 0],
                    x: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <FaCode className="text-2xl text-emerald-400" />
                </motion.div>
              </div>
            </ElectricBorder>
          </div>
        </motion.div>
      </div>
    </section>
  )
}