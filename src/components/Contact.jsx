import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <h2 className="section-title">Let's Connect</h2>
          <div className="thin-line"></div>
        </motion.div>

        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3>Ready to Drive Impact Together?</h3>
            <p>I'm always open to discussing new opportunities, strategic challenges, and innovative solutions that create meaningful business value.</p>
            
            <div className="contact-links">
              <a href="mailto:tasnimsimum@gmail.com" className="contact-link">
                <Mail size={20} />
                tasnimsimum@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/simum-tasnim/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <FaLinkedin size={20} />
                LinkedIn Profile
              </a>
            </div>

            <div className="social-icons">
              <a href="https://github.com/stasnim10" target="_blank" rel="noopener noreferrer"><FaGithub size={20} /></a>
              <a href="https://youtu.be/Dc2B160hu_E" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} /></a>
            </div>
          </motion.div>

          <motion.div 
            className="contact-calendly"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="calendly-wrapper">
               <div 
                 className="calendly-inline-widget" 
                 data-url="https://calendly.com/tasnimsimum/30min" 
                 style={{ minWidth: '320px', height: '600px' }}
               ></div>
            </div>
          </motion.div>
        </div>

      </div>
      
      <footer className="minimal-footer">
        <p>&copy; {new Date().getFullYear()} Simum Tasnim. <i>The only limit is your imagination.</i></p>
      </footer>
    </section>
  );
};

export default Contact;
