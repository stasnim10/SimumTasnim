import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
// Brand marks live outside the lucide UI icon set by design — a company logo
// is not an interface icon and should not be redrawn to match one.
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

const Contact = () => {
  const revealHeader = useReveal();
  const revealLeft = useReveal({ y: 24 });
  const revealRight = useReveal({ y: 24, delay: 0.2 });

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        
        <motion.div 
          className="section-header"
          {...revealHeader}
        >
          <h2 className="section-title">Let’s Connect</h2>
          <div className="thin-line"></div>
        </motion.div>

        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            {...revealLeft}
          >
            <h3>Ready to Drive Impact Together?</h3>
            <p>I’m always open to discussing new opportunities, strategic challenges, and innovative solutions that create meaningful business value.</p>
            
            <div className="contact-links">
              <a href="mailto:tasnimsimum@gmail.com" className="contact-link">
                <Mail size={20} aria-hidden="true" />
                tasnimsimum@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/simum-tasnim/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <FaLinkedin size={20} aria-hidden="true" />
                LinkedIn Profile
              </a>
            </div>

            <div className="social-icons">
              <a href="https://github.com/stasnim10" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={20} aria-hidden="true" /></a>
              <a href="https://youtu.be/Dc2B160hu_E" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube size={20} aria-hidden="true" /></a>
            </div>
          </motion.div>

          <motion.div 
            className="contact-calendly"
            {...revealRight}
          >
            <div className="calendly-wrapper">
              <iframe
                src="https://calendly.com/tasnimsimum/30min?embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1"
                width="100%"
                height="630"
                loading="lazy"
                title="Schedule a meeting with Simum Tasnim"
              />
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
