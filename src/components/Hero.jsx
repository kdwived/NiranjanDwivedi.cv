import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Download } from 'lucide-react';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullName = 'Niranjan Dwivedi';

  useEffect(() => {
    if (currentIndex < fullName.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullName[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullName]);

  const contactLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/kdwived', 
      label: 'GitHub',
      color: 'hover:text-gray-400'
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BsHRqiYdTTum9Elonlt5ehg%3D%3D', 
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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-purple-900/20 to-cyan-900/30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                <div className="w-28 h-28 rounded-full overflow-hidden">
                  <img
                    src="/images/Portfolio_photo.jpg"
                    alt="Niranjan Dwivedi"
                    className="w-full h-full object-cover"
                  />
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
              className="text-3xl md:text-5xl font-bold text-white mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {currentText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-cyan-400"
                >
                  |
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-lg md:text-xl text-gray-300 font-light"
            >
              Full-Stack Developer & MCA Student
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-sm text-gray-700 max-w-xl mx-auto leading-relaxed text-semibold"
            >
              Hey, I’m Niranjan Dwivedi — a marketer, creator, and tech enthusiast who believes in blending creativity with automation.
I don’t just work on marketing; I build systems that market, sell, and scale automatically using AI and data.
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
                className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-300 ${link.color} transition-all duration-300 hover:bg-gray-700/50 hover:border-cyan-400/50 text-sm`}
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
              className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-sm"
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
              className="w-5 h-8 border-2 border-cyan-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-2 bg-cyan-400 rounded-full mt-1"
              ></motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;