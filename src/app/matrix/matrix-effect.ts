export function initializeMatrixEffect() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*';

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, index) => {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      const x = index * fontSize;

      ctx.fillText(text, x, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[index] = 0;
      }

      drops[index]++;
    });

    requestAnimationFrame(drawMatrix);
  }

  drawMatrix();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
