let splitText = new SplitText('.about_content', {
  type: 'lines, words, chars',
  linesClass: 'aboutLine',
  wordsClass: 'aboutWord',
  charsClass: 'aboutChar',
})

gsap.set('.aboutLine', {
  overflow: 'hidden'
})

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.about_contain',
    start: 'top 80%',
    markers: true
  },
  defaults: {
    duration: 1.2,
    ease: 'power3.inOut'
  }
})

document.querySelectorAll('.aboutLine').forEach((e, i) => {
  let chars = e.querySelectorAll('.aboutChar')
  tl.from(chars, {
    yPercent: 100,
    stagger: 0.005,
    delay: i * 0.005
  }, "<")
});

