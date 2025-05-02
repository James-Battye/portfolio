let lines = document.querySelectorAll('.sticky_link_wrap');

lines.forEach((e) => {
  let element = gsap.utils.selector(e)
  let image = element('img');
  let leftText = element('.u-text-style-h3')
  let rightText = element('.u-text-style-small')

  // Get the positions of the text elements relative to the wrapper
  const leftTextRect = leftText[0].getBoundingClientRect();
  const rightTextRect = rightText[0].getBoundingClientRect();
  const wrapperRect = e.getBoundingClientRect();

  // Calculate the distances from wrapper edges
  const leftTextRightEdge = leftTextRect.right - wrapperRect.left;
  const rightTextLeftEdge = rightTextRect.left - wrapperRect.left;

  // Calculate the center point between the texts
  const centerPoint = (leftTextRightEdge + rightTextLeftEdge) / 2;

  // Set the image position using margins
  gsap.set(image, {
    marginLeft: centerPoint - (image[0].offsetWidth / 2) + 16,
    position: 'absolute'
  });
})

// let tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: '.sticky_wrap',
//     start: 'bottom -10%',
//     end: '+=600',
//     scrub: true,
//     markers: true
//   }
// })

// tl.to('.sticky_link_wrap', {
//   transformOrigin: 'top center',
//   rotateX: '-90deg',
//   stagger: 0.1,
//   opacity: 0
// })