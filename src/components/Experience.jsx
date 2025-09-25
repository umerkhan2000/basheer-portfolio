import React from 'react'
import { motion } from 'framer-motion'
import { FaBuilding, FaCalendar, FaMapMarker } from 'react-icons/fa'
import ElectricBorder from './ElectricBorder'

export default function Experience() {
  const experiences = [
    {
      title: "Senior Game Developer",
      company: "Techversol",
      location: "Karachi, Pakistan",
      period: "Jun 2025 - Present",
      color: "blue",
      description: "Leading VR training simulations with hand tracking, gesture input, and interactive physics. Building digital twin platforms and optimizing projects for Unity 6 XR pipeline.",
      achievements: [
        "Leading VR training simulations with hand tracking",
        "Building digital twin platforms for real-world visualization", 
        "Optimizing projects for Unity 6 XR pipeline",
        "Mentoring team members on Unity XR best practices"
      ]
    },
    {
      title: "Game Developer", 
      company: "The Location Lab",
      location: "Karachi, Pakistan",
      period: "Jun 2023 - Sep 2025",
      color: "purple",
      description: "Developed VR simulation modules with real-time physics, AI-driven environments, and multiplayer systems for synchronized VR/AR experiences.",
      achievements: [
        "Developed VR simulation modules with real-time physics",
        "Built AR learning apps using AR Foundation",
        "Designed multiplayer systems (Photon Fusion/PUN2, Netcode)",
        "Optimized VR applications for Oculus Quest achieving 72-90 FPS"
      ]
    }
  ]

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Professional</span>{' '}
            <span className="text-game-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ElectricBorder color={exp.color} intensity="medium">
                <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-2">
                        <div className="flex items-center gap-2">
                          <FaBuilding className="text-sm" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMapMarker className="text-sm" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <FaCalendar className="text-sm" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-2 text-gray-300">
                          <span className={`text-${exp.color}-400 mt-1.5 text-xs`}>●</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
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