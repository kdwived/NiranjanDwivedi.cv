import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building, ExternalLink } from 'lucide-react';

const Experience = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        triggerOnce: true,
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const experiences = [
    {
      position: 'Web Developer Intern',
      company: 'Enego Services Pvt. Ltd.',
      duration: 'Current Position',
      // location: 'Remote',
      type: 'Internship',
      description: 'Working on modern web applications using React.js and Node.js. Collaborating with senior developers to build scalable solutions and improve user experience.',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'CSS3'],
      color: 'from-cyan-400 to-blue-500',
      status: 'current'
    },
    {
      position: 'Web Developer Intern',
      company: 'Safe Your Web',
      duration: '2024',
      // location: 'Remote',
      type: 'Internship',
      description: 'Contributed to developing a "Security Captain Appointment" page and enhancing frontend functionality using ReactJS and Redux Toolkit.',
      technologies: ['ReactJS', 'Redux Toolkit', 'HTML5', 'CSS3', 'JavaScript'],
      color: 'from-purple-400 to-pink-500',
      status: 'completed',
      link: '/documents/Safe_your_web.pdf'
    },
    {
      position: 'Frontend Developer Intern',
      company: 'CodSoft',
      duration: '2024',
      // location: 'Remote',
      type: 'Internship',
      description: 'Contributed to various projects, enhancing practical skills in software development. Created responsive user interfaces and implemented interactive features.',
      technologies: ['React.js', 'CSS3', 'JavaScript', 'Figma', 'Git'],
      color: 'from-green-400 to-teal-500',
      status: 'completed',
      link: '/documents/CodSoft.pdf'
    },
  ];

  return (
    <section id="experience" className="py-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Work <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            My professional journey in web development and software engineering
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full hidden lg:block"></div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'
                } justify-center`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full border-2 border-gray-900 z-10 hidden lg:block"></div>

                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  className={`w-full max-w-md ${
                    index % 2 === 0 ? 'lg:mr-6 lg:text-right' : 'lg:ml-6 lg:text-left'
                  } text-left`}
                >
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300`}></div>
                    <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
                      
                      {/* Status Badge */}
                      <div className={`flex items-center gap-2 mb-3 ${
                        index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'
                      } justify-start`}>
                        <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          exp.status === 'current'
                            ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                            : 'bg-blue-400/20 text-blue-400 border border-blue-400/30'
                        }`}>
                          {exp.status === 'current' ? 'Currently Working' : 'Completed'}
                        </div>
                        <div className={`w-8 h-8 bg-gradient-to-br ${exp.color} rounded-md flex items-center justify-center`}>
                          <Briefcase className="text-white" size={14} />
                        </div>
                      </div>

                      {/* Position and Company */}
                      <div className={`mb-3 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-left`}>
                        <h3 className="text-lg font-bold text-white mb-1">{exp.position}</h3>
                        <div className="flex items-center gap-1 text-purple-400 font-semibold text-sm mb-2">
                          <Building size={14} />
                          {exp.link ? (
                            <div className="flex items-center gap-1">
                              <ExternalLink size={12} className="text-cyan-400" />
                              <a 
                                href={exp.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-cyan-400 transition-colors duration-200 underline decoration-dotted hover:decoration-solid"
                              >
                                {exp.company}
                              </a>
                            </div>
                          ) : (
                            <span>{exp.company}</span>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className={`space-y-1 mb-3 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-left`}>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Calendar size={12} />
                          <span>{exp.duration}</span>
                        </div>
                        {/* <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <MapPin size={12} />
                          <span>{exp.location}</span>
                        </div> */}
                      </div>

                      {/* Description */}
                      <p className={`text-gray-300 leading-relaxed mb-3 text-sm ${
                        index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                      } text-left`}>
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className={`flex flex-wrap gap-1 ${
                        index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'
                      } justify-start`}>
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-0.5 text-xs font-medium bg-gray-800/50 text-cyan-400 rounded-full border border-gray-700/50 hover:border-cyan-400/50 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          {[
            { number: '3+', label: 'Companies Worked With', color: 'from-cyan-400 to-blue-500' },
            { number: '1+', label: 'Years of Experience', color: 'from-purple-400 to-pink-500' },
            { number: '10+', label: 'Projects Completed', color: 'from-green-400 to-teal-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="text-center group"
            >
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300`}></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
                  <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-medium text-sm">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;