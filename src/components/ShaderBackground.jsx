import React, { useEffect, useRef } from 'react';
import webGLFluidEnhanced from 'webgl-fluid';
import './ShaderBackground.css';

const ShaderBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Initialize fluid simulation
      webGLFluidEnhanced(canvasRef.current, {
        TRIGGER: 'hover',
        IMMEDIATE: true,
        AUTO: false,
        TRANSPARENT: true,
        BLOOM: false, // Turn off bloom for sharp difference blending
        SUNRAYS: false,
        SPLAT_RADIUS: 0.25,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLORFUL: true,
        DENSITY_DISSIPATION: 1.5,
        VELOCITY_DISSIPATION: 0.5,
      });

      // Forward mouse events to canvas so the fluid works even when UI blocks the canvas
      const forwardEvent = (e) => {
        if (!canvasRef.current) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        // Create a fake event that the webgl-fluid listener can consume
        const fakeEvent = new MouseEvent(e.type, {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: false,
          cancelable: false
        });
        canvasRef.current.dispatchEvent(fakeEvent);
      };

      window.addEventListener('mousemove', forwardEvent);
      window.addEventListener('touchmove', forwardEvent, { passive: true });
      window.addEventListener('touchstart', forwardEvent, { passive: true });

      return () => {
        window.removeEventListener('mousemove', forwardEvent);
        window.removeEventListener('touchmove', forwardEvent);
        window.removeEventListener('touchstart', forwardEvent);
      };
    }
  }, []);

  return (
    <div className="shader-background">
      <div className="shader-base-bg"></div>
      <canvas ref={canvasRef} className="shader-canvas" />
    </div>
  );
};

export default ShaderBackground;
