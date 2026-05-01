import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import './Experience.css';

const SLIDE_INTERVAL = 3500;

const ImageCarousel = ({ images, title }) => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const startInterval = () => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  const goTo = (index) => {
    clearInterval(intervalRef.current);
    setCurrent(index);
    startInterval();
  };

  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = () => goTo((current + 1) % images.length);

  return (
    <div
      className="carousel-root"
      onMouseEnter={() => {
        setIsHovered(true);
        clearInterval(intervalRef.current);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        startInterval();
      }}
    >
      <div className="carousel-track">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${title} ${i + 1}`}
            className={`carousel-slide ${i === current ? 'active' : ''}`}
          />
        ))}
        <div className="gallery-image-overlay" />

        {images.length > 1 && (
          <>
            <button
              className={`carousel-arrow carousel-arrow-left ${isHovered ? 'visible' : ''}`}
              onClick={prev}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className={`carousel-arrow carousel-arrow-right ${isHovered ? 'visible' : ''}`}
              onClick={next}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const experiences = [
  {
    period: "Jan 2026 – Present",
    org: "Apple Developer Program · Google Play Console",
    title: "Founder & Product Developer",
    description: "Built and shipped three live digital products entirely independently — from first concept through UX design, development, App Store submission, and post-launch iteration. Each product solves a real need with a distinct audience.",
    highlights: [
      { value: "3", label: "Live Products" },
      { value: "iOS + Android + Web", label: "Platforms" },
      { value: "100%", label: "Solo Built" },
    ],
    bullets: [
      "Zikr on the Go — Mindfulness & Zikr-tracking app for Muslim users; deployed on App Store & Google Play via TestFlight beta and live launch",
      "Case Quest — EdTech web platform helping MBA candidates prep for case interviews with structured frameworks and usage analytics",
      "Resume on the Go — AI-powered resume builder using generative AI to help job seekers tailor and optimize resumes fast",
      "Owned full lifecycle: product vision → UX flows → sprint delivery → analytics instrumentation → continuous iteration",
    ],
    tags: ["Product Strategy", "UX Design", "iOS/Android", "AI Integration", "Sprint Delivery"],
    images: ["/assets/images/experience/Founder_Product Developer.jpg"],
  },
  {
    period: "Oct 2025 – Present",
    org: "USOTG LLC",
    title: "Founder & CEO",
    description: "Founded and operate a federally trademarked Amazon brand from the ground up — handling every dimension from legal formation to live product launches in under six months.",
    highlights: [
      { value: "2", label: "Product Launches" },
      { value: "<6 mo", label: "Concept to Live" },
      { value: "Federal", label: "Trademark Registered" },
    ],
    bullets: [
      "Formed USOTG LLC, registered federal trademark, set up business banking and operational infrastructure",
      "Sourced and vetted suppliers; managed prototype rounds, packaging specs, and Amazon FBA compliance",
      "Built brand identity from scratch: name, logo, visual language, A+ content, and Amazon Brand Store",
      "Launched and managed PPC campaigns (Sponsored Products & Brands); tracked P&L, cash flow, and IPI health",
      "Successfully launched two products in April 2026, managing full go-to-market from sourcing to live listing",
    ],
    tags: ["E-Commerce", "Supply Chain", "Brand Building", "Amazon FBA", "P&L Management"],
    images: ["/assets/images/experience/USOTG_CEO.jpg"],
  },
  {
    period: "Aug 2024 – Present",
    org: "University of Rochester – Simon Business School",
    title: "VP of Academic Affairs & MBA Team Coach",
    description: "Elected VP of Academic Affairs by peers to represent MBA student interests to school leadership, while simultaneously coaching first-year teams and driving AI adoption across campus as a Perplexity Campus Partner.",
    highlights: [
      { value: "5", label: "Teammates Coached" },
      { value: "VP", label: "Elected by Peers" },
      { value: "AI Adoption", label: "Campus Leader" },
    ],
    bullets: [
      "Elected VP of Academic Affairs — acted as liaison between students and faculty; led policy discussions improving grading transparency and advising quality",
      "Coach for a first-year MBA team of 5 (Class of 2027) in GBA 419: Leading Teams — facilitated weekly sessions, 1:1s, Team Contracts, and CliftonStrengths application",
      "Selected for Perplexity AI's exclusive Campus Partner Program — drove adoption through peer outreach, workshops, and events",
      "Organized student-teacher meetup events and led academic experience improvement initiatives",
    ],
    tags: ["Leadership", "Coaching", "Student Advocacy", "AI Tools", "Facilitation"],
    images: ["/assets/images/experience/VP_MBA Team Coach.jpg"],
  },
  {
    period: "Jun – Aug 2025",
    org: "PROJXON · Therapprove",
    title: "Strategy & Operations Consultant",
    description: "Dual consulting internship — led client strategy work at PROJXON across retail, tech, and healthcare, while delivering a product release at Therapprove that directly contributed to a $500K pre-seed raise.",
    highlights: [
      { value: "12%", label: "Client Sales Lift" },
      { value: "20%", label: "Booking Time Reduced" },
      { value: "$500K", label: "Pre-Seed Supported" },
    ],
    bullets: [
      "Led three client assessments over 12 weeks at PROJXON — structured problems, built data models, benchmarked competitors, and delivered executive-ready playbooks adopted by client teams",
      "Built end-to-end DTC e-commerce supply chain for Zephyr Aero Leather: shortlisted 3 suppliers across 2 countries, managed 3 prototype rounds, set pricing targeting 60% launch gross margin",
      "At Therapprove, delivered a six-week product release that cut booking time by 20% and improved patient–provider match rates by 25% across 3 pilot regions",
      "NPS rose 15 points post-release; partnered with CEO on investor materials (market sizing + 5-year financial model) supporting $500K pre-seed fundraise",
    ],
    tags: ["Strategy Consulting", "E-Commerce", "Healthcare", "Financial Modeling", "Product Release"],
    links: [
      { text: "Health Tech Reflections", url: "https://www.linkedin.com/pulse/health-tech-heart-reflecting-my-internship-simum-tasnim-yfnmc" },
      { text: "Consulting Reflections", url: "https://www.linkedin.com/pulse/reflecting-my-consulting-internship-projxon-simum-tasnim-lpwxc" }
    ],
    images: [
      "/assets/images/experience/Strategy_Operations.jpg",
      "/assets/images/experience/Strategy_Operations 2.jpg",
      "/assets/images/experience/Strategy_Operations 3.jpg"
    ],
  },
  {
    period: "Dec 2023 – Jun 2024",
    org: "Decathlon Bangladesh",
    title: "Country Project Manager",
    description: "Promoted to lead a $50M nationwide logistics transformation — the largest supply chain initiative in Decathlon Bangladesh's history — covering 3PL optimization, digital systems integration, and supplier performance overhaul.",
    highlights: [
      { value: "$50M", label: "Transformation Led" },
      { value: "$500K", label: "Annual Savings" },
      { value: "15%", label: "Cost Reduction" },
    ],
    bullets: [
      "Led $50M nationwide logistics transformation: 3PL optimization, digital systems integration, and supplier performance overhaul",
      "Reduced logistics costs by 15% → $500,000 in annual savings through structured supplier performance tracking",
      "Launched Looker Studio dashboard for real-time data visualization and data-driven decision-making",
      "Strengthened supplier accountability through rollout of digital performance tools across the network",
    ],
    tags: ["Project Management", "Logistics Transformation", "3PL", "Data Visualization", "Supplier Management"],
    images: [
      "/assets/images/experience/Country Project Manager.jpg",
      "/assets/images/experience/Country Project Manager 2.jpg",
    ],
  },
  {
    period: "Jul 2019 – Nov 2023",
    org: "Decathlon — Bangladesh · 6 Countries",
    title: "Supply Chain Leader",
    description: "Five years of progressive leadership at Decathlon — from managing $240M in export operations to becoming a global supply chain consultant coaching teams across six countries and building systems that delivered $2M+ in annual savings.",
    highlights: [
      { value: "$240M", label: "Operations Managed" },
      { value: "$2M+", label: "Annual Cost Savings" },
      { value: "6", label: "Countries Coached" },
    ],
    bullets: [
      "Managed export lanes handling 8,000+ TEUs annually with $240M in business value to Europe and North America",
      "As Supply Chain Consultant, improved supplier performance by 30% and reduced defect rates by 15% across 6 countries (Egypt, Ethiopia, France, Sri Lanka, India, Cambodia)",
      "Executed Bangladesh's first shipment through Mongla Port — reduced lead time by 20%; initiated country's first Milkrun CY Load factory shipment",
      "Launched Bangladesh's first logistics performance dashboard and Logistics Learning School — autonomous online platform for teammates",
      "Co-led Supplier Commercial & Logistics Cost Savings Project → ~$470K in yearly savings (2021); awarded Outstanding Performer of the Year 2022 & 2023",
      "Crisis leadership: maintained supply continuity to Europe & North America during Covid-19 ($150M stake), finishing the year without a single premium container purchase",
    ],
    tags: ["Supply Chain", "Global Operations", "Freight Management", "Capability Building", "Cost Optimization"],
    images: [
      "/assets/images/experience/Supply Chain Leader.jpg",
      "/assets/images/experience/Supply Chain Leader 2.jpg",
      "/assets/images/experience/Supply Chain Leader 3.jpg",
      "/assets/images/experience/Supply Chain Leader 4.jpg",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="container">

        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <div className="section-subtitle">Career Story</div>
          <h2 className="section-title">Exhibition of Experience</h2>
          <p className="section-intro">Six chapters of work — from $240M supply chains to independently shipped digital products.</p>
          <div className="thin-line"></div>
        </motion.div>

        <div className="experience-gallery">
          {experiences.map((exp, index) => (
            <div key={index} className={`gallery-item ${index % 2 !== 0 ? 'reverse' : ''}`}>

              <motion.div
                className="gallery-image-container"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2 }}
              >
                <ImageCarousel images={exp.images} title={exp.title} />
              </motion.div>

              <motion.div
                className="gallery-text"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="gallery-org">{exp.org}</span>
                <span className="gallery-year">{exp.period}</span>
                <h3 className="gallery-title">{exp.title}</h3>
                <p className="gallery-desc">{exp.description}</p>

                <div className="gallery-highlights">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="highlight-item">
                      <span className="highlight-value">{h.value}</span>
                      <span className="highlight-label">{h.label}</span>
                    </div>
                  ))}
                </div>

                <ul className="gallery-bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>

                <div className="gallery-tags">
                  {exp.tags.map((tag, i) => (
                    <span key={i} className="gallery-tag">{tag}</span>
                  ))}
                </div>

                {exp.links && exp.links.length > 0 && (
                  <div className="gallery-links" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {exp.links.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="gallery-link-pill">
                        {link.text} <ExternalLink size={14} />
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
