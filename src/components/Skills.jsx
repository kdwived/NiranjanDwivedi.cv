import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Globe, Wrench, Layers } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('Programming');

  const skillCategories = [
    {
      name: 'Programming',
      icon: Code,
      color: 'from-cyan-400 to-blue-500',
      skills: [
        { name: 'Java', level: 85, color: 'bg-orange-500' },
        { name: 'JavaScript', level: 90, color: 'bg-yellow-500' },
        { name: 'Python', level: 80, color: 'bg-green-500' },
        { name: 'TypeScript', level: 75, color: 'bg-blue-500' },
      ]
    },
    {
      name: 'Frameworks',
      icon: Layers,
      color: 'from-purple-400 to-pink-500',
      skills: [
        { name: 'React.js', level: 90, color: 'bg-cyan-500' },
        { name: 'Redux Toolkit', level: 85, color: 'bg-purple-500' },
        { name: 'Node.js', level: 80, color: 'bg-green-600' },
        { name: 'Express.js', level: 75, color: 'bg-gray-500' },
      ]
    },
    {
      name: 'Web Technologies',
      icon: Globe,
      color: 'from-green-400 to-teal-500',
      skills: [
        { name: 'HTML', level: 95, color: 'bg-orange-600' },
        { name: 'CSS', level: 90, color: 'bg-blue-600' },
        { name: 'Tailwind CSS', level: 85, color: 'bg-teal-500' },
        // { name: 'SASS', level: 80, color: 'bg-pink-500' },
      ]
    },
    {
      name: 'Databases',
      icon: Database,
      color: 'from-orange-400 to-red-500',
      skills: [
        { name: 'MongoDB', level: 85, color: 'bg-green-700' },
        { name: 'SQL Server', level: 80, color: 'bg-blue-700' },
        // { name: 'MySQL', level: 75, color: 'bg-orange-600' },
        // { name: 'Firebase', level: 70, color: 'bg-yellow-600' },
      ]
    },
    {
      name: 'Tools',
      icon: Wrench,
      color: 'from-pink-400 to-purple-500',
      skills: [
        { name: 'Git', level: 85, color: 'bg-orange-700' },
        { name: 'Visual Studio Code', level: 90, color: 'bg-blue-600' },
        { name: 'Postman', level: 80, color: 'bg-orange-500' },
        { name: 'Figma', level: 70, color: 'bg-purple-600' },
      ]
    },
  ];

  const activeSkills = skillCategories.find(cat => cat.name === activeCategory);

  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technical <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Category Selector */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="space-y-3">
              {skillCategories.map((category, index) => (
                <motion.button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 border text-left ${
                    activeCategory === category.name
                      ? 'bg-gray-800/70 border-cyan-400/50 shadow-lg shadow-cyan-400/20'
                      : 'bg-gray-900/30 border-gray-700/30 hover:bg-gray-800/50 hover:border-gray-600/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                      <category.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        activeCategory === category.name ? 'text-cyan-400' : 'text-white'
                      }`}>
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {skillCategories.find(cat => cat.name === category.name)?.skills.length} skills
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Skills Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeSkills?.color} flex items-center justify-center`}>
                    {activeSkills && <activeSkills.icon className="text-white" size={24} />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeCategory}</h3>
                    <p className="text-gray-400">Professional proficiency</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {activeSkills?.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: inView ? `${skill.level}%` : 0 }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className={`h-full ${skill.color} rounded-full relative`}
                        >
                          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3D Skill Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Skill Overview</h3>
            <p className="text-gray-400">Interactive visualization of my technical expertise</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="group relative cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setActiveCategory(category.name)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-all duration-300">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                    <category.icon className="text-white" size={28} />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{category.name}</h4>
                  <div className="text-sm text-gray-400">
                    {category.skills.length} technologies
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;