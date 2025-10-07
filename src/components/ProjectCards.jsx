import React from 'react'
import ElectricBorder from './ElectricBorder'

const ProjectCards = () => {
  const projects = [
    {
      id: 1,
      title: "Advanced Unity 3D Game Development",
      description: "Enterprise-level 3D game development featuring advanced Unity systems, custom C# frameworks, and optimized asset pipelines. Delivered scalable game architecture with cross-platform deployment capabilities.",
      image: "/api/placeholder/400/250",
      tech: ["Unity 2022 LTS", "C# Advanced", "Custom Frameworks", "Performance Optimization"],
      color: "#3b82f6",
      linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7133056342126116864",
      videoUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7133056342126116864",
      category: "Game Development"
    },
    {
      id: 2,
      title: "Immersive VR/AR Solutions",
      description: "Cutting-edge virtual and augmented reality applications with advanced hand tracking, spatial computing, and cross-platform VR/AR deployment. Specialized in enterprise VR training solutions.",
      image: "/api/placeholder/400/250",
      tech: ["Unity XR Toolkit", "Oculus SDK", "ARCore/ARKit", "Spatial Computing"],
      color: "#8b5cf6",
      linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7239559299268526080/",
      videoUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7239559299268526080/",
      category: "VR/AR Development"
    },
    {
      id: 3,
      title: "Cross-Platform Mobile Game Portfolio",
      description: "High-performance mobile games optimized for iOS and Android with millions of downloads. Features advanced monetization systems, cloud saves, and real-time multiplayer capabilities.",
      image: "/api/placeholder/400/250",
      tech: ["Unity Mobile", "Platform SDKs", "Monetization", "Cloud Integration"],
      color: "#10b981",
      linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7280887463592538114/",
      videoUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7280887463592538114/",
      category: "Mobile Development"
    },
    {
      id: 4,
      title: "Techversol GameView Platform",
      description: "Comprehensive game development showcase platform featuring interactive portfolios, advanced analytics, community features, and developer tools. Full-stack web development with game integration.",
      image: "/api/placeholder/400/250",
      tech: ["Full-Stack Development", "Game Integration", "Analytics Dashboard", "Community Platform"],
      color: "#f59e0b",
      linkedinUrl: "https://gameview.beta.techversol.com/",
      projectUrl: "https://gameview.beta.techversol.com/",
      category: "Web Development"
    },
    {
      id: 5,
      title: "Professional Casino Roulette Game",
      description: "Realistic casino-grade roulette game with advanced physics simulation, smooth animations, and authentic gambling mechanics. Features real-time betting systems and professional UI/UX design.",
      image: "/api/placeholder/400/250",
      tech: ["Unity Physics", "Casino Mechanics", "Real-time Systems", "Professional UI"],
      color: "#ef4444",
      videoUrl: "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yxfao4rwclsuzxhxlt2y",
      category: "Casino Gaming"
    },
    {
      id: 6,
      title: "Photorealistic Rendering Pipeline",
      description: "Advanced 3D rendering pipeline combining Blender's modeling capabilities with Unity's HDRP for photorealistic visualization. Specialized in architectural visualization and product rendering.",
      image: "/api/placeholder/400/250",
      tech: ["Blender Professional", "Unity HDRP", "Photorealistic Rendering", "Visualization"],
      color: "#06b6d4",
      videoUrl: "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/mdmgxvbmccxqma0fa5uk",
      category: "3D Visualization"
    },
    {
      id: 7,
      title: "Enterprise VR Spatial World",
      description: "Large-scale VR environment designed for enterprise training and simulation. Features realistic physics, interactive object systems, seamless navigation, and multi-user collaboration capabilities.",
      image: "/api/placeholder/400/250",
      tech: ["Unity XR", "Enterprise VR", "Multi-user Systems", "Training Simulation"],
      color: "#8b5cf6",
      videoUrl: import.meta.env.BASE_URL + "videos/Spatialworld.mp4",
      category: "Enterprise VR"
    }
  ];

  return (
    <section id="projects" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      width: '100%',
      padding: '80px 20px',
      minHeight: '100vh'
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
        gap: '40px',
        maxWidth: '1200px',
        width: '100%',
        justifyItems: 'center'
      }}>
        {projects.map((project) => (
          <ElectricBorder
            key={project.id}
            color={project.color}
            speed={0.5}
            chaos={0.2}
            style={{
              maxWidth: '420px',
              width: '100%',
              minHeight: '500px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            className="project-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.8)', 
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              overflow: 'hidden',
              height: '100%'
            }}>
              {/* Project Video/Image */}
              <div style={{ 
                height: '200px', 
                background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {project.videoUrl && (project.videoUrl.includes('cloudinary') || project.videoUrl.startsWith('/videos/')) ? (
                  <>
                    <video
                      src={project.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '0'
                      }}
                      onError={(e) => {
                        // Fallback to icon if video fails to load
                        e.target.style.display = 'none';
                        e.target.parentNode.querySelector('.fallback-icon').style.display = 'flex';
                      }}
                    />
                    {/* Video overlay indicator */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(0, 0, 0, 0.7)',
                      borderRadius: '15px',
                      padding: '4px 8px',
                      fontSize: '0.75rem',
                      color: 'white',
                      zIndex: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      🎥 Live
                    </div>
                  </>
                ) : null}
                
                {/* Update fallback icon display logic */}
                <div 
                  className="fallback-icon"
                  style={{
                    position: (project.videoUrl && (project.videoUrl.includes('cloudinary') || project.videoUrl.startsWith('/videos/'))) ? 'absolute' : 'static',
                    top: '50%',
                    left: '50%',
                    transform: (project.videoUrl && (project.videoUrl.includes('cloudinary') || project.videoUrl.startsWith('/videos/'))) ? 'translate(-50%, -50%)' : 'none',
                    fontSize: '3rem',
                    zIndex: 1,
                    display: (project.videoUrl && (project.videoUrl.includes('cloudinary') || project.videoUrl.startsWith('/videos/'))) ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  {project.id === 1 ? '🎮' : 
                   project.id === 2 ? '🥽' : 
                   project.id === 3 ? '📱' : 
                   project.id === 4 ? '💻' : 
                   project.id === 5 ? '🎰' : 
                   project.id === 6 ? '🎨' : 
                   project.id === 7 ? '🌌' : '🎮'}
                </div>
              </div>
              
              {/* Content */}
              <div style={{ padding: '30px' }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: '15px',
                  color: project.color
                }}>
                  {project.title}
                </h3>
                
                <p style={{ 
                  color: '#e5e7eb', 
                  lineHeight: '1.6', 
                  marginBottom: '20px',
                  fontSize: '1rem'
                }}>
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '10px', 
                  marginBottom: '20px' 
                }}>
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      style={{
                        background: `${project.color}20`,
                        color: project.color,
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        border: `1px solid ${project.color}40`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action Links */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  {/* Main Project/LinkedIn/Video Link */}
                  <a 
                    href={project.projectUrl || project.linkedinUrl || project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: project.color,
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: '500',
                      padding: '12px 20px',
                      border: `2px solid ${project.color}`,
                      borderRadius: '25px',
                      transition: 'all 0.3s ease',
                      background: 'transparent',
                      flex: 1,
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = project.color;
                      e.currentTarget.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = project.color;
                    }}
                  >
                    {project.projectUrl 
                      ? '🌐 View Project' 
                      : project.linkedinUrl 
                        ? '💼 LinkedIn' 
                        : '🎥 Watch Video'}
                  </a>

                  {/* Secondary Video Link (if different from main link) */}
                  {project.videoUrl && 
                   project.videoUrl !== (project.projectUrl || project.linkedinUrl) && 
                   (project.projectUrl || project.linkedinUrl) && (
                    <a 
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#fff',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        padding: '10px 16px',
                        background: `${project.color}40`,
                        borderRadius: '20px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = project.color;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${project.color}40`;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      🎥 Video
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ElectricBorder>
        ))}
      </div>
    </section>
  );
};

export default ProjectCards;