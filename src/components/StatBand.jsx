import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';
import './StatBand.css';

/**
 * Four figures, every one traceable to copy already on the page.
 *
 * The counts are deliberately disjoint — 4 products and 6 ventures are
 * different sets, so a reader can add them without having to reconcile an
 * overlap. Order separates the two sixes.
 *
 * No duration figures: every entry is an outcome.
 */
const stats = [
  { value: '$240M', label: 'Export ops managed' },
  { value: '6', label: 'Countries advised' },
  { value: '4', label: 'Products shipped' },
  { value: '6', label: 'Ventures in flight' },
];

const StatBand = () => {
  const reveal = useReveal({ y: 20 });

  return (
    <section className="stat-band" aria-label="Career highlights">
      <motion.ul className="stat-band-list container" {...reveal}>
        {stats.map((stat) => (
          <li className="stat" key={stat.label}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </li>
        ))}
      </motion.ul>
    </section>
  );
};

export default StatBand;
