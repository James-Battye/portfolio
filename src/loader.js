const split = new SplitType('.loader_text', { types: 'lines, words,chars' });
const loaderTextEl = document.querySelector('.loader_text');
const underline = document.createElement('div');
underline.classList.add('loader_underline');
split.lines[0].appendChild(underline);

let jb = [];
let restOfText = [];

gsap.set('.line', {
  overflow: 'hidden',
});

gsap.set('.loader_wrap', {
  display: 'flex',
});

gsap.set('.loader_text', { position: 'relative' });
gsap.set('.loader_underline', {
  position: 'absolute',
  height: '1px',
  width: '0%',
  left: '0',
  right: '0',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: 'white', // Add a visible color
});

split.chars.forEach((e) => {
  if (e.textContent === 'J' || e.textContent === 'B') {
    jb.push(e);
  } else {
    restOfText.push(e);
  }
});

let tl = gsap.timeline({
  defaults: {
    duration: 1.2,
    ease: 'power3.inOut',
  },
});

tl.to('.loader_underline', {
  width: '25%',
  duration: 1,
  ease: 'power3.inOut',
});

// Ensure DOM is rendered before measuringpositions
let jRect = jb[0].getBoundingClientRect();
let bRect = jb[1].getBoundingClientRect();
let distanceX = bRect.left - jRect.left - 18;

// Animate both "J" and "B" upward together
tl.from(
  jb,
  {
    yPercent: 100,
  },
  '>-=0.4'
);

// Move "J" horizontally back to original position
tl.from(jb[0], {
  x: distanceX,
});
tl.to(
  '.loader_underline',
  {
    width: '100%',
  },
  '<'
);

// Animate the rest of the text
tl.from(
  restOfText,
  {
    yPercent: 100,
    stagger: { each: 0.02, from: 'center' },
    duration: 1.5,
    ease: 'power3.inOut',
  },
  '<-=0.1'
);
tl.fromTo(
  '.loader_wrap',
  {
    clipPath: 'inset(0% 0% -10% 0%)', // fully visible
  },
  {
    clipPath: 'inset(0% 0% 100% 0%)', // clipped from bottom (invisible)
    duration: 3.2,
    ease: 'power4.inOut',
  },
  '<=+0.6'
);

GSDevTools.create();
