import React from 'react'
import { Mail, Linkedin, Github, Calendar, MapPin } from 'lucide-react'

const Contact = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Professional Email',
      value: 'travis@travisduncansecurity.com',
      href: 'mailto:travis@travisduncansecurity.com',
      color: 'from-blue-500 to-cyan-500',
      subdomain: 'travisduncansecurity.com',
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      value: 'travis-w-duncan',
      href: 'https://www.linkedin.com/in/travis-w-duncan',
      color: 'from-blue-600 to-blue-400',
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      value: 'travdunc',
      href: 'https://github.com/travdunc',
      color: 'from-gray-600 to-gray-400',
    },
  ]

  return (
    <section id="contact" className="section-container bg-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 text-lg">
            Let's discuss how I can help secure your organization
          </p>
        </div>

        {/* Primary CTA */}
        <div className="mb-16 text-center">
          <a
            href="https://calendly.com/travisduncan/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Calendar className="w-6 h-6 mr-3" />
            Schedule a 30-Minute Call
          </a>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="card group hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-gradient-to-br ${method.color} bg-opacity-10 rounded-lg text-white group-hover:bg-opacity-20 transition-all`}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">{method.label}</p>
                  <p className="text-white font-medium">{method.value}</p>
                  {method.subdomain && (
                    <p className="text-xs text-primary-400 mt-1">{method.subdomain}</p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Location */}
        <div className="text-center card max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-3 text-gray-300">
            <MapPin className="w-5 h-5 text-primary-400" />
            <span className="text-lg">Las Vegas, NV | Remote</span>
          </div>
        </div>

        {/* Additional Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Open to full-time opportunities and select consulting engagements.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact
