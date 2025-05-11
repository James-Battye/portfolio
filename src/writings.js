
let elements = document.querySelectorAll('.writing_col_item');

elements.forEach((e) => {
  animateIn(e)
})

function animateIn(e) {
  let link = e.querySelector('.writing_link')
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: e,
      start: 'top 70%',
      end: 'bottom 30%',
      toggleAttribute: 'play none non none',
      // markers: true
    },
    defaults: {
      duration: 2,
      ease: 'power4.inOut'
    }
  })

  tl.from(link, {
    scale: 0,
    ease: "elastic.out(1,0.3)",
  })
}

