import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Products from './components/Products';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ShaderBackground from './components/ShaderBackground';

function App() {
  return (
    <div className="app-container">
      <ShaderBackground />
      <Navigation />
      <main>
        <Hero />
        <Products />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
