import { useCallback, useSyncExternalStore } from 'react';

/**
 * Tracks a CSS media query from JS, so JS-driven effects can be gated on the
 * same breakpoints the stylesheets use.
 *
 * useSyncExternalStore is the right primitive here: matchMedia is an external
 * store, and reading it through a snapshot avoids both the stale-first-frame
 * problem and setting state from inside an effect.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () =>
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia(query).matches
        : false,
    [query]
  );

  // No DOM during prerender; callers treat false as "not desktop".
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
