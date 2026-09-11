import Navigation from './components/Navigation';
import Hero from './components/Hero';
import StatBand from './components/StatBand';
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
      <main id="main">
        <Hero />
        <StatBand />
        <Products />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
