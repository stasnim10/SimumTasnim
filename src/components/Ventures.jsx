import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';
import './Ventures.css';

/**
 * Ventures sits below Case Studies inside the same #projects section, so no
 * nav item, route or anchor changes.
 *
 * Descriptions are the owner's own wording. Where none was supplied the card
 * renders without a paragraph rather than carrying invented copy — see the
 * TODO markers.
 */
const ventures = [
  {
    title: 'ChargeBD',
    category: 'CleanTech',
    region: 'Bangladesh',
    status: 'Delivered',
    tone: 'shipped',
    description:
      'Full-stack bilingual EV charging PWA — map discovery, reservations, live WebSocket sessions, wallet, and admin.',
    tags: ['Full-Stack', 'PWA', 'WebSockets', 'Bilingual', 'Payments'],
  },
  {
    title: 'Barakah Supply Chain',
    category: 'Consulting',
    region: 'Worldwide',
    status: 'Launched',
    tone: 'shipped',
    description:
      'Co-founded. Targets Amazon sellers across the EU, the Americas, and the GCC.',
    tags: ['Co-Founded', 'Amazon', 'Supply Chain'],
  },
  {
    title: 'Barakah EPC Solution',
    category: 'Consulting',
    region: 'Worldwide',
    status: 'Launched',
    tone: 'shipped',
    description: 'Program management. Sister line to Barakah Supply Chain.',
    tags: ['Program Management'],
  },
  {
    title: 'EV Charging Infrastructure',
    category: 'EV Infrastructure',
    region: 'Bangladesh',
    status: 'Strategy Delivered',
    tone: 'shipped',
    // TODO: description needed — no wording supplied. Pull Problem/Solution/Result
    // from the Career Data Library rather than writing new claims.
    description: null,
    tags: [],
  },
  {
    title: 'Saudi Supply Chain Consulting',
    category: 'Consulting',
    region: 'Saudi Arabia',
    status: 'MoU Signed · In Progress',
    tone: 'early',
    description: 'Partnership with Infostream.',
    tags: ['Partnership'],
  },
  {
    title: 'Show Me on AI',
    category: 'AI SaaS',
    region: 'United States',
    status: 'In Development',
    tone: 'early',
    // TODO: description needed — no wording supplied.
    description: null,
    tags: [],
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
