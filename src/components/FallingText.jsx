import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import './FallingText.css';

console.log('FallingText: Matter.js loaded:', !!Matter, Object.keys(Matter).slice(0, 5));

const FallingText = ({
  className = '',
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem'
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    console.log('FallingText: Component rendered with props:', { 
      text: text?.slice(0, 50) + '...', 
      trigger, 
      effectStarted,
      hasTextRef: !!textRef.current,
      hasContainerRef: !!containerRef.current
    });
  }, [text, trigger, effectStarted]);

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(' ');
    const newHTML = words
      .map(word => {
        const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ''}">${word}</span>`;
      })
      .join(' ');
    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  useEffect(() => {
    if (trigger === 'auto') {
      // Add delay to ensure DOM is fully loaded
      setTimeout(() => {
        console.log('FallingText: Auto trigger starting...');
        setEffectStarted(true);
      }, 3000); // Increased delay
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            console.log('FallingText: Scroll trigger activated');
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;

    console.log('FallingText: Effect started, initializing physics...');

    try {
      const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

      if (!Engine || !Render || !World || !Bodies) {
        console.error('FallingText: Matter.js modules not available');
        return;
      }

      if (!containerRef.current || !textRef.current) {
        console.error('FallingText: Container or text ref is null');
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const width = containerRect.width;
      const height = containerRect.height;

      console.log('FallingText: Container dimensions:', { width, height });

      if (width <= 0 || height <= 0) {
        console.error('FallingText: Invalid container dimensions');
        // Retry after a short delay
        setTimeout(() => {
          setEffectStarted(false);
          setTimeout(() => setEffectStarted(true), 100);
        }, 500);
        return;
      }

      const engine = Engine.create();
      engine.world.gravity.y = gravity;

      // Clear any existing canvas
      if (canvasContainerRef.current) {
        canvasContainerRef.current.innerHTML = '';
      }

      const render = Render.create({
        element: canvasContainerRef.current,
        engine,
        options: {
          width,
          height,
          background: backgroundColor,
          wireframes,
          showVelocity: false,
          showAngleIndicator: false
        }
      });

      const boundaryOptions = {
        isStatic: true,
        render: { fillStyle: 'transparent' }
      };
      const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
      const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
      const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
      const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

      const wordSpans = textRef.current.querySelectorAll('.word');
      console.log('FallingText: Found', wordSpans.length, 'word spans');

      if (wordSpans.length === 0) {
        console.error('FallingText: No word spans found');
        return;
      }

      const wordBodies = [...wordSpans].map((elem, index) => {
        const rect = elem.getBoundingClientRect();

        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;

        console.log(`Word "${elem.textContent}": x=${x}, y=${y}`);

        const body = Bodies.rectangle(x, y, Math.max(rect.width, 10), Math.max(rect.height, 10), {
          render: { fillStyle: 'transparent' },
          restitution: 0.8,
          frictionAir: 0.01,
          friction: 0.2
        });

        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 5,
          y: 0
        });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
        return { elem, body };
      });

      wordBodies.forEach(({ elem, body }) => {
        elem.style.position = 'absolute';
        elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
        elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
        elem.style.transform = 'none';
        elem.style.zIndex = '10';
      });

      const mouse = Mouse.create(containerRef.current);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          render: { visible: false }
        }
      });
      render.mouse = mouse;

      World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      console.log('FallingText: Physics engine started');

      let animationId;
      const updateLoop = () => {
        wordBodies.forEach(({ body, elem }) => {
          const { x, y } = body.position;
          elem.style.left = `${x}px`;
          elem.style.top = `${y}px`;
          elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        });
        Matter.Engine.update(engine);
        animationId = requestAnimationFrame(updateLoop);
      };
      updateLoop();

      return () => {
        console.log('FallingText: Cleaning up physics');
        if (animationId) cancelAnimationFrame(animationId);
        Render.stop(render);
        Runner.stop(runner);
        if (render.canvas && canvasContainerRef.current && canvasContainerRef.current.contains(render.canvas)) {
          canvasContainerRef.current.removeChild(render.canvas);
        }
        World.clear(engine.world);
        Engine.clear(engine);
      };
    } catch (error) {
      console.error('FallingText: Error in physics setup:', error);
    }
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{
          fontSize: fontSize,
          lineHeight: 1.4
        }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;