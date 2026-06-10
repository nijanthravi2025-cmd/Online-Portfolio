export function scrollToSection(targetId) {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const collapsedNavHeight = 70;
  // Offset matches the spacing in the original website scroll handler
  const targetPosition =
    targetElement.getBoundingClientRect().top +
    window.scrollY -
    collapsedNavHeight -
    40;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeProgress = easeInOutCubic(Math.min(progress / duration, 1));
    window.scrollTo(0, startPosition + distance * easeProgress);

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}
