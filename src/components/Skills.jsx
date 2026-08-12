import React from 'react'
import { Cloud, Shield, Code, Wrench, FileCheck, Target } from 'lucide-react'
import { motion } from 'framer-motion'

const Skills = () => {
  const skillCategories = [
    {
      icon: <Cloud className="w-6 h-6" />,
      title: 'Cloud Platforms',
      skills: ['AWS', 'Azure (AZ-900, SC-900)'],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Security & Compliance',
      skills: ['NIST'],
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: 'Tools & Technologies',
      skills: ['CloudFormation', 'CloudTrail', 'AWS Security Hub', 'GuardDuty'],
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Programming/Scripting',
      skills: ['Python', 'PowerShell'],
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'GRC Frameworks',
      skills: ['NIST RMF'],
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Core Competencies',
      skills: ['Risk Assessment', 'Policy Development', 'Vulnerability Management'],
    },
  ]

  return (
    <section id="skills" className="section-container bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="card group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary-500/10 rounded-lg text-primary-400 group-hover:bg-primary-500/20 transition-colors">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="text-gray-400 flex items-center"
                      >
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
