
let cardsToHover = document.querySelectorAll('.work_item');

cardsToHover.forEach((e) => {
  e.addEventListener('mouseenter', () => {
    hoverIn(e)
  })
  e.addEventListener('mouseleave', () => {
    hoverOut(e)
  })
})

let speed = {
  duration: 0.5,
  ease: 'power1.inOut'
}



function hoverIn(element) {
  let image = element.querySelector('.work_image')
  let container = element.querySelector('.work_image_wrap')
  let state = Flip.getState(image)
  container.appendChild(image),
    Flip.from(state, {
      absolute: true,
      ...speed
    })
}

function hoverOut(element) {
  let image = element.querySelector('.work_image')
  let container = element.querySelector('.work_image_item')
  let state = Flip.getState(image)
  container.appendChild(image),
    Flip.from(state, {
      absolute: true,
      ...speed
    })
}