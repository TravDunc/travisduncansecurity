import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Award, DollarSign, ExternalLink, ChevronDown, ChevronUp,
  Briefcase, Heart, Home, FileText, GraduationCap
} from 'lucide-react';
import VACalculatorPreview from '../components/veterans/VACalculatorPreview';
import FadeInSection from '../components/FadeInSection';

const VeteransPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Learning Opportunities Data
  const learningOpportunities = [
    {
      name: 'Coursera for Veterans',
      description: 'Free access to 4,000+ courses from top universities. Topics include technology, business, data science, and more.',
      url: 'https://www.coursera.org/for-university-and-college-students/coursera-for-veterans',
      category: 'Online Learning'
    },
    {
      name: 'VetTec (Code Platoon)',
      description: 'VA-approved high-tech training programs. Learn coding, cybersecurity, and tech skills with full VA funding.',
      url: 'https://www.va.gov/education/about-gi-bill-benefits/how-to-use-benefits/vettec-high-tech-program/',
      category: 'Bootcamp'
    },
    {
      name: 'AWS Training for Veterans',
      description: 'Free cloud computing training and certification prep for veterans transitioning to tech careers.',
      url: 'https://aws.amazon.com/education/awseducate/veterans/',
      category: 'Cloud Computing'
    },
    {
      name: 'Cybrary for Veterans',
      description: 'Free cybersecurity training courses covering ethical hacking, network security, and compliance.',
      url: 'https://www.cybrary.it/',
      category: 'Cybersecurity'
    },
    {
      name: 'LinkedIn Learning for Veterans',
      description: 'Free one-year premium membership for U.S. veterans and military spouses.',
      url: 'https://socialimpact.linkedin.com/programs/veterans/premiumform',
      category: 'Professional Development'
    }
  ];

  // Certifications by Category
  const certifications = {
    'GRC & Compliance': [
      { name: 'CISSP', description: 'Certified Information Systems Security Professional', org: 'ISC²' },
      { name: 'CISM', description: 'Certified Information Security Manager', org: 'ISACA' },
      { name: 'CRISC', description: 'Certified in Risk and Information Systems Control', org: 'ISACA' },
      { name: 'CGRC', description: 'Certified in Governance, Risk and Compliance', org: 'ISACA' },
      { name: 'CISA', description: 'Certified Information Systems Auditor', org: 'ISACA' }
    ],
    'Cloud & Infrastructure': [
      { name: 'AWS Solutions Architect', description: 'Associate & Professional levels', org: 'Amazon Web Services' },
      { name: 'AWS Security Specialty', description: 'Advanced cloud security certification', org: 'Amazon Web Services' },
      { name: 'Azure Security Engineer', description: 'Microsoft security implementation', org: 'Microsoft' },
      { name: 'Azure Administrator', description: 'Cloud infrastructure management', org: 'Microsoft' },
      { name: 'GCP Professional Cloud Architect', description: 'Google Cloud Platform design', org: 'Google Cloud' }
    ],
    'Cybersecurity': [
      { name: 'Security+', description: 'Entry-level security certification', org: 'CompTIA' },
      { name: 'CEH', description: 'Certified Ethical Hacker', org: 'EC-Council' },
      { name: 'OSCP', description: 'Offensive Security Certified Professional', org: 'Offensive Security' },
      { name: 'GCIH', description: 'GIAC Certified Incident Handler', org: 'SANS/GIAC' },
      { name: 'GCIA', description: 'GIAC Certified Intrusion Analyst', org: 'SANS/GIAC' }
    ],
    'Project Management': [
      { name: 'PMP', description: 'Project Management Professional', org: 'PMI' },
      { name: 'CAPM', description: 'Certified Associate in Project Management', org: 'PMI' },
      { name: 'CSM', description: 'Certified ScrumMaster', org: 'Scrum Alliance' },
      { name: 'PSM', description: 'Professional Scrum Master', org: 'Scrum.org' }
    ]
  };

  // Scholarships
  const scholarships = [
    {
      name: 'VOP Scholarship (DRI International)',
      description: 'Veterans Opportunity Program - Full scholarship for professional risk management certification and training.',
      url: 'https://www.drii.org/veterans',
      amount: 'Full Coverage'
    },
    {
      name: 'Post-9/11 GI Bill',
      description: 'Comprehensive education benefits covering tuition, housing, and books for eligible veterans.',
      url: 'https://www.va.gov/education/about-gi-bill-benefits/post-9-11/',
      amount: 'Up to full tuition'
    },
    {
      name: 'Folds of Honor',
      description: 'Educational scholarships for spouses and children of fallen and disabled service members.',
      url: 'https://foldsofhonor.org/',
      amount: 'Up to $5,000'
    },
    {
      name: 'Pat Tillman Foundation',
      description: 'Scholarships for veterans and active-duty service members pursuing higher education.',
      url: 'https://pattillmanfoundation.org/',
      amount: 'Up to $10,000'
    }
  ];

  // Additional Resources
  const additionalResources = [
    {
      category: 'Employment',
      icon: Briefcase,
      resources: [
        { name: 'Hire Heroes USA', url: 'https://www.hireheroesusa.org/', description: 'Free job search assistance for veterans' },
        { name: 'LinkedIn Veterans Program', url: 'https://socialimpact.linkedin.com/programs/veterans', description: 'Career services and job matching' },
        { name: 'RecruitMilitary', url: 'https://recruitmilitary.com/', description: 'Military-friendly job board and career fairs' }
      ]
    },
    {
      category: 'Healthcare',
      icon: Heart,
      resources: [
        { name: 'VA Healthcare Enrollment', url: 'https://www.va.gov/health-care/how-to-apply/', description: 'Apply for VA health benefits' },
        { name: 'Mental Health Support', url: 'https://www.mentalhealth.va.gov/', description: '24/7 crisis support and counseling' },
        { name: 'Give an Hour', url: 'https://giveanhour.org/', description: 'Free mental health services for veterans' }
      ]
    },
    {
      category: 'Home & Finance',
      icon: Home,
      resources: [
        { name: 'VA Home Loans', url: 'https://www.va.gov/housing-assistance/home-loans/', description: 'Zero down payment home loans for veterans' },
        { name: 'Military OneSource', url: 'https://www.militaryonesource.mil/', description: 'Financial counseling and planning' }
      ]
    },
    {
      category: 'Career Transition',
      icon: FileText,
      resources: [
        { name: 'Transition Assistance Program', url: 'https://www.dodtap.mil/', description: 'DOD transition preparation and planning' },
        { name: 'Resume & Interview Help', url: 'https://www.careeronestop.org/Veterans/', description: 'Free resume writing and interview coaching' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-military-900 via-gray-900 to-gray-900 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="text-military-400">Veteran</span> Resources
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools, education, and resources to support your post-service journey.
              From disability calculations to career development—we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Preview */}
      <section className="py-12 bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <VACalculatorPreview />
          </FadeInSection>
        </div>
      </section>

      {/* Learning Opportunities */}
      <section id="learning" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="flex items-center space-x-3 mb-8">
              <BookOpen className="w-8 h-8 text-military-400" />
              <h2 className="text-3xl font-bold text-white">Learning Opportunities</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningOpportunities.map((opportunity, index) => (
                <motion.a
                  key={index}
                  href={opportunity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl p-6 border border-military-700 hover:border-military-500 transition-all hover:-translate-y-1 hover:shadow-xl group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-military-900 text-military-300 text-xs rounded-full">
                      {opportunity.category}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-military-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{opportunity.name}</h3>
                  <p className="text-gray-400 text-sm">{opportunity.description}</p>
                </motion.a>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-16 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="flex items-center space-x-3 mb-8">
              <Award className="w-8 h-8 text-military-400" />
              <h2 className="text-3xl font-bold text-white">Professional Certifications</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(certifications).map(([category, certs], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl border border-military-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(category)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-5 h-5 text-military-400" />
                      <span className="text-lg font-semibold text-white">{category}</span>
                      <span className="text-sm text-gray-400">({certs.length} certifications)</span>
                    </div>
                    {expandedSection === category ? (
                      <ChevronUp className="w-5 h-5 text-military-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {expandedSection === category && (
                    <div className="px-6 pb-4 space-y-3">
                      {certs.map((cert, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-900 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{cert.name}</h4>
                            <p className="text-sm text-gray-400">{cert.description}</p>
                            <p className="text-xs text-military-400 mt-1">{cert.org}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Scholarships */}
      <section id="scholarships" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="flex items-center space-x-3 mb-8">
              <DollarSign className="w-8 h-8 text-military-400" />
              <h2 className="text-3xl font-bold text-white">Scholarships & Funding</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {scholarships.map((scholarship, index) => (
                <motion.a
                  key={index}
                  href={scholarship.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl p-6 border border-military-700 hover:border-gold transition-all hover:-translate-y-1 hover:shadow-xl group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-gold/20 text-gold text-xs rounded-full font-semibold">
                      {scholarship.amount}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{scholarship.name}</h3>
                  <p className="text-gray-400 text-sm">{scholarship.description}</p>
                </motion.a>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Additional Resources */}
      <section id="resources" className="py-16 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-white mb-8">Additional Resources</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {additionalResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 rounded-xl p-6 border border-military-700"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon className="w-6 h-6 text-military-400" />
                      <h3 className="text-xl font-bold text-white">{resource.category}</h3>
                    </div>
                    <div className="space-y-3">
                      {resource.resources.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 bg-gray-900 rounded-lg hover:bg-gray-750 transition-colors group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-white group-hover:text-military-400 transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-military-400 transition-colors flex-shrink-0 ml-2" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <div className="bg-gradient-to-br from-military-700 to-military-800 rounded-xl p-12 border-2 border-military-600">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Calculate Your Benefits?
              </h2>
              <p className="text-military-200 mb-6 max-w-2xl mx-auto">
                Use our interactive calculator to determine your combined disability rating
                and estimated monthly compensation.
              </p>
              <a
                href="/veterans/calculator"
                className="inline-block px-8 py-4 bg-gold hover:bg-gold-light text-gray-900 rounded-lg transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Launch Calculator
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default VeteransPage;
