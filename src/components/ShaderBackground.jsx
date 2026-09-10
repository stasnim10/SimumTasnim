import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import './ShaderBackground.css';

const ShaderBackground = () => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Guard BEFORE the dynamic import: when reduced motion is requested the
    // webgl-fluid chunk is never even downloaded, let alone executed.
    if (prefersReducedMotion || !canvasRef.current) return;

    let cancelled = false;
    let teardown = () => {};

    const start = async () => {
      const { default: webGLFluidEnhanced } = await import('webgl-fluid');
      if (cancelled || !canvasRef.current) return;

      webGLFluidEnhanced(canvasRef.current, {
        TRIGGER: 'hover',
        IMMEDIATE: true,
        AUTO: false,
        TRANSPARENT: true,
        BLOOM: false,
        SUNRAYS: false,
        SPLAT_RADIUS: 0.25,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLORFUL: true,
        DENSITY_DISSIPATION: 1.5,
        VELOCITY_DISSIPATION: 0.5,
      });

      // Forward pointer events so the fluid reacts even where UI covers the canvas.
      const forwardEvent = (e) => {
        if (!canvasRef.current) return;
        canvasRef.current.dispatchEvent(
          new MouseEvent(e.type, {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: false,
            cancelable: false,
          })
        );
      };

      window.addEventListener('mousemove', forwardEvent);
      window.addEventListener('touchmove', forwardEvent, { passive: true });
      window.addEventListener('touchstart', forwardEvent, { passive: true });

      teardown = () => {
        window.removeEventListener('mousemove', forwardEvent);
        window.removeEventListener('touchmove', forwardEvent);
        window.removeEventListener('touchstart', forwardEvent);
      };
    };

    // Decorative, so it waits for idle rather than competing with first paint.
    // Safari has no requestIdleCallback; fall back to a short timeout.
    const supportsIdle = typeof window.requestIdleCallback === 'function';
    const handle = supportsIdle
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : setTimeout(start, 200);

    return () => {
      cancelled = true;
      if (supportsIdle) window.cancelIdleCallback(handle);
      else clearTimeout(handle);
      teardown();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="shader-background" aria-hidden="true">
      <div className="shader-base-bg" />
      {!prefersReducedMotion && <canvas ref={canvasRef} className="shader-canvas" />}
      {/* Recolours the fluid: hue and saturation from this layer, luminance
          from the canvas beneath it. Swapped for a static wash on touch. */}
      <div className="shader-tint" />
      <div className="shader-wash" />
      <div className="grain" />
    </div>
  );
};

export default ShaderBackground;
