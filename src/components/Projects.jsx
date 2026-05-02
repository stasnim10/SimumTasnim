import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import './Projects.css';

const projects = [
  {
    category: "Supply Chain · Decathlon Bangladesh",
    period: "2023 – 2024",
    metric: "$50M",
    metricLabel: "Transformation Led",
    title: "Logistics Transformation",
    description: "Led Decathlon Bangladesh's largest-ever supply chain initiative — 3PL optimization, digital systems integration, and supplier performance overhaul across the entire national logistics network. Delivered 15% cost reduction and $500K in annual savings.",
    tags: ["3PL Optimization", "Looker Studio", "Agile", "Supplier Performance"],
    link: "https://www.linkedin.com/company/decathlonbgd/",
    linkLabel: "View Company",
    image: "/assets/images/projects/project1_launchpad.jpg?v=20260501",
  },
  {
    category: "Global Consulting · 6 Countries",
    period: "2022 – 2023",
    metric: "$2M+",
    metricLabel: "Annual Cost Savings",
    title: "Global Supply Chain Consulting",
    description: "Coached teams across Egypt, Ethiopia, France, Sri Lanka, India, and Cambodia — improving supplier performance by 30% and reducing defect rates by 15% through capability building and operational tools.",
    tags: ["Global Consulting", "Capability Building", "Vendor Management"],
    link: "https://sustainability.decathlon.com/",
    linkLabel: "View Impact",
    image: "/assets/images/projects/project2_transformation.jpg?v=20260501",
  },
  {
    category: "Healthcare · Therapprove",
    period: "2025",
    metric: "$500K",
    metricLabel: "Pre-Seed Raise Supported",
    title: "Healthcare Platform Redesign",
    description: "Redesigned patient scheduling and provider matching UX — cutting booking time by 20% and improving match rates by 25%. Co-developed the investor materials that supported a successful $500K pre-seed raise.",
    tags: ["UX", "Product", "Healthcare", "Financial Modeling"],
    link: "https://therapprove.com/",
    linkLabel: "View Platform",
    image: "/assets/images/projects/project4_scheduling.jpg?v=20260501",
  },
  {
    category: "Strategy · PROJXON",
    period: "2025",
    metric: "3",
    metricLabel: "Client Playbooks Shipped",
    title: "Founder's Blueprint & DTC Launch",
    description: "Delivered three executive-ready strategy playbooks driving a 12% client sales lift. Led end-to-end DTC supply chain for Zephyr Aero Leather — from supplier sourcing through 3 prototype rounds to 60% target gross margin pricing.",
    tags: ["Strategy", "E-Commerce", "Supply Chain", "Unit Economics"],
    link: "https://www.projxon.com/",
    linkLabel: "View Firm",
    image: "/assets/images/projects/project3_blueprint.jpg?v=20260501",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Projects = () => {
  const [hero, ...secondary] = projects;

  return (
    <section id="projects" className="projects-section">
      <div className="container">

        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <div className="section-subtitle">Curated Work</div>
          <h2 className="section-title">Case Studies</h2>
          <p className="section-intro">High-impact execution across supply chain, product, and strategy.</p>
          <div className="thin-line"></div>
        </motion.div>

        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* ── Hero Card ── */}
          <motion.div className="bento-card bento-hero" variants={itemVariants}>
            <div className="bento-hero-image-wrap">
              <img src={hero.image} alt={hero.title} className="bento-img" />
              <div className="bento-hero-metric">
                <span className="hero-metric-number">{hero.metric}</span>
                <span className="hero-metric-label">{hero.metricLabel}</span>
              </div>
            </div>

            <div className="bento-hero-body">
              <div className="bento-meta">
                <span className="bento-category">{hero.category}</span>
                <span className="bento-period">{hero.period}</span>
              </div>
              <h3 className="bento-title">{hero.title}</h3>
              <p className="bento-desc">{hero.description}</p>
              <div className="bento-footer">
                <div className="bento-tags">
                  {hero.tags.map((tag, i) => (
                    <span key={i} className="bento-tag">{tag}</span>
                  ))}
                </div>
                <a href={hero.link} target="_blank" rel="noopener noreferrer" className="bento-pill">
                  {hero.linkLabel} <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Secondary Cards ── */}
          <div className="bento-secondary-row">
            {secondary.map((project, i) => (
              <motion.div key={i} className="bento-card bento-secondary" variants={itemVariants}>
                <div className="bento-secondary-image-wrap">
                  <img src={project.image} alt={project.title} className="bento-img" />
                </div>

                <div className="bento-secondary-body">
                  <div className="bento-meta">
                    <span className="bento-category">{project.category}</span>
                    <span className="bento-period">{project.period}</span>
                  </div>
                  <div className="secondary-metric-wrap">
                    <span className="secondary-metric-number">{project.metric}</span>
                    <span className="secondary-metric-label">{project.metricLabel}</span>
                  </div>
                  <h3 className="bento-title">{project.title}</h3>
                  <p className="bento-desc">{project.description}</p>
                  <div className="bento-footer">
                    <div className="bento-tags">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="bento-tag">{tag}</span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="bento-icon-link">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
