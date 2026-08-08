import confetti from 'canvas-confetti';

export const triggerTropicalConfetti = () => {
  // Tropical color scheme: Sunny Yellow (#F4C430), Magenta Pink (#E91E63), Lush Green (#0D3B2E), Coral
  const colors = ['#F4C430', '#E91E63', '#0D3B2E', '#2E7D32', '#FFD9DE'];

  // Left burst
  confetti({
    particleCount: 60,
    angle: 60,
    spread: 55,
    origin: { x: 0.1, y: 0.7 },
    colors
  });

  // Right burst
  confetti({
    particleCount: 60,
    angle: 120,
    spread: 55,
    origin: { x: 0.9, y: 0.7 },
    colors
  });

  // Center celebration cannon
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors
    });
  }, 200);
};
