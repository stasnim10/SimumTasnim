import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'simum-theme';

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // private browsing / storage disabled
  }
}

/**
 * The OS signal, or null when the OS expresses no preference.
 *
 * `prefers-color-scheme: dark` is false both for "light" and for "no
 * preference", so both queries are checked. Without this distinction the
 * no-signal case would silently resolve to light instead of the dark default.
 */
function getSystemPreference() {
  if (typeof window === 'undefined' || !window.matchMedia) return null;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return null;
}

export function useDarkMode() {
  const stored = getStoredTheme();

  // stored ?? system ?? 'dark' — dark is the identity default, but an OS-level
  // light preference is honoured. Light-on-dark text causes halation for
  // people with astigmatism, and many of them set OS light mode for that
  // reason; overriding it is not the same as picking a first-visit default.
  const [theme, setTheme] = useState(() => stored ?? getSystemPreference() ?? 'dark');

  // Whether this visitor has made an explicit choice. Inferring it from
  // localStorage does not work, because the apply-effect used to write there
  // on mount, which made the listener below dead code.
  const hasManualChoice = useRef(stored !== null);

  // Apply only. Persistence happens in toggle(), so a visitor who has never
  // touched the control keeps following their system setting.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!window.matchMedia) return;
    const dark = window.matchMedia('(prefers-color-scheme: dark)');
    const light = window.matchMedia('(prefers-color-scheme: light)');

    const handleChange = () => {
      if (hasManualChoice.current) return;
      setTheme(getSystemPreference() ?? 'dark');
    };

    dark.addEventListener('change', handleChange);
    light.addEventListener('change', handleChange);
    return () => {
      dark.removeEventListener('change', handleChange);
      light.removeEventListener('change', handleChange);
    };
  }, []);

  const toggle = () => {
    hasManualChoice.current = true;
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable — the choice still applies for this session */
      }
      return next;
    });
  };

  return { isDark: theme === 'dark', toggle };
}
