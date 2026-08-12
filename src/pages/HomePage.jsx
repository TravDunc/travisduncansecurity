import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import FadeInSection from '../components/FadeInSection';

/**
 * Home Page - Original single-page portfolio content
 */
const HomePage = () => {
  return (
    <main>
      <Hero />
      <FadeInSection>
        <About />
      </FadeInSection>
      <FadeInSection>
        <Skills />
      </FadeInSection>
      <FadeInSection>
        <Projects />
      </FadeInSection>
      <FadeInSection>
        <Certifications />
      </FadeInSection>
      <FadeInSection>
        <Contact />
      </FadeInSection>
    </main>
  );
};

export default HomePage;
