import { useReducedMotion } from 'framer-motion';

/**
 * Scroll-reveal props for a motion element.
 *
 * When the visitor has asked for reduced motion this returns an empty object,
 * so the element renders at its natural resting state instead of starting at
 * opacity 0 and waiting for an animation frame that should not run.
 *
 * Call it once per component and spread the result — it must not be called
 * inside a .map() callback.
 */
export function useReveal({ y = 30, delay = 0, duration = 1 } = {}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return {};

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration, delay },
  };
}

/**
 * Same contract for elements that animate on mount rather than on scroll.
 */
export function useEntrance({ y = 0, opacity = 0, delay = 0, duration = 1 } = {}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return {};

  return {
    initial: { opacity, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  };
}
