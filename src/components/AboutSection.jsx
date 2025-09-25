import React from 'react'
import { motion } from 'framer-motion'
import ElectricBorder from './ElectricBorder'
import ProfileCard from './ProfileCard'

const AboutSection = () => {
  const skills = [
    { name: 'Unity 3D', level: 95, icon: '🎮' },
    { name: 'C# Programming', level: 90, icon: '💻' },
    { name: 'VR Development', level: 85, icon: '🥽' },
    { name: 'AR Development', level: 80, icon: '📱' },
    { name: '3D Modeling', level: 75, icon: '🎨' },
    { name: 'Game Design', level: 88, icon: '🎯' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const aboutContent = {
    journey: {
      title: "Professional Journey & Expertise",
      content: "As a Senior Unity Developer with 3.5+ years of industry experience, I've successfully delivered 20+ commercial projects ranging from mobile games to enterprise VR solutions. My expertise spans the entire game development lifecycle - from concept design and 3D modeling to optimization and deployment across multiple platforms.",
      highlights: [
        "🎯 20+ Successfully Delivered Commercial Projects",
        "🏆 Specialized in Unity 2022+ LTS & Advanced Features", 
        "📱 Cross-Platform Development (Mobile, PC, VR/AR)",
        "⚡ Performance Optimization Expert",
        "🔧 Custom Tools & Pipeline Development"
      ]
    },
    
    skills: {
      title: "Technical Expertise & Skills",
      content: "My comprehensive skill set covers modern game development technologies, advanced Unity features, and cutting-edge VR/AR implementation techniques.",
      skillCategories: [
        {
          category: "Game Development",
          skills: ["Unity 2022+ LTS", "C# Advanced Programming", "Game Architecture", "Performance Optimization", "Cross-Platform Deployment"]
        },
        {
          category: "VR/AR Development", 
          skills: ["Unity XR Toolkit", "Oculus Integration", "ARCore/ARKit", "Hand Tracking", "Spatial Computing"]
        },
        {
          category: "3D & Graphics",
          skills: ["Blender 3D Modeling", "HDRP/URP Pipelines", "Shader Programming", "Animation Systems", "Visual Effects"]
        },
        {
          category: "Technical Skills",
          skills: ["Git Version Control", "CI/CD Pipelines", "Performance Profiling", "Memory Management", "Platform SDKs"]
        }
      ]
    }
  };

  return (
    <section id="about" style={{
      minHeight: '100vh',
      padding: '80px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            About Me
          </h2>
          <div style={{ height: '4px', width: '100px', background: 'linear-gradient(135deg, #10b981, #3b82f6)', margin: '0 auto', borderRadius: '2px' }}></div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '40px',
          alignItems: 'start',
          justifyItems: 'center'
        }}>
          {/* My Journey - First Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ElectricBorder
              color="#3b82f6"
              speed={0.8}
              chaos={0.3}
              thickness={1.5}
              style={{ borderRadius: '20px' }}
            >
              <div style={{
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(30px)',
                borderRadius: '20px',
                padding: '50px 40px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%'
              }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: '#7df9ff',
                  marginBottom: '20px',
                  fontWeight: '600'
                }}>
                  My Journey
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: '#e5e7eb',
                  marginBottom: '20px'
                }}>
                  With over <strong style={{ color: '#10b981' }}>3.5 years</strong> of dedicated experience 
                  in Unity development, I've transformed from a curious beginner into a skilled game developer 
                  specializing in immersive VR and AR experiences.
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: '#e5e7eb',
                  marginBottom: '20px'
                }}>
                  My passion lies in creating interactive worlds that blur the line between reality and imagination. 
                  From developing educational VR simulations to crafting engaging AR applications, 
                  I bring creativity and technical expertise to every project.
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: '#e5e7eb'
                }}>
                  I believe in the power of games to educate, inspire, and connect people across the globe. 
                  Every line of code I write is aimed at creating memorable experiences that leave a lasting impact.
                </p>
              </div>
            </ElectricBorder>
          </motion.div>

          {/* Technical Skills - Second Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ElectricBorder
              color="#10b981"
              speed={1.2}
              chaos={0.5}
              thickness={1.8}
              style={{ borderRadius: '20px' }}
            >
              <div style={{
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(30px)',
                borderRadius: '20px',
                padding: '50px 40px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%'
              }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: '#7df9ff',
                  marginBottom: '30px',
                  fontWeight: '600',
                  textAlign: 'center'
                }}>
                  Technical Skills
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                      }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{skill.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '5px'
                        }}>
                          <span style={{ color: '#e5e7eb', fontWeight: '500' }}>
                            {skill.name}
                          </span>
                          <span style={{ color: '#10b981', fontSize: '0.9rem' }}>
                            {skill.level}%
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <motion.div
                            initial={{ width: '0%' }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            style={{
                              height: '100%',
                              background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                              borderRadius: '3px'
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ElectricBorder>
          </motion.div>

          {/* Profile Card - Third Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%'
            }}
          >
            <ProfileCard
              name="Basheer Muhammad Khan"
              title="Game Developer | Unity Specialist"
              handle="basheer_dev"
              status="Available for Projects"
              contactText="LinkedIn"
              avatarUrl="/profile.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => {
                window.open('https://www.linkedin.com/in/basheer-muhammad-khan-781263217/', '_blank');
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;