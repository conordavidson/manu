const DURATION = 350;

function easeInOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function smoothScrollTo(container: HTMLElement, target: HTMLElement): void {
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const targetCenter = targetRect.left + targetRect.width / 2 - containerRect.left;
  const containerCenter = containerRect.width / 2;
  const destination = container.scrollLeft + targetCenter - containerCenter;

  const start = container.scrollLeft;
  const distance = destination - start;
  if (distance === 0) return;

  // Disable scroll-snap during animation so it doesn't fight with us
  const prevSnap = container.style.scrollSnapType;
  container.style.scrollSnapType = 'none';

  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / DURATION, 1);
    container.scrollLeft = start + distance * easeInOut(progress);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      container.style.scrollSnapType = prevSnap;
    }
  }

  requestAnimationFrame(step);
}
