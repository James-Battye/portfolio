document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector('.sticky_wrap');

  new SplitType('.hero_title', { types: 'lines, words, chars' })


  gsap.set('.sticky_wrap', {
    opacity: 0
  })


  gsap.set('.word', {
    overflow: 'hidden',
    height: '1em',
    y: '-12px'
  })

  gsap.set('.char', {
    y: '-0.1em'
  })

  let tl = gsap.timeline({
    defaults: {
      duration: 1.8,
      ease: 'power4.inOut'
    },
    paused: true
  })
  document.querySelectorAll('.line').forEach((e, index) => {
    let chars = e.querySelectorAll('.char')

    tl.from(chars, {
      yPercent: 100,
      stagger: 0.005,
      delay: 0.02 * index
    }, "<+=0.04");

  })

  tl.from('.logo', {
    yPercent: 100,
    opacity: 0
  }, '<')

  tl.to('.sticky_wrap', {
    opacity: 1,
    duration: 2,
    ease: 'power4.inOut',
    onUpdate: refreshPosition
  }, "<")

  tl.from('.hero_marquee_wrap', {
    y: '6rem',
    opacity: 0,
    x: '2rem'
  }, 0.6)

  tl.from('.hero_location', {
    opacity: 0
  }, '<')

  tl.from('.nav_wrap', {
    yPercent: -40,
    opacity: 0
  }, "<+=0.2")











  function refreshPosition() {
    const logo = document.querySelector('.logo');
    const rect = logo.getBoundingClientRect();

    // 1) true logo center (viewport px)
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;

    // 2) initial mask “radius”
    const startSize = 28;
    //  and the final “radius” you want (e.g. big enough to cover viewport)
    // 3) set up your element
    gsap.set('.sticky_wrap', {
      maskSize: `${startSize}px ${startSize}px`,
      maskPosition: `${centerX - startSize / 2}px ${centerY - startSize / 2}px`
    });
  }


  tl.play()

});