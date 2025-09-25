import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa'
import ElectricBorder from './ElectricBorder'

export default function About(){
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">About</span>{' '}
            <span className="text-game-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ElectricBorder color="blue" intensity="medium">
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    <strong className="text-white">Unity Game Developer</strong> with <strong className="text-blue-400">3.5+ years</strong> of hands-on experience specializing in VR (Oculus, Quest), AR (AR Foundation, Vuforia), simulation systems, and multiplayer mechanics.
                  </p>
                  <p>
                    Currently working as a <strong className="text-emerald-400">Senior Game Developer at Techversol</strong>, leading VR training simulations with hand tracking, gesture input, and interactive physics.
                  </p>
                  <p>
                    Proven track record of delivering immersive XR experiences, real-time simulations, and scalable multiplayer systems across mobile, PC, WebGL, and XR platforms.
                  </p>
                </div>

                <div className="mt-6 flex gap-4">
                  <ElectricBorder color="blue" intensity="high">
                    <a href="mailto:umer2084450@gmail.com" className="btn game-style">
                      <FaEnvelope />
                      Get In Touch
                    </a>
                  </ElectricBorder>
                  
                  <ElectricBorder color="purple" intensity="medium">
                    <a 
                      href="https://www.linkedin.com/in/basheer-muhammad-khan-781263217" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn ghost"
                    >
                      <FaLinkedin />
                      LinkedIn
                    </a>
                  </ElectricBorder>
                </div>
              </div>
            </ElectricBorder>
          </motion.div>

          {/* Personal Details & Education */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Personal Details */}
            <ElectricBorder color="purple" intensity="medium">
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <FaMapMarkerAlt className="text-purple-400 text-lg" />
                    <div>
                      <div className="text-sm text-gray-400">Location</div>
                      <div className="text-white">Karachi, Sindh, Pakistan</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <FaEnvelope className="text-purple-400 text-lg" />
                    <div>
                      <div className="text-sm text-gray-400">Email</div>
                      <a href="mailto:umer2084450@gmail.com" className="text-white hover:text-purple-400">
                        umer2084450@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <FaPhone className="text-purple-400 text-lg" />
                    <div>
                      <div className="text-sm text-gray-400">Phone</div>
                      <div className="text-white">03042876455</div>
                    </div>
                  </div>
                </div>
              </div>
            </ElectricBorder>

            {/* Education */}
            <ElectricBorder color="emerald" intensity="medium">
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FaGraduationCap className="text-emerald-400" />
                  Education
                </h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6 relative">
                    <div className="absolute -left-2 top-1 w-4 h-4 bg-emerald-400 rounded-full"></div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Bachelor's in Computer Science
                    </h4>
                    <p className="text-emerald-300 font-medium mb-1">
                      Dadabhouy Institute of Technology
                    </p>
                    <p className="text-sm text-gray-400">Oct 2018 - Jan 2022</p>
                  </div>
                  
                  <div className="border-l-4 border-emerald-400 pl-6 relative">
                    <div className="absolute -left-2 top-1 w-4 h-4 bg-emerald-400 rounded-full"></div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Associate's in Mechanical Engineering
                    </h4>
                    <p className="text-emerald-300 font-medium mb-1">
                      Saifee Eidhi Zahabi Institute of Technology
                    </p>
                    <p className="text-sm text-gray-400">Apr 2017 - Jun 2020</p>
                  </div>
                </div>
              </div>
            </ElectricBorder>
          </motion.div>
        </div>
      </div>
    </section>
  )
}