import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useEntrance } from '../hooks/useReveal';
import { useMediaQuery } from '../hooks/useMediaQuery';
import Picture from './Picture';
import { getPicture } from '../data/images';
import './Hero.css';

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Matches the 992px breakpoint in Hero.css, where the grid collapses to one
  // column. Above it the portrait sits beside the text and can drift; below it
  // the portrait is in the flow, so translating and fading it leaves its layout
  // box reserved — a full-width hole under the hero. Off entirely on mobile.
  const isDesktop = useMediaQuery('(min-width: 993px)');

  // Parallax + scroll-fade are decorative. Under reduced motion, or on mobile,
  // the portrait simply stays put and stays visible.
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const parallaxStyle =
    prefersReducedMotion || !isDesktop ? undefined : { y: y1, opacity };

  const enterContent = useEntrance({ y: 30, duration: 1.2 });
  const enterDesc = useEntrance({ delay: 0.5 });
  const enterActions = useEntrance({ y: 20, delay: 0.7 });
  const enterVisual = useEntrance({ duration: 1.5 });
  const enterScroll = useEntrance({ delay: 1.5 });

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        
        <motion.div 
          className="hero-content"
          {...enterContent}
        >
          <h1 className="hero-title">
            <span className="block">Simum</span>
            <span className="block italic-serif">Tasnim</span>
          </h1>

          <motion.p 
            className="hero-description"
            {...enterDesc}
          >
            Supply chain leader turned founder. Five years moving freight across three continents, then I started building the products I wanted to use.
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
