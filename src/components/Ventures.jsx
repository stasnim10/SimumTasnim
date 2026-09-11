import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';
import './Ventures.css';

/**
 * Ventures sits below Case Studies inside the same #projects section, so no
 * nav item, route or anchor changes.
 *
 * Descriptions are the owner's own wording. Status chips use an active-voice
 * register (Live / Shipped / Building / Launching) that states stage only —
 * no claim about revenue, users, or traction.
 *
 * link and metric are deliberately absent until real values exist; a
 * placeholder would read as fact.
 */
const ventures = [
  {
    title: 'ChargeBD',
    category: 'CleanTech',
    region: 'Bangladesh',
    period: '2026',
    status: 'Shipped',
    tone: 'shipped',
    description:
      'Full-stack bilingual EV charging PWA — map discovery, reservations, live WebSocket sessions, wallet, and admin.',
    tags: ['Full-Stack', 'PWA', 'WebSockets', 'Bilingual', 'Payments'],
  },
  {
    title: 'Barakah Supply Chain',
    category: 'Consulting',
    region: 'Worldwide',
    period: '2026 – Present',
    status: 'Live',
    tone: 'shipped',
    description:
      'Co-founded. Targets Amazon sellers across the EU, the Americas, and the GCC.',
    tags: ['Co-Founded', 'Amazon', 'Supply Chain'],
  },
  {
    title: 'Barakah EPC Solution',
    category: 'Consulting',
    region: 'Worldwide',
    period: '2026 – Present',
    status: 'Live',
    tone: 'shipped',
    description: 'Program management. Sister line to Barakah Supply Chain.',
    tags: ['Program Management'],
  },
  {
    title: 'EV Charging Infrastructure',
    category: 'EV Infrastructure',
    region: 'Bangladesh',
    period: '2026',
    status: 'Shipped',
    tone: 'shipped',
    description:
      'Market research, supplier evaluation, and business planning to define a viable EV charging deployment model for Bangladesh, delivered as a scalable infrastructure strategy and roadmap.',
    tags: ['Market Research', 'Supplier Evaluation', 'Business Planning'],
  },
  {
    title: 'Saudi Supply Chain Consulting',
    category: 'Consulting',
    region: 'Saudi Arabia',
    period: '2026 – Present',
    status: 'Launching',
    tone: 'early',
    description: 'Partnership with Infostream.',
    tags: ['Partnership'],
  },
  {
    title: 'Show Me on AI',
    category: 'AI SaaS',
    region: 'United States',
    period: '2026 – Present',
    status: 'Building',
    tone: 'early',
    description:
      'An AI platform that audits how a brand appears and is cited across AI answer engines, surfacing where and how a business gets recommended.',
    tags: ['AI Answer Engines', 'Brand Audit', 'SaaS'],
  },
];

const shipped = ventures.filter((v) => v.tone === 'shipped');
const early = ventures.filter((v) => v.tone === 'early');

function VentureCard({ venture }) {
  return (
    <article className={`venture-card venture-card--${venture.tone}`}>
      <span className={`venture-status venture-status--${venture.tone}`}>{venture.status}</span>
      <h4 className="venture-title">{venture.title}</h4>
      <p className="venture-meta">
        {venture.category} <span aria-hidden="true">·</span> {venture.region}
        {venture.period && (
          <>
            {' '}
            <span aria-hidden="true">·</span> {venture.period}
          </>
        )}
      </p>
      {venture.description && <p className="venture-desc">{venture.description}</p>}
      {venture.tags.length > 0 && (
        <div className="venture-tags">
          {venture.tags.map((tag) => (
            <span key={tag} className="venture-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

const Ventures = () => {
  const revealHeader = useReveal({ y: 24 });
  const revealShipped = useReveal({ y: 24, delay: 0.1 });
  const revealEarly = useReveal({ y: 24, delay: 0.2 });

  return (
    <div className="ventures">
      <motion.div className="ventures-header" {...revealHeader}>
        <div className="section-subtitle">Ventures</div>
        <h3 className="ventures-title">Built and Building</h3>
      </motion.div>

      <motion.div className="ventures-grid" {...revealShipped}>
        {shipped.map((v) => (
          <VentureCard key={v.title} venture={v} />
        ))}
      </motion.div>

      <motion.div className="ventures-early" {...revealEarly}>
        <p className="ventures-divider">In development</p>
        <div className="ventures-grid">
          {early.map((v) => (
            <VentureCard key={v.title} venture={v} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Ventures;
