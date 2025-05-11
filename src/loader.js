document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(SplitText);
  // Split loader & add underline
  const loaderText = new SplitText('.loader_text', {
    type: 'lines,chars',
    linesClass: 'line',
    charsClass: 'char',
  });
  const loaderTextEl = document.querySelector('.loader_text');
  const underline = document.createElement('div');
  underline.classList.add('loader_underline');
  loaderTextEl.querySelector('.line').appendChild(underline);

  // Split hero text
  let heroText = new SplitText('.hero_heading', {
    type: 'lines, chars',
    linesClass: 'line',
    charsClass: 'char',
  })

  // Create array for JB and other letters
  let jb = [];
  let restOfText = [];

  // Add elements to their respective array
  loaderText.chars.forEach((e) => {
    if (e.textContent === 'J' || e.textContent === 'B') {
      jb.push(e);
    } else {
      restOfText.push(e);
    }
  });


  // Setting default styles
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
    bottom: '0px',
    right: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
  });

  // Get locations for J and B
  const jRect = jb[0].getBoundingClientRect();
  const bRect = jb[1].getBoundingClientRect();
  const distanceX = bRect.left - jRect.left - 18;

  gsap.set(jb[0], {
    x: `${distanceX}px`,
  })

  console.log(distanceX);

  // Begin timeline
  let tl = gsap.timeline({
    defaults: {
      duration: 1.2,
      ease: 'power3.inOut',
    },
    paused: true
  });

  // Animate underline slightly for J and B animation
  tl.to('.loader_underline', {
    width: '25%',
    duration: 1,
    ease: 'power3.inOut',
  });

  // Animate J and B
  tl.from(
    jb,
    {
      yPercent: 100,
    },
    '>-=0.4'
  );


  // Move "J" horizontally back to original position and stretch underline to 100% width
  tl.to(jb[0], {
    x: '0px'
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

  // Unclip the wrap
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

  //  V1 simple character animation
  tl.from('.hero_heading .char', {
    yPercent: 100
  }, ">-=1.7")



  tl.from('.work_item', {
    opacity: 0,
    y: 20,
    stagger: 0.1
  }, "<+=0.4")

  tl.from('.g_tag_wrap', {
    opacity: 0,
  }, "<+=0.2")
  tl.to('.loader_wrap', {
    autoAlpha: 0
  })






  tl.play()

});