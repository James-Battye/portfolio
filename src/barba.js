let { selector } = gsap.utils;

document.addEventListener('DOMContentLoaded', () => {
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }
  // Initialize Barba
  barba.init({
    transitions: [
      {
        name: 'clip-path-transition',
        async enter(data) {
          let tl = gsap.timeline({
            onComplete: function () {
              window.lenisInstance.resize();
            },
          });
          tl.set(data.next.container, {
            position: 'fixed',
            top: '0px',
            width: '100%',
            zIndex: 0,
          });

          tl.set(data.current.container, {
            position: 'relative',
            zIndex: 1,
          });

          tl.fromTo(
            data.current.container,
            {
              clipPath: 'inset(0 0 0 0%)',
            },
            {
              clipPath: 'inset(0 0 0 100%)',
              duration: 0.8,
              ease: 'power2.inOut',
            }
          );

          tl.set(data.next.container, {
            position: 'relative',
            onComplete: scrollToTop,
            top: '0px',
            width: '100%',
          });

          return tl;
        },
      },
    ],
  });
});
