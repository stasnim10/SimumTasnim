import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import Picture from './Picture';
import { getPicture, getImageUrl } from '../data/images';
import './Products.css';

const products = [
  {
    tag: "Amazon E-Commerce · Oct 2025",
    title: "USOTG",
    description: "Federally trademarked Amazon brand built from scratch. Managed product sourcing, FBA logistics, and successful product launches.",
    date: "Live on Amazon",
    link: "https://www.usotg.com",
    media: { 
      type: 'image', 
      src: '/assets/images/products/USOTG-Store.jpg',
      clickableLink: "https://www.usotg.com" 
    }
  },
  {
    tag: "iOS · Android · Jan 2026",
    title: "Zikr on the Go",
    description: "Mindfulness & Zikr-tracking app for Muslim users. Focused on daily spiritual habit formation, accessibility, and UX simplicity. Deployed on App Store & Google Play.",
    date: "Launched Jan 2026",
    link: "https://onelink.to/h9968b",
    media: {
      type: 'video',
      poster: '/assets/images/products/zikr-poster.jpg',
      sources: [
        { src: '/assets/images/products/zikr.webm', type: 'video/webm' },
        { src: '/assets/images/products/zikr.mp4', type: 'video/mp4' },
      ],
    }
  },
  {
    tag: "EdTech Web App · Sep 2025",
    title: "Case Quest",
    description: "Web platform for MBA candidates & aspiring consultants to practice case interviews through structured frameworks, real prompts, and analytics-driven iteration.",
    date: "Launched Sep 2025",
    link: "https://casequestapp.com",
    media: { type: 'image', src: '/assets/images/products/case-quest.jpg' }
  },
  {
    tag: "AI Web App · Apr 2026",
    title: "Resume on the Go",
    description: "AI-powered resume builder that helps job seekers build, tailor, and optimize resumes using generative AI. Fast, intuitive, AI-first product experience.",
    date: "Launched Apr 2026",
    link: "https://resumeotg.app",
    media: { 
      type: 'iframe', 
      src: "https://www.youtube.com/embed/W7k3avzYMB4?si=SBjkK5O1kAzhDhFb" 
    }
  },
];

const Products = () => {
  const revealHeader = useReveal();
  const revealMedia = useReveal({ y: 0, duration: 1.2 });
  const revealText = useReveal({ y: 40, delay: 0.2 });

  return (
    <section id="products" className="products-section">
      <div className="container">
        
        <motion.div 
          className="section-header"
          {...revealHeader}
        >
          <div className="section-subtitle">Products Built</div>
          <h2 className="section-title">From Idea to Shipped</h2>
          <p className="section-intro">4 products and brands, built independently in 2025–2026 — across mobile, EdTech, AI, and e-commerce.</p>
          <div className="thin-line"></div>
        </motion.div>

        <div className="products-gallery">
          {products.map((product, index) => (
            <div key={index} className={`product-gallery-item ${index % 2 !== 0 ? 'reverse' : ''}`}>
              <motion.div 
                className="product-image-container"
                {...revealMedia}
              >
                {product.media.type === 'video' && (
                  <video
                    className="product-image"
                    poster={getImageUrl(product.media.poster)}
                    controls
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    width="720"
                    height="1280"
                  >
                    {product.media.sources.map((s) => (
                      <source key={s.src} src={s.src} type={s.type} />
                    ))}
                    Your browser cannot play this video.{' '}
                    <a href={product.link} target="_blank" rel="noopener noreferrer">
                      Open {product.title}
                    </a>{' '}
                    instead.
                  </video>
                )}
                {product.media.type === 'image' && (
                  product.media.clickableLink ? (
                    <a href={product.media.clickableLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
                      <Picture
                        image={getPicture(product.media.src)}
                        alt={product.title}
                        className="product-image"
                        sizes="(max-width: 992px) 100vw, 560px"
                        loading="lazy"
                        decoding="async"
                      />
                    </a>
                  ) : (
                    <Picture
                      image={getPicture(product.media.src)}
                      alt={product.title}
                      className="product-image"
                      sizes="(max-width: 992px) 100vw, 560px"
                      loading="lazy"
                      decoding="async"
                    />
                  )
                )}
                {product.media.type === 'iframe' && (
                  <iframe 
                    src={product.media.src}
                    className="product-embed"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={product.title}
                  />
                )}
              </motion.div>

              <motion.div 
                className="product-text"
                {...revealText}
              >
                <span className="product-year">{product.tag}</span>
                <h3 className="product-title">
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    {product.title}
                  </a>
                </h3>
                <p className="product-desc">{product.description}</p>
                
                <div className="product-footer">
                  <span className="product-date">{product.date}</span>
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="pill-link">
                    Open {product.title} <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Products;
