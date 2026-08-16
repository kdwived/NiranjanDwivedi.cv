import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = [
    {
      degree: 'Bachelor’s Degree',
      institution: 'B.S. College, Danapur (Affiliated to Magadh University)',
      duration: '2020',
      location: 'Patna, Bihar',
      description:
        'Built a foundation in business studies and practical digital skills, developing an understanding of business operations, communication, and technology-driven problem solving.',
      status: 'Completed',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Indira Gandhi National Open University (IGNOU)',
      duration: '2020 - 2022',
      location: 'New Delhi',
      description:
        'Developed a strong foundation in computer applications, programming, databases, web technologies, and digital systems — supporting my ability to combine marketing with technology, automation, and data.',
      status: 'Completed',
      color: 'from-purple-400 to-pink-500',
    },
  ];

  return (
    <section id="education" className="py-12 relative">
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
              Education
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mb-6"></div>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            My education gave me a strong foundation across business, technology,
            digital systems, and computer applications — helping me build a
            career at the intersection of marketing, automation, AI, and data.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full"></div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full border-4 border-gray-900 z-10"></div>

                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`w-full max-w-md ${
                    index % 2 === 0 ? 'mr-6 text-right' : 'ml-6 text-left'
                  }`}
                >
                  <div className="relative group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}
                    ></div>

                    <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300">
                      
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          index % 2 === 0
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${edu.color} rounded-lg flex items-center justify-center`}
                        >
                          <GraduationCap className="text-white" size={20} />
                        </div>

                        <div
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            edu.status === 'In Progress'
                              ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                              : 'bg-green-400/20 text-green-400 border border-green-400/30'
                          }`}
                        >
                          {edu.status}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2">
                        {edu.degree}
                      </h3>

                      <h4 className="text-sm text-purple-400 font-semibold mb-3">
                        {edu.institution}
                      </h4>
                      
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar size={14} />
                          <span>{edu.duration}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <MapPin size={14} />
                          <span>{edu.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed text-sm">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>

            <span className="text-gray-300 text-sm">
              Business + Technology + Digital Systems
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;