import React from 'react'
import { ArrowDown, Github, Linkedin, Mail, Download, Calendar } from 'lucide-react'

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-gray-900 to-gray-900" />

      <div className="section-container relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="heading-primary bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-purple-400">
              Travis Duncan
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-medium">
              Senior GRC Engineer | Technical Program Manager
            </p>
            <div className="flex flex-col items-center gap-2">
              <p className="text-lg text-gray-400 flex items-center gap-2">
                <span>📍</span> Las Vegas, NV | Remote
              </p>
              <a 
                href="https://travisduncansecurity.com" 
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                travisduncansecurity.com
              </a>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed">
            8+ years advancing security, compliance, and risk reduction across highly regulated systems.
            Hands-on cloud security and automation expertise in AWS and Azure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="https://calendly.com/travisduncan/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Schedule a Call
            </a>
            <a href="#projects" className="btn-secondary">
              View My Work
            </a>
            <a
              href="/resume.pdf"
              download
              className="btn-secondary"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center pt-8">
            <a
              href="https://www.linkedin.com/in/travis-w-duncan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-400 transition-colors transform hover:scale-110"
            >
              <Linkedin className="w-8 h-8" />
            </a>
            <a
              href="https://github.com/travdunc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-400 transition-colors transform hover:scale-110"
            >
              <Github className="w-8 h-8" />
            </a>
            <a
              href="mailto:travis@travisduncansecurity.com"
              className="text-gray-400 hover:text-primary-400 transition-colors transform hover:scale-110"
            >
              <Mail className="w-8 h-8" />
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="pt-16 animate-bounce">
            <a href="#about" className="inline-block text-gray-400 hover:text-primary-400 transition-colors">
              <ArrowDown className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
