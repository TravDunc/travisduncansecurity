import React from 'react'
import { Award, Shield, Cloud, CheckCircle, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

const Certifications = () => {
  const certifications = [
    {
      name: 'CISSP',
      fullName: 'Certified Information Systems Security Professional',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      credlyUrl: 'https://www.credly.com/badges/c7770d59-b69e-49d7-b404-51f137fc9c9d/public_url',
    },
    {
      name: 'CCSP',
      fullName: 'Certified Cloud Security Professional',
      icon: <Cloud className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      credlyUrl: 'https://www.credly.com/badges/6e2cdb24-b3df-4024-ac6d-2ba91b60ac07/public_url',
    },
    {
      name: 'CISM',
      fullName: 'Certified Information Security Manager',
      icon: <Award className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      credlyUrl: 'https://www.credly.com/badges/8dac8a06-9380-41e0-819f-c422c4b58a48/public_url',
    },
    {
      name: 'CGRC',
      fullName: 'Certified in Governance, Risk, & Compliance',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      credlyUrl: 'https://www.credly.com/badges/775f8c9a-8b92-425d-8719-932e30e745a4/public_url',
    },
    {
      name: 'NIST CSF Foundation',
      fullName: 'NIST Cybersecurity Framework Foundation',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-indigo-500 to-blue-500',
      credlyUrl: 'https://www.credly.com/badges/09fe2b6f-c505-41eb-b95d-9b2e0fd7377a/public_url',
    },
    {
      name: 'CBCP',
      fullName: 'Certified Business Continuity Professional',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-cyan-500 to-teal-500',
      credlyUrl: 'https://www.credly.com/badges/9fe11e90-8684-4e93-b993-1efc74224e93/public_url',
    },
  ]

  return (
    <section id="certifications" className="section-container bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-secondary mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const CardContent = (
              <>
                {/* Gradient background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative">
                  {/* Icon and Verify Badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`p-3 bg-gradient-to-br ${cert.color} bg-opacity-10 rounded-lg text-white inline-block`}>
                      {cert.icon}
                    </div>
                    {cert.credlyUrl && (
                      <div className="flex items-center gap-1 text-primary-400 text-xs">
                        <ExternalLink className="w-4 h-4" />
                        <span className="hidden sm:inline">Verify</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
                  <p className="text-gray-400 text-sm">{cert.fullName}</p>
                </div>
              </>
            )

            const MotionWrapper = motion[cert.credlyUrl ? 'a' : 'div']
            
            return (
              <MotionWrapper
                key={index}
                href={cert.credlyUrl}
                target={cert.credlyUrl ? "_blank" : undefined}
                rel={cert.credlyUrl ? "noopener noreferrer" : undefined}
                className={`card group relative overflow-hidden ${cert.credlyUrl ? 'cursor-pointer transform hover:scale-105' : ''} transition-transform`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {CardContent}
              </MotionWrapper>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Committed to continuous learning and professional development in cybersecurity and GRC
          </p>
        </div>
      </div>
    </section>
  )
}

export default Certifications
