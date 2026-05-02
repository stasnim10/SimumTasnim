import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p 
            className="hero-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            MBA Candidate & Strategic Consultant
          </motion.p>
          
          <h1 className="hero-title">
            <span className="block">Simum</span>
            <span className="block italic-serif">Tasnim</span>
          </h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Transforming complex business challenges into strategic opportunities through data-driven insights and innovative design thinking.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <a href="#products" className="btn btn-primary">Explore My Work</a>
            <a href="#contact" className="btn">Let's Connect</a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="image-frame">
            <img 
              src="/assets/images/first_image_top_page.jpg?v=20260501"
              alt="Simum Tasnim Portrait" 
              className="hero-image"
            />
          </div>
        </motion.div>

      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-line"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
