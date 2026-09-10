import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useEntrance } from '../hooks/useReveal';
import Picture from './Picture';
import { getPicture } from '../data/images';
import './Hero.css';

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Parallax + scroll-fade are decorative. Under reduced motion the portrait
  // simply stays put and stays visible.
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const parallaxStyle = prefersReducedMotion ? undefined : { y: y1, opacity };

  const enterContent = useEntrance({ y: 30, duration: 1.2 });
  const enterGreeting = useEntrance({ delay: 0.5 });
  const enterDesc = useEntrance({ delay: 0.8 });
  const enterActions = useEntrance({ y: 20, delay: 1 });
  const enterVisual = useEntrance({ duration: 1.5 });
  const enterScroll = useEntrance({ delay: 1.5 });

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        
        <motion.div 
          className="hero-content"
          {...enterContent}
        >
          <motion.p 
            className="hero-greeting"
            {...enterGreeting}
          >
            MBA Candidate & Strategic Consultant
          </motion.p>
          
          <h1 className="hero-title">
            <span className="block">Simum</span>
            <span className="block italic-serif">Tasnim</span>
          </h1>

          <motion.p 
            className="hero-description"
            {...enterDesc}
          >
            Transforming complex business challenges into strategic opportunities through data-driven insights and innovative design thinking.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            {...enterActions}
          >
            <a href="#products" className="btn btn-primary">Explore My Work</a>
            <a href="#contact" className="btn">Let’s Connect</a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          style={parallaxStyle}
          {...enterVisual}
        >
          <div className="image-frame">
            <Picture
              image={getPicture('/assets/images/first_image_top_page.jpg')}
              alt="Simum Tasnim"
              className="hero-image"
              sizes="(max-width: 992px) 100vw, 480px"
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </div>
        </motion.div>

      </div>

      <motion.div 
        className="scroll-indicator"
        aria-hidden="true"
        {...enterScroll}
      >
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-line"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
