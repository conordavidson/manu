const DURATION = 350;

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

let currentRaf: number | null = null;

export function smoothScrollTo(container: HTMLElement, target: HTMLElement): void {
  // Cancel any in-flight animation so they don't fight over scrollLeft
  if (currentRaf !== null) {
    cancelAnimationFrame(currentRaf);
    currentRaf = null;
  }

  // Disable scroll-snap BEFORE reading positions, so scrollLeft reflects reality
  const prevSnap = container.style.scrollSnapType;
  container.style.scrollSnapType = 'none';

  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const targetCenter = targetRect.left + targetRect.width / 2 - containerRect.left;
  const containerCenter = containerRect.width / 2;

  const start = container.scrollLeft;
  const destination = start + targetCenter - containerCenter;
  const distance = destination - start;

  if (distance === 0) {
    container.style.scrollSnapType = prevSnap;
    return;
  }

  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / DURATION, 1);
    container.scrollLeft = start + distance * easeOut(progress);

    if (progress < 1) {
      currentRaf = requestAnimationFrame(step);
    } else {
      currentRaf = null;
      container.style.scrollSnapType = prevSnap;
    }
  }

  currentRaf = requestAnimationFrame(step);
}
