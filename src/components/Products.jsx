import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import './Products.css';

const products = [
  {
    tag: "iOS · Android · Jan 2026",
    title: "Zikr on the Go",
    description: "Mindfulness & Zikr-tracking app for Muslim users. Focused on daily spiritual habit formation, accessibility, and UX simplicity. Deployed on App Store & Google Play.",
    date: "Launched Jan 2026",
    link: "https://onelink.to/h9968b",
    media: { type: 'video', src: '/assets/images/products/Zikrotg.MOV?v=20260501' }
  },
  {
    tag: "EdTech Web App · Sep 2025",
    title: "Case Quest",
    description: "Web platform for MBA candidates & aspiring consultants to practice case interviews through structured frameworks, real prompts, and analytics-driven iteration.",
    date: "Launched Sep 2025",
    link: "https://casequestapp.com",
    media: { type: 'image', src: '/assets/images/products/case-quest.jpg?v=20260501' }
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
  {
    tag: "Amazon E-Commerce · Oct 2025",
    title: "USOTG",
    description: "Federally trademarked Amazon brand built from scratch. Managed product sourcing, FBA logistics, and successful product launches.",
    date: "Live on Amazon",
    link: "https://www.amazon.com/stores/USOTG/page/3DF3FFB3-3953-4F0A-8D31-ACBF0BC864DE?lp_asin=B0GSCXXH65&ref_=ast_bln",
    media: { 
      type: 'image', 
      src: '/assets/images/products/USOTG-Store.png?v=20260501',
      clickableLink: "https://www.amazon.com/stores/USOTG/page/3DF3FFB3-3953-4F0A-8D31-ACBF0BC864DE?lp_asin=B0GSCXXH65&ref_=ast_bln" 
    }
  }
];

const Products = () => {
  return (
    <section id="products" className="products-section">
      <div className="container">
        
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <div className="section-subtitle">Products Built</div>
          <h2 className="section-title">From Idea to Shipped</h2>
          <p className="section-intro" style={{ marginBottom: "2rem" }}>3 live digital products built independently in 2025–2026 — across mobile, EdTech, AI, and e-commerce.</p>
          <div className="thin-line"></div>
        </motion.div>

        <div className="products-gallery">
          {products.map((product, index) => (
            <div key={index} className={`product-gallery-item ${index % 2 !== 0 ? 'reverse' : ''}`}>
              <motion.div 
                className="product-image-container"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2 }}
              >
                {product.media.type === 'video' && (
                  <video 
                    src={product.media.src} 
                    className="product-image" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                )}
                {product.media.type === 'image' && (
                  product.media.clickableLink ? (
                    <a href={product.media.clickableLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
                      <img src={product.media.src} alt={product.title} className="product-image" />
                    </a>
                  ) : (
                    <img src={product.media.src} alt={product.title} className="product-image" />
                  )
                )}
                {product.media.type === 'iframe' && (
                  <iframe 
                    src={product.media.src}
                    className="product-image"
                    style={{ border: 'none', aspectRatio: '16/9', width: '100%' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={product.title}
                  />
                )}
              </motion.div>

              <motion.div 
                className="product-text"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="product-year">{product.tag}</span>
                <h3 className="product-title">
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    {product.title}
                  </a>
                </h3>
                <p className="product-desc">{product.description}</p>
                
                <div className="product-footer" style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span className="product-date" style={{ fontSize: '0.9rem', color: 'var(--color-accent)' }}>{product.date}</span>
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="product-visit-pill">
                    Visit <ExternalLink size={14} />
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
