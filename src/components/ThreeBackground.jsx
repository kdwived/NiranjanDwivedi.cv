import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Download } from 'lucide-react';

const ThreeBackground = () => {
  // Hero section state
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullName = 'Niranjan Dwivedi';

  // Three.js refs
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < fullName.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullName[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullName]);

  // Three.js setup
  useEffect(() => {
    if (!mountRef.current) return;

    let scene, camera, renderer, particles, shapes = [];

    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Clear any existing canvas
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    
    mountRef.current.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create particle field
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      // Softer colors with blue/purple theme
      colors[i * 3] = Math.random() * 0.3 + 0.4; // R
      colors[i * 3 + 1] = Math.random() * 0.2 + 0.3; // G
      colors[i * 3 + 2] = Math.random() * 0.5 + 0.5; // B
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.4
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create floating geometric shapes
    const shapeCount = 10;

    for (let i = 0; i < shapeCount; i++) {
      let geometry;
      const shapeType = Math.floor(Math.random() * 3);
      
      if (shapeType === 0) {
        geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      } else if (shapeType === 1) {
        geometry = new THREE.SphereGeometry(0.4, 12, 12);
      } else {
        geometry = new THREE.TorusGeometry(0.4, 0.15, 6, 12);
      }

      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.2 + 0.65, 0.6, 0.5),
        transparent: true,
        opacity: 0.15,
        wireframe: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
      mesh.scale.setScalar(Math.random() * 0.3 + 0.4);
      
      scene.add(mesh);
      shapes.push({
        mesh,
        rotationSpeed: {
          x: Math.random() * 0.015,
          y: Math.random() * 0.015,
          z: Math.random() * 0.015
        },
        floatOffset: Math.random() * Math.PI * 2
      });
    }

    // Position camera
    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate particles
      if (particles) {
        particles.rotation.x = time * 0.03;
        particles.rotation.y = time * 0.05;
      }

      // Animate floating shapes
      shapes.forEach((shape, index) => {
        if (shape.mesh) {
          shape.mesh.rotation.x += shape.rotationSpeed.x;
          shape.mesh.rotation.y += shape.rotationSpeed.y;
          shape.mesh.rotation.z += shape.rotationSpeed.z;
          
          shape.mesh.position.y += Math.sin(time * 0.3 + shape.floatOffset) * 0.008;
        }
      });

      // Camera movement
      camera.position.x = Math.sin(time * 0.05) * 1;
      camera.position.y = Math.cos(time * 0.04) * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      // Dispose of geometries and materials
      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
        
        // Clear the scene
        while(scene.children.length > 0){ 
          scene.remove(scene.children[0]); 
        }
      }
      
      if (renderer) {
        renderer.dispose();
        if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }

      // Clear refs
      sceneRef.current = null;
      rendererRef.current = null;
    };
  }, []); // Empty dependency array

  const contactLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/Utkarsh042', 
      label: 'GitHub',
      color: 'hover:text-gray-400'
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/utkarsh-singh-4bb919311/', 
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    { 
      icon: Mail, 
      href: 'mailto:Dwivedin418@gmail.com', 
      label: 'Email',
      color: 'hover:text-red-400'
    },
    { 
      icon: Phone, 
      href: 'tel:+919693675082', 
      label: 'Phone',
      color: 'hover:text-green-400'
    },
  ];

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Three.js Background */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Enhanced gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/40 to-cyan-900/50 z-5"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-start justify-center pt-12 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Content background for better readability */}
          <div className="relative bg-black/30 backdrop-blur-[2px] rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative inline-block mb-6"
              >
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                        ND
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 border-2 border-dashed border-cyan-400/30 rounded-full"
                ></motion.div>
              </motion.div>

              <div className="space-y-3">
                <motion.h1 
                  className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    {currentText}
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-cyan-300 drop-shadow-2xl"
                    >
                      |
                    </motion.span>
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-lg md:text-xl text-gray-100 font-semibold drop-shadow-lg"
                >
                  Digital Marketer & AI Automation Specialist
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="text-sm text-gray-200 max-w-xl mx-auto leading-relaxed font-medium drop-shadow-lg"
                >
                  Creating growth. Automating success.
Smart marketing that works — even while you sleep.
Making brands faster, smarter, and unstoppable.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex flex-wrap justify-center gap-3 mt-6"
              >
                {contactLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-900/70 backdrop-blur-[1px] border border-gray-600/50 text-gray-100 ${link.color} transition-all duration-300 hover:bg-gray-800/80 hover:border-cyan-400/70 text-sm shadow-lg`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon size={16} />
                    <span className="hidden sm:block">{link.label}</span>
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="pt-6"
              >
                <motion.button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/documents/Resume.pdf';
                    link.download = 'Niranjan_Dwivedi_Resume_2025.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 text-sm border border-white/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <Download size={16} />
                    <span>Download Resume</span>
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-5 h-8 border-2 border-cyan-300 rounded-full flex justify-center shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-1 h-2 bg-cyan-300 rounded-full mt-1 shadow-sm"
                  ></motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeBackground;