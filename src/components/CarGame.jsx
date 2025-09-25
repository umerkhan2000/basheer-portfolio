import React, { useCallback, useEffect, useRef, useState } from 'react';

const PLAYER_RADIUS = 20;
const START_LIVES = 3;
const OBSTACLE_BASE_SPEED = 160;
const PICKUP_BASE_SPEED = 110;
const BEST_SCORE_STORAGE_KEY = 'arcade_game_best_score_v1';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getInitialBestScore = () => {
  if (typeof window === 'undefined') return 0;
  const raw = window.localStorage.getItem(BEST_SCORE_STORAGE_KEY);
  const parsed = Number.parseInt(raw ?? '0', 10);
  return Number.isFinite(parsed) ? parsed : 0;
};

const drawBackground = (ctx, width, height) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#0f172a');
  gradient.addColorStop(1, '#020617');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = '#38bdf8';
  for (let x = 0; x < width; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 80) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
};

const drawTrail = (ctx, trail) => {
  if (!trail.length) return;
  ctx.save();
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.beginPath();
  trail.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.stroke();
  ctx.restore();
};

const drawPlayer = (ctx, player) => {
  if (!player) return;
  drawTrail(ctx, player.trail);

  ctx.save();
  ctx.shadowBlur = player.invulnerable > 0 ? 30 : 18;
  ctx.shadowColor = player.invulnerable > 0 ? '#bae6fd' : '#38bdf8';
  const gradient = ctx.createRadialGradient(
    player.x,
    player.y - player.radius * 0.4,
    player.radius * 0.2,
    player.x,
    player.y,
    player.radius
  );
  gradient.addColorStop(0, '#e0f2fe');
  gradient.addColorStop(1, '#0ea5e9');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const drawObstacle = (ctx, obstacle) => {
  ctx.save();
  ctx.translate(obstacle.x, obstacle.y);
  ctx.rotate(obstacle.rotation);
  const gradient = ctx.createLinearGradient(-obstacle.width / 2, 0, obstacle.width / 2, 0);
  gradient.addColorStop(0, 'rgba(251, 146, 60, 0.1)');
  gradient.addColorStop(0.5, 'rgba(248, 113, 113, 0.85)');
  gradient.addColorStop(1, 'rgba(251, 146, 60, 0.1)');
  ctx.fillStyle = gradient;
  ctx.shadowBlur = 30;
  ctx.shadowColor = 'rgba(248, 113, 113, 0.8)';
  ctx.fillRect(-obstacle.width / 2, -obstacle.height / 2, obstacle.width, obstacle.height);
  ctx.restore();
};

const drawPickup = (ctx, pickup) => {
  ctx.save();
  ctx.shadowBlur = 25;
  ctx.shadowColor = 'rgba(250, 204, 21, 0.9)';
  const gradient = ctx.createRadialGradient(pickup.x, pickup.y, 4, pickup.x, pickup.y, pickup.radius);
  gradient.addColorStop(0, '#fef9c3');
  gradient.addColorStop(1, '#facc15');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(pickup.x, pickup.y, pickup.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

export default function ArcadeGame({ onSectionChange }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const animationRef = useRef(null);

  const playerRef = useRef(null);
  const obstaclesRef = useRef([]);
  const pickupsRef = useRef([]);
  const keysRef = useRef({ up: false, down: false, left: false, right: false });
  const lastFrameRef = useRef(0);
  const spawnTimersRef = useRef({ obstacle: 0, pickup: 1.8 });

  const scoreRef = useRef(0);
  const displayedScoreRef = useRef(0);
  const livesRef = useRef(START_LIVES);
  const statusRef = useRef('ready');
  const bestScoreRef = useRef(0);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => getInitialBestScore());
  const [lives, setLives] = useState(START_LIVES);
  const [status, setStatus] = useState('ready');
  const [message, setMessage] = useState('Use WASD or Arrow keys to dodge the neon hazards and grab energy orbs.');

  bestScoreRef.current = bestScore;

  useEffect(() => {
    if (onSectionChange) {
      onSectionChange(null);
    }
  }, [onSectionChange]);

  const updateBestScore = useCallback((maybeNewValue) => {
    const rounded = Math.max(0, Math.floor(maybeNewValue));
    if (rounded <= bestScoreRef.current) return;
    setBestScore(rounded);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(BEST_SCORE_STORAGE_KEY, String(rounded));
      } catch (err) {
        // ignore storage errors
      }
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const width = parent?.clientWidth ?? window.innerWidth;
    const height = parent?.clientHeight ?? window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }, []);

  const resetPlayer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const speedBase = Math.min(canvas.width, canvas.height);
    playerRef.current = {
      x: canvas.width / 2,
      y: canvas.height - 140,
      radius: PLAYER_RADIUS,
      speed: clamp(speedBase * 0.45, 220, 480),
      trail: [],
      invulnerable: 0
    };
  }, []);

  const resetGame = useCallback(() => {
    resizeCanvas();
    resetPlayer();
  scoreRef.current = 0;
  displayedScoreRef.current = 0;
  setScore(0);
    livesRef.current = START_LIVES;
    setLives(START_LIVES);
    spawnTimersRef.current = { obstacle: 0, pickup: 2 };
    obstaclesRef.current = [];
    pickupsRef.current = [];
    setStatus('playing');
    statusRef.current = 'playing';
    setMessage('Stay alive and collect glowing energy orbs!');
    lastFrameRef.current = performance.now();
  }, [resetPlayer, resizeCanvas]);

  const handleGameOver = useCallback(() => {
    setStatus('game-over');
    statusRef.current = 'game-over';
    setMessage('Game Over! Press R, Space, or tap to restart.');
    updateBestScore(scoreRef.current);
  }, [updateBestScore]);

  const loop = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const player = playerRef.current;
    if (!canvas || !ctx || !player) return;

    const width = canvas.width;
    const height = canvas.height;
    const delta = clamp((timestamp - lastFrameRef.current) / 1000, 0, 0.05);
    lastFrameRef.current = timestamp;

    drawBackground(ctx, width, height);

    const currentStatus = statusRef.current;

    if (currentStatus === 'playing') {
      player.invulnerable = Math.max(0, player.invulnerable - delta);

      const velocity = player.speed * delta;
      if (keysRef.current.left) player.x -= velocity;
      if (keysRef.current.right) player.x += velocity;
      if (keysRef.current.up) player.y -= velocity;
      if (keysRef.current.down) player.y += velocity;
      player.x = clamp(player.x, player.radius + 16, width - player.radius - 16);
      player.y = clamp(player.y, player.radius + 16, height - player.radius - 16);

      player.trail.unshift({ x: player.x, y: player.y });
      if (player.trail.length > 16) player.trail.pop();

      scoreRef.current += delta * 14 * (1 + scoreRef.current / 600);
      const displayScore = Math.floor(scoreRef.current);
      if (displayScore !== displayedScoreRef.current) {
        displayedScoreRef.current = displayScore;
        setScore(displayScore);
      }

      const difficulty = 1 + scoreRef.current / 400;
      const obstacleInterval = Math.max(0.45, 1.1 / difficulty);
      const pickupInterval = Math.max(1.5, 3.6 / Math.sqrt(difficulty));
      spawnTimersRef.current.obstacle += delta;
      spawnTimersRef.current.pickup += delta;

      if (spawnTimersRef.current.obstacle >= obstacleInterval) {
        spawnTimersRef.current.obstacle = 0;
        obstaclesRef.current.push({
          x: width * (0.15 + Math.random() * 0.7),
          y: -60,
          width: 60 + Math.random() * 55,
          height: 18 + Math.random() * 26,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 1.5,
          vx: (Math.random() - 0.5) * 160 * difficulty,
          vy: (OBSTACLE_BASE_SPEED + Math.random() * 120) * difficulty
        });
      }

      if (spawnTimersRef.current.pickup >= pickupInterval) {
        spawnTimersRef.current.pickup = 0.4 + Math.random() * 0.6;
        pickupsRef.current.push({
          x: width * (0.1 + Math.random() * 0.8),
          y: -20,
          radius: 14 + Math.random() * 8,
          vy: PICKUP_BASE_SPEED + Math.random() * 60
        });
      }

      const nextObstacles = [];
      for (const obstacle of obstaclesRef.current) {
        obstacle.x += obstacle.vx * delta;
        obstacle.y += obstacle.vy * delta;
        obstacle.rotation += obstacle.rotationSpeed * delta;

        if (
          obstacle.y > height + obstacle.height ||
          obstacle.x < -200 ||
          obstacle.x > width + 200
        ) {
          continue;
        }

        const dx = obstacle.x - player.x;
        const dy = obstacle.y - player.y;
        const distanceSq = dx * dx + dy * dy;
        const collisionRadius = Math.max(obstacle.width, obstacle.height) * 0.5 + player.radius * 0.8;

        if (distanceSq < collisionRadius * collisionRadius && player.invulnerable <= 0) {
          player.invulnerable = 1.1;
          const remainingLives = livesRef.current - 1;
          livesRef.current = remainingLives;
          setLives(remainingLives);
          setMessage(remainingLives > 0 ? 'Ouch! Avoid the hazard.' : 'Game Over! Press R or tap to restart.');
          if (remainingLives <= 0) {
            handleGameOver();
            break;
          }
          continue;
        }

        nextObstacles.push(obstacle);
      }
      obstaclesRef.current = nextObstacles;

      const nextPickups = [];
      for (const pickup of pickupsRef.current) {
        pickup.y += pickup.vy * delta;
        if (pickup.y < height + pickup.radius) {
          const dx = pickup.x - player.x;
          const dy = pickup.y - player.y;
          const distance = Math.hypot(dx, dy);
          if (distance < pickup.radius + player.radius * 0.9) {
            scoreRef.current += 80;
            const displayScoreAfterPickup = Math.floor(scoreRef.current);
            if (displayScoreAfterPickup !== displayedScoreRef.current) {
              displayedScoreRef.current = displayScoreAfterPickup;
              setScore(displayScoreAfterPickup);
            }
            setMessage('Nice! Energy boost collected.');
            continue;
          }
          nextPickups.push(pickup);
        }
      }
      pickupsRef.current = nextPickups;
    }

    for (const obstacle of obstaclesRef.current) {
      drawObstacle(ctx, obstacle);
    }
    for (const pickup of pickupsRef.current) {
      drawPickup(ctx, pickup);
    }

    drawPlayer(ctx, player);

    animationRef.current = window.requestAnimationFrame(loop);
  }, [handleGameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    resizeCanvas();
    resetGame();

    const handleResize = () => {
      resizeCanvas();
      if (playerRef.current) {
        playerRef.current.x = canvas.width / 2;
        playerRef.current.y = clamp(playerRef.current.y, playerRef.current.radius + 16, canvas.height - 120);
      }
    };

    const handleKeyDown = (event) => {
      if (event.repeat) return;
      if (['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
      switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
          keysRef.current.left = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          keysRef.current.right = true;
          break;
        case 'ArrowUp':
        case 'KeyW':
          keysRef.current.up = true;
          break;
        case 'ArrowDown':
        case 'KeyS':
          keysRef.current.down = true;
          break;
        case 'Space':
          event.preventDefault();
          if (statusRef.current === 'playing') {
            setStatus('paused');
            statusRef.current = 'paused';
            setMessage('Paused — press Space to continue.');
          } else if (statusRef.current === 'paused') {
            setStatus('playing');
            statusRef.current = 'playing';
            setMessage('Back in action!');
            lastFrameRef.current = performance.now();
          } else if (statusRef.current === 'game-over') {
            resetGame();
          }
          break;
        case 'KeyR':
          resetGame();
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
          keysRef.current.left = false;
          break;
        case 'ArrowRight':
        case 'KeyD':
          keysRef.current.right = false;
          break;
        case 'ArrowUp':
        case 'KeyW':
          keysRef.current.up = false;
          break;
        case 'ArrowDown':
        case 'KeyS':
          keysRef.current.down = false;
          break;
        default:
          break;
      }
    };

    const handlePointer = () => {
      if (statusRef.current === 'game-over' || statusRef.current === 'paused' || statusRef.current === 'ready') {
        resetGame();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('pointerdown', handlePointer);

    animationRef.current = window.requestAnimationFrame((time) => {
      lastFrameRef.current = time;
      loop(time);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('pointerdown', handlePointer);
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [loop, resetGame, resizeCanvas]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'radial-gradient(circle at top, rgba(59, 130, 246, 0.12), rgba(2, 6, 23, 1))'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: status === 'game-over' ? 'pointer' : 'default'
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          background: 'rgba(2, 6, 23, 0.8)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          borderRadius: '999px',
          padding: '0.75rem 1.5rem',
          backdropFilter: 'blur(10px)',
          color: 'white',
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '0.95rem',
          zIndex: 10,
        }}
      >
        <span>⭐ Score: {score}</span>
        <span>🔥 Best: {bestScore}</span>
        <span>❤️ Lives: {lives}</span>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          maxWidth: '420px',
          padding: '1.2rem 1.5rem',
          background: 'rgba(15, 23, 42, 0.75)',
          borderRadius: '18px',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          color: 'rgba(226, 232, 240, 0.95)',
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '0.95rem',
          lineHeight: 1.5,
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.5)'
        }}
      >
        <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '0.35rem' }}>
          ⚡ Neon Drift Arcade
        </div>
        <div>{message}</div>
        <div style={{ marginTop: '0.6rem', fontSize: '0.85rem', opacity: 0.8 }}>
          Move with <strong>WASD</strong> / arrow keys · <strong>Space</strong> to pause · <strong>R</strong> to restart
        </div>
      </div>

      {status === 'game-over' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.2rem',
            background: 'linear-gradient(120deg, rgba(15, 23, 42, 0.85), rgba(2, 6, 23, 0.92))',
            color: 'white',
            textAlign: 'center',
            fontFamily: '"Space Grotesk", sans-serif'
          }}
        >
          <div style={{ fontSize: '2.2rem', fontWeight: 700 }}>Game Over</div>
          <div style={{ fontSize: '1.1rem', opacity: 0.85 }}>Final Score: {score}</div>
          <button
            onClick={resetGame}
            style={{
              background: 'linear-gradient(135deg, #38bdf8, #22d3ee)',
              border: 'none',
              borderRadius: '999px',
              color: '#0f172a',
              padding: '0.85rem 2.6rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 12px 35px rgba(56, 189, 248, 0.45)'
            }}
          >
            Restart Run
          </button>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Press Space or tap anywhere to play again.</div>
        </div>
      )}
    </div>
  );
}
