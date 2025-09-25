import React from 'react'
import { motion } from 'framer-motion'
import { FaUnity, FaCode, FaMobile, FaVrCardboard, FaCog } from 'react-icons/fa'
import { SiBlender, SiCsharp } from 'react-icons/si'
import ElectricBorder from './ElectricBorder'

export default function Skills() {
  const skillCategories = [
    {
      title: "Game Engines & Unity",
      icon: <FaUnity className="text-3xl" />,
      color: "blue",
      skills: ["Unity (2020-6.00)", "XR Interaction Toolkit", "Performance Optimization", "Unity Collaborate"]
    },
    {
      title: "VR/AR Development",
      icon: <FaVrCardboard className="text-3xl" />,
      color: "purple",
      skills: ["Oculus Quest/Quest 2/Rift", "AR Foundation", "Vuforia", "WebAR", "Hand Tracking"]
    },
    {
      title: "Programming",
      icon: <FaCode className="text-3xl" />,
      color: "green",
      skills: ["C# Programming", "Real-time Systems", "Physics Simulation", "AI-driven Training"]
    },
    {
      title: "Multiplayer & Networking",
      icon: <FaCog className="text-3xl" />,
      color: "orange",
      skills: ["PUN 2", "Photon Fusion", "Netcode for GameObjects", "Mirror"]
    },
    {
      title: "3D & Design",
      icon: <SiBlender className="text-3xl" />,
      color: "red",
      skills: ["Blender", "UI/UX for XR Applications", "Gameplay Systems & Architecture"]
    },
    {
      title: "Tools & Workflow",
      icon: <FaCog className="text-3xl" />,
      color: "emerald",
      skills: ["Git", "Jira", "Performance Optimization for VR/AR"]
    }
  ]

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-game-gradient">Technical</span>{' '}
            <span className="text-white">Arsenal</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for creating immersive digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ElectricBorder color={category.color} intensity="medium" className="h-full">
                <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`text-${category.color}-400`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        className="flex items-center gap-2 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className={`text-${category.color}-400 text-xs`}>●</span>
                        <span className="text-sm">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ElectricBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}