// import SplitType from 'split-type'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

gsap.set('.sticky_link_wrap .u-text-style-h3, .sticky_link_wrap .u-text-style-small ', {
  opacity: 0,
})


function refreshPosition() {
  ScrollTrigger.getAll().forEach(e => {
    if (e.vars.id && e.vars.id.includes("sticky")) {
      e.kill();
    }
  });

  new SplitType('.sticky_heading', { types: 'lines,chars' })
  gsap.set('.line', {
    overflow: 'hidden'
  })

  gsap.set('.sticky_heading .char', {
    yPercent: 100,
  })

  const logo = document.querySelector('.logo');
  const rect = logo.getBoundingClientRect();

  // 1) true logo center (viewport px)
  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;

  // 2) initial mask "radius"
  const startSize = 28;
  //  and the final "radius" you want (e.g. big enough to cover viewport)
  const maxSize = Math.max(window.innerWidth, window.innerHeight) * 10;

  // 3) set up your element
  gsap.set('.sticky_wrap', {
    maskSize: `${startSize}px ${startSize}px`,
    maskPosition: `${centerX - startSize / 2}px ${centerY - startSize / 2}px`
  });

  // 4) tween a dummy "s" value and onUpdate rewrite both props
  const obj = { s: startSize, x: centerX, y: centerY };
  const tl = gsap.timeline({
    scrollTrigger: {
      id: 'sticky',
      trigger: '[data-sticky-track="hero"]',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true, // recalc start/end if layout changes,
      onUpdate: () => {
        const updatedRect = logo.getBoundingClientRect();
        const isInViewport = (
          updatedRect.top <= window.innerHeight &&
          updatedRect.bottom >= 0 &&
          updatedRect.left <= window.innerWidth &&
          updatedRect.right >= 0
        );

        if (isInViewport) {
          // Smoothly transition to logo position
          gsap.to(obj, {
            x: updatedRect.x + updatedRect.width / 2,
            y: updatedRect.y + updatedRect.height / 2,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          // Smoothly transition to viewport center
          gsap.to(obj, {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    }
  });

  tl.to(obj, {
    s: maxSize,
    ease: 'none',
    onUpdate() {
      const s = obj.s;
      gsap.to('.sticky_wrap', {
        maskSize: `${s}px ${s}px`,
        maskPosition: `${obj.x - s / 2}px ${obj.y - s / 2}px`,
        duration: 0.1
      });
    }
  });
  tl.to('.sticky_link_line', {
    width: '100%',
    stagger: {
      each: 0.1,
      onComplete: function () {
        let parent = this.targets()[0].parentElement
        gsap.fromTo(parent, {
          pointerEvents: 'auto'
        })
      }
    }
  }, "<+=0.2");

  tl.to('.sticky_heading .char', {
    yPercent: 0,
    stagger: 0.02
  }, '<')

  tl.to('.sticky_link_wrap .u-text-style-h3', {
    opacity: 1,
    stagger: 0.1
  }, '<+=0.1')

  tl.to('.sticky_link_wrap .u-text-style-small', {
    opacity: 1,
    stagger: 0.1,
  }, '<+=0.1')

  tl.to('.sticky_wrap, .sticky_item', {
    pointerEvents: 'auto'
  })

}

document.addEventListener("DOMContentLoaded", () => {
  refreshPosition()
});
// run on load + resize
window.addEventListener('resize', () => {
  refreshPosition()
});
