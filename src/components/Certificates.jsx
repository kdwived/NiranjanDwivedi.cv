import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Calendar, Shield } from 'lucide-react';

const Certificates = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const certificates = [
    {
      title: 'O Level Certification',
      issuer: 'National Institute of Electronics & Information Technology (NIELIT)',
      date: 'Completed',
      description:
        'Professional computer education covering computer fundamentals, information technology concepts, programming fundamentals, web-related technologies, and practical digital skills.',
      icon: Shield,
      color: 'from-cyan-400 to-blue-500',
      link: 'https://drive.google.com/file/d/1xevaHmMRy-LGojRZ5X1VfUyegn9hkVsb/view?usp=sharing',
      skills: [
        'Computer Fundamentals',
        'Programming Basics',
        'IT Concepts',
        'Web Technologies',
      ]
    },
    {
      title: 'Course on Computer Concepts (CCC)',
      issuer: 'National Institute of Electronics & Information Technology (NIELIT)',
      date: 'Completed',
      description:
        'Comprehensive certification covering computer fundamentals, office applications, internet usage, digital communication, and essential digital literacy skills.',
      icon: Award,
      color: 'from-purple-400 to-pink-500',
      link: 'https://drive.google.com/file/d/1q3eqoG-CEofN2DpkMlhzW4FVWErtRcd6/view?usp=sharing',
      skills: [
        'MS Office Suite',
        'Internet & Email',
        'Digital Literacy',
        'Computer Applications',
      ]
    },
  ];

  return (
    <section id="certificates" className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mb-6"></div>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Professional certifications that strengthen my foundation in
            technology, digital systems, computer applications, and
            technology-driven business solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}
              ></div>
              
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300"
              >
                {/* Certificate Header - Minimized */}
                <div className={`relative p-4 bg-gradient-to-br ${cert.color} bg-opacity-10`}>
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center`}
                    >
                      <cert.icon className="text-white" size={24} />
                    </div>

                    {/* View Certificate */}
                    <motion.a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white hover:text-cyan-400 transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar size={14} />
                    <span className="text-xs">{cert.date}</span>
                  </div>
                </div>

                {/* Certificate Content - Minimized */}
                <div className="p-4">
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-purple-400 mb-1">
                      Issued by
                    </h4>
                    <p className="text-white font-medium text-sm">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-purple-400 mb-1">
                      Description
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-sm line-clamp-2">
                      {cert.description}
                    </p>
                  </div>

                  {/* Skills Covered - Minimized */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">
                      Skills Covered
                    </h4>

                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 text-xs font-medium bg-gray-800/50 text-cyan-400 rounded-full border border-gray-700/50 hover:border-cyan-400/50 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Certificate Button */}
                  <motion.a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 w-full justify-center py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>View Certificate</span>
                    <ExternalLink size={14} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Stats - Minimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-6 px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Award className="text-white" size={20} />
              </div>

              <div className="text-left">
                <div className="text-xl font-bold text-white">2</div>
                <div className="text-xs text-gray-400">
                  Certifications Verified
                </div>
              </div>
            </div>
            
            <div className="w-px h-10 bg-gray-700"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>

              <div className="text-left">
                <div className="text-xl font-bold text-white">
                  NIELIT
                </div>
                <div className="text-xs text-gray-400">
                  Certification Authority
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 mb-4 text-sm">
            Continuously learning and building new skills
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-400 font-medium text-sm">
              More certifications coming soon...
            </span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Certificates;