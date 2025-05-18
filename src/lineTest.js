let tl = gsap.timeline({ paused: true });

let split = SplitText.create('h1', {
  types: 'lines',
  mask: 'lines',
});

let total = split.lines.length;

// Compose a function to go from line index → delay
let delayFn = gsap.utils.pipe(
  gsap.utils.normalize(0, total - 1), // → 0 to 1
  gsap.parseEase('power2.out'), // → ease applied
  gsap.utils.mapRange(0, 1, 0, total * 0.3) // → scale to delay range
);

split.lines.forEach((line, index) => {
  const lineSplit = new SplitText(line, { type: 'chars' });

  tl.from(
    lineSplit.chars,
    {
      yPercent: 100,
      opacity: 0,
      stagger: 0.025,
    },
    delayFn(index)
  );
});

tl.play();
