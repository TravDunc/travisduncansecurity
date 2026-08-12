import React from 'react'
import { ExternalLink, Github, Server, FolderPlus } from 'lucide-react'
import { motion } from 'framer-motion'

const Projects = () => {
  const projects = [
    {
      title: 'AWS CloudFormation Secure S3 Bucket',
      description: 'Infrastructure-as-Code solution for deploying secure S3 buckets with best practice security configurations',
      technologies: ['CloudFormation', 'Infrastructure-as-Code (IaC)', 'Security Hub'],
      githubUrl: 'https://github.com/travdunc/AWS-CloudFormation-Secure-S3-Bucket/',
      icon: <Server className="w-8 h-8" />,
      keyPoints: [
        'Automated secure bucket deployment',
        'Built-in compliance configurations',
        'Security best practices implementation',
      ],
    },
    {
      title: 'Additional Projects in Progress',
      description: 'Open-source projects focused on GRC automation, security compliance tooling, and cloud infrastructure solutions are currently in development.',
      icon: <FolderPlus className="w-8 h-8" />,
      isInProgress: true,
    },
  ]

  return (
    <section id="projects" className="section-container bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="card group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className={`p-4 rounded-lg inline-block transition-colors ${
                  project.isInProgress 
                    ? 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20' 
                    : 'bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20'
                }`}>
                  {project.icon}
                </div>
                {project.isInProgress && (
                  <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400">
                    In Progress
                  </span>
                )}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Key Points */}
              {project.keyPoints && project.keyPoints.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {project.keyPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start text-gray-400">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 mt-2" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {/* Links */}
              {!project.isInProgress && (
                <div className="flex gap-4 pt-4 border-t border-gray-700">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
