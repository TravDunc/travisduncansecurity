import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Calendar } from 'lucide-react'

const Navbar = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const navItems = [
    { name: 'Home', href: '/', type: 'route' },
    { name: 'About', href: '#about', type: 'hash' },
    { name: 'Skills', href: '#skills', type: 'hash' },
    { name: 'Projects', href: '#projects', type: 'hash' },
    { name: 'Certifications', href: '#certifications', type: 'hash' },
    { name: 'Veterans', href: '/veterans', type: 'route' },
    { name: 'Contact', href: '#contact', type: 'hash' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-white hover:text-primary-400 transition-colors"
          >
            Travis Duncan
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isVeteransPage = item.href === '/veterans';
              const isActive = location.pathname === item.href || 
                              (location.pathname.startsWith('/veterans') && isVeteransPage);
              
              if (item.type === 'route') {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`transition-colors duration-200 ${
                      isVeteransPage 
                        ? 'text-military-400 hover:text-military-300 font-semibold'
                        : isActive
                        ? 'text-white font-semibold'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              } else if (isHomePage || item.href === '#contact') {
                // Hash links work on home page or for contact (accessible from all pages)
                return (
                  <a
                    key={item.name}
                    href={isHomePage ? item.href : `/${item.href}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                );
              } else {
                // On other pages, navigate to home then scroll
                return (
                  <Link
                    key={item.name}
                    to={`/${item.href}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                );
              }
            })}
            <a
              href="https://calendly.com/travisduncan/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book a Call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => {
              const isVeteransPage = item.href === '/veterans';
              
              if (item.type === 'route') {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      isVeteransPage
                        ? 'text-military-400 hover:text-military-300 bg-military-900/20 hover:bg-military-900/30 font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              } else if (isHomePage || item.href === '#contact') {
                return (
                  <a
                    key={item.name}
                    href={isHomePage ? item.href : `/${item.href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {item.name}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={item.name}
                    to={`/${item.href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                );
              }
            })}
            <a
              href="https://calendly.com/travisduncan/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="block btn-primary text-center mt-4"
            >
              <Calendar className="w-4 h-4 mr-2 inline" />
              Book a Call
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
