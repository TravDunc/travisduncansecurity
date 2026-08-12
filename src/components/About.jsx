import React from 'react'
import { Shield, Code, Target } from 'lucide-react'

const About = () => {
  const highlights = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: '8+ Years Experience',
      description: 'Cybersecurity Leadership with Cloud & Compliance Focus',
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Measurable Impact',
      description: '63% vulnerability reduction in 60 days',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Scale & Automation',
      description: 'Secured $7B+ AWS systems through automation',
    },
  ]

  return (
    <section id="about" className="section-container bg-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Summary */}
          <div className="text-center space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              Cybersecurity leader with 8+ years of progressive experience advancing security, compliance, 
              and risk reduction across highly regulated systems, with hands-on cloud security and automation 
              experience in AWS and Azure.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Proven track record of measurable impact: reduced vulnerability exposure by 63% in 60 days 
              through automated remediation workflows, scaled GRC programs across $7B+ AWS systems, and 
              implemented frameworks that accelerate secure delivery without sacrificing business velocity.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Passionate about making security practical, measurable, and aligned with organizational priorities.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="card text-center group hover:scale-105 transition-transform"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-500/10 rounded-lg text-primary-400 group-hover:bg-primary-500/20 transition-colors">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
