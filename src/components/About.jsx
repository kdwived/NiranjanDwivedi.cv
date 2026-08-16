import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Globe, Zap } from 'lucide-react';

// Add custom animations
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes spin-very-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes scan {
    0% { transform: translateY(0); }
    100% { transform: translateY(288px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 2.5s ease-in-out infinite 0.5s;
  }
  
  .animate-float-slow {
    animation: float-slow 4s ease-in-out infinite;
  }
  
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
  
  .animate-spin-very-slow {
    animation: spin-very-slow 20s linear infinite;
  }
  
  .animate-scan {
    animation: scan 2s ease-in-out infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined' && !document.getElementById('about-custom-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'about-custom-styles';
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Proficient in both frontend and backend technologies',
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'Experience with MongoDB, SQL Server, and data modeling',
    },
    {
      icon: Globe,
      title: 'Modern Web Technologies',
      description: 'React.js, Node.js, and cutting-edge frameworks',
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Focus on creating fast, efficient web applications',
    },
  ];

  return (
    <section id="about" className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mb-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-1">
                <div className="bg-gray-800/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Career Objective</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    A dynamic and results-driven professional with expertise in digital marketing,
                     automation, and web technologies.
                      Passionate about building smart systems that connect creativity with data — turning marketing strategies into self-running growth engines.
                       Seeking to leverage AI tools, analytics, and full-stack skills to develop impactful digital ecosystems and business automation solutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/30">
                <div className="text-2xl font-bold text-cyan-400 mb-1">10+</div>
                <div className="text-gray-400 text-xs">Projects Completed</div>
              </div>
              <div className="text-center p-3 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/30">
                <div className="text-2xl font-bold text-purple-400 mb-1">5+</div>
                <div className="text-gray-400 text-xs">Years Experience</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="relative group">
              {/* Subtle glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-400/25 via-purple-500/25 to-pink-500/25 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700"></div>
              
              {/* Very subtle rotating border - much slower */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-500/30 opacity-50 group-hover:opacity-75 transition-opacity duration-700">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 animate-spin-slow opacity-30"></div>
              </div>
              
              {/* Only 2 floating particles - much more subtle */}
              <div className="absolute -inset-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-float-slow"></div>
                <div className="absolute bottom-12 left-6 w-1 h-1 bg-purple-400/60 rounded-full animate-float-delayed"></div>
              </div>
              
              {/* Image container */}
              <div className="relative w-56 h-72 mx-auto transform group-hover:scale-[1.03] transition-transform duration-500">
                {/* Border with subtle animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl p-[2px] group-hover:p-[3px] transition-all duration-300">
                  <div className="w-full h-full bg-gray-900 rounded-2xl overflow-hidden relative">
                    {/* Very subtle scanning line - only on hover */}
                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan"></div>
                    </div>
                    
                    {/* Image with effects */}
                    <div className="relative w-full h-full">
                      <img 
                        src="/images/Portfolio_image.jpg" 
                        alt="Professional Profile" 
                        className="w-full h-full object-cover object-center transition-all duration-500 group-hover:brightness-105"
                      />
                      
                      {/* Subtle overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-400/5 group-hover:via-purple-500/3 group-hover:to-pink-500/5 transition-all duration-700"></div>
                    </div>
                  </div>
                </div>
                
                {/* Smaller corner accents */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                {/* Only 2 orbiting dots - very subtle */}
                <div className="absolute inset-0 animate-spin-very-slow opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <div className="absolute -top-0.5 left-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute -bottom-0.5 left-1/2 w-1 h-1 bg-pink-400 rounded-full transform -translate-x-1/2"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                  <highlight.icon className="text-white" size={20} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-3">{highlight.title}</h3>
                <p className="text-gray-400 text-xs">{highlight.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;