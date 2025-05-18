document.addEventListener('DOMContentLoaded', () => {
  const lines = document.querySelectorAll('.writing_line');

  lines.forEach((line) => {
    const lineWidth = line.offsetWidth;
    const blockWidth = 15;
    const blockCount = Math.floor(lineWidth / blockWidth);
    line.innerHTML = '';

    for (let i = 0; i < blockCount; i++) {
      const block = document.createElement('div');
      block.classList.add('writing_block');
      block.style.width = '15px';
      block.style.height = '0px';
      block.style.display = 'inline-block';
      block.style.verticalAlign = 'bottom';
      line.appendChild(block);
    }
  });

  const allLines = document.querySelectorAll('.writing_col_item');

  allLines.forEach((item) => {
    const blocks = Array.from(item.querySelectorAll('.writing_block'));

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const xPercent = (e.clientX - rect.left) / rect.width;

      gsap.to(blocks, {
        height: gsap.utils.distribute({
          base: -20,
          amount: -36,
          from: xPercent,
          ease: 'power4.in',
        }),
        opacity: gsap.utils.distribute({
          base: -20,
          amount: -36,
          from: xPercent,
          ease: 'power4.in',
        }),
        duration: 0.2,
        ease: 'none',
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(blocks, {
        height: '0rem',
        duration: 0.3,
        ease: 'power2.inOut',
      });
    });
  });
});

