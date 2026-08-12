import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import VeteransPage from './pages/VeteransPage'
import VACalculatorFull from './components/veterans/VACalculatorFull'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <ScrollProgress />
        <Navbar isScrolled={isScrolled} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/veterans" element={<VeteransPage />} />
          <Route path="/veterans/calculator" element={<VACalculatorFull />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
