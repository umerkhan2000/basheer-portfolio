import React from 'react'
import { motion } from 'framer-motion'
import { FaGamepad, FaVrCardboard, FaMobile, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import ElectricBorder from './ElectricBorder'

export default function Projects() {
  const projects = [
    {
      title: "VR Training Simulator",
      description: "Immersive VR training simulation with hand tracking and gesture input for enterprise clients. Built with Unity 6 and Oculus SDK.",
      technologies: ["Unity 6", "Oculus SDK", "Hand Tracking", "C#", "XR Interaction Toolkit"],
      category: "VR Development",
      icon: <FaVrCardboard />,
      color: "blue",
      image: "🥽"
    },
    {
      title: "AR Learning Application",
      description: "Educational AR app using AR Foundation for interactive learning experiences. Features object recognition and 3D model visualization.",
      technologies: ["Unity", "AR Foundation", "ARCore", "ARKit", "3D Modeling"],
      category: "AR Development", 
      icon: <FaMobile />,
      color: "purple",
      image: "📱"
    },
    {
      title: "Multiplayer Game System",
      description: "Real-time multiplayer game with synchronized VR/AR experiences using Photon networking solutions.",
      technologies: ["Unity", "Photon PUN2", "Photon Fusion", "Netcode", "Multiplayer"],
      category: "Game Development",
      icon: <FaGamepad />,
      color: "emerald",
      image: "🎮"
    },
    {
      title: "Digital Twin Platform",
      description: "Real-world visualization and simulation platform for industrial applications with interactive physics.",
      technologies: ["Unity", "Digital Twin", "Physics Simulation", "Real-time Systems"],
      category: "Simulation",
      icon: <FaGamepad />,
      color: "orange",
      image: "🏭"
    }
  ]

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Featured</span>{' '}
            <span className="text-game-gradient">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcasing innovative solutions in VR/AR, gaming, and interactive experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <ElectricBorder color={project.color} intensity="medium" className="h-full">
                <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl h-full flex flex-col">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{project.image}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        <span className={`px-3 py-1 bg-${project.color}-500/20 border border-${project.color}-500/30 rounded-full text-xs text-${project.color}-300`}>
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-800">
                    <motion.button
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaExternalLinkAlt size={12} />
                      View Demo
                    </motion.button>
                    <motion.button
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaGithub size={12} />
                      Source Code
                    </motion.button>
                  </div>
                </div>
              </ElectricBorder>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6">
            Want to see more of my work or discuss a project?
          </p>
          <ElectricBorder color="blue" intensity="high">
            <a 
              href="https://www.linkedin.com/in/basheer-muhammad-khan-781263217"
              target="_blank"
              rel="noopener noreferrer"
              className="btn game-style"
            >
              View Full Portfolio
            </a>
          </ElectricBorder>
        </motion.div>
      </div>
    </section>
  )
}