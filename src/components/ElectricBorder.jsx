import { useEffect, useId, useLayoutEffect, useRef } from 'react';

const ElectricBorder = ({ children, color = '#5227FF', speed = 1, chaos = 1, thickness = 2, className, style }) => {
  const rawId = useId().replace(/[:]/g, '');
  const filterId = `turbulent-displace-${rawId}`;
  const svgRef = useRef(null);
  const rootRef = useRef(null);
  const strokeRef = useRef(null);

  const updateAnim = () => {
    const svg = svgRef.current;
    const host = rootRef.current;
    if (!svg || !host) return;

    if (strokeRef.current) {
      strokeRef.current.style.filter = `url(#${filterId})`;
    }

    const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));
    const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));

    const dyAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dy"]'));
    if (dyAnims.length >= 2) {
      dyAnims[0].setAttribute('values', `${height}; 0`);
      dyAnims[1].setAttribute('values', `0; -${height}`);
    }

    const dxAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dx"]'));
    if (dxAnims.length >= 2) {
      dxAnims[0].setAttribute('values', `${width}; 0`);
      dxAnims[1].setAttribute('values', `0; -${width}`);
    }

    const baseDur = 6;
    const dur = Math.max(0.001, baseDur / (speed || 1));
    [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', `${dur}s`));

    const disp = svg.querySelector('feDisplacementMap');
    if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));

    const filterEl = svg.querySelector(`#${CSS.escape(filterId)}`);
    if (filterEl) {
      filterEl.setAttribute('x', '-200%');
      filterEl.setAttribute('y', '-200%');
      filterEl.setAttribute('width', '500%');
      filterEl.setAttribute('height', '500%');
    }

    requestAnimationFrame(() => {
      [...dyAnims, ...dxAnims].forEach(a => {
        if (typeof a.beginElement === 'function') {
          try {
            a.beginElement();
          } catch {
            console.warn('ElectricBorder: beginElement failed, this may be due to a browser limitation.');
          }
        }
      });
    });
  };

  useEffect(() => {
    updateAnim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, chaos]);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ro = new ResizeObserver(() => updateAnim());
    ro.observe(rootRef.current);
    updateAnim();
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const vars = {
    ['--electric-border-color']: color,
    ['--eb-border-width']: `${thickness}px`
  };

  const electricBorderStyles = {
    '--electric-light-color': `oklch(from ${color} l c h)`,
    '--eb-border-width': `${thickness}px`,
    position: 'relative',
    borderRadius: 'inherit',
    overflow: 'visible',
    isolation: 'isolate',
    ...vars,
    ...style
  };

  const ebSvgStyles = {
    position: 'fixed',
    left: '-10000px',
    top: '-10000px',
    width: '10px',
    height: '10px',
    opacity: '0.001',
    pointerEvents: 'none'
  };

  const ebContentStyles = {
    position: 'relative',
    borderRadius: 'inherit',
    zIndex: 1
  };

  const ebLayersStyles = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    zIndex: 2
  };

  const baseLayerStyles = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    boxSizing: 'border-box'
  };

  return (
    <div ref={rootRef} className={`electric-border ${className ?? ''}`} style={electricBorderStyles}>
      <svg ref={svgRef} className="eb-svg" aria-hidden focusable="false" style={ebSvgStyles}>
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      <div className="eb-layers" style={ebLayersStyles}>
        <div ref={strokeRef} className="eb-stroke" style={{ ...baseLayerStyles, border: `${thickness}px solid ${color}` }} />
        <div className="eb-glow-1" style={{ 
          ...baseLayerStyles, 
          border: `${thickness}px solid ${color}`, 
          opacity: 0.5,
          filter: `blur(${0.5 + thickness * 0.25}px)`
        }} />
        <div className="eb-glow-2" style={{ 
          ...baseLayerStyles, 
          border: `${thickness}px solid ${color}`, 
          opacity: 0.5,
          filter: `blur(${2 + thickness * 0.5}px)`
        }} />
        <div className="eb-background-glow" style={{ 
          ...baseLayerStyles, 
          zIndex: -1,
          transform: 'scale(1.08)',
          filter: 'blur(32px)',
          opacity: 0.3,
          background: `linear-gradient(-30deg, ${color}, transparent, ${color})`
        }} />
      </div>

      <div className="eb-content" style={ebContentStyles}>{children}</div>
    </div>
  );
};

export default ElectricBorder;