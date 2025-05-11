let nav = document.querySelector('.nav_wrap');
let logo = document.querySelector('.logo_wrap');

let scrollTl = gsap.timeline({
  scrollTrigger: {
    trigger: logo,
    start: 'bottom top',
    end: '+=2', // or +=1 to make it a very short range
    toggleActions: 'play none none reverse', // play on enter, reverse on leave
  }
});

scrollTl.from(nav, {
  y: '-100%'
});