type ActiveScroll = {
  cancel: () => void;
};

const activeScrolls = new WeakMap<HTMLElement, ActiveScroll>();

export function cancelSmoothScroll(container: HTMLElement): void {
  activeScrolls.get(container)?.cancel();
}

export function smoothScrollTo(container: HTMLElement, target: HTMLElement): void {
  activeScrolls.get(container)?.cancel();

  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const targetCenter =
    container.scrollLeft + targetRect.left - containerRect.left + targetRect.width / 2;
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  const destination = Math.max(
    0,
    Math.min(targetCenter - container.clientWidth / 2, maxScrollLeft),
  );

  if (Math.abs(destination - container.scrollLeft) < 1) return;

  const previousSnapType = container.style.scrollSnapType;
  let restoreFrame: null | number = null;
  let isFinished = false;

  const removeListeners = () => {
    container.removeEventListener('scrollend', finish);
    if (restoreFrame) cancelAnimationFrame(restoreFrame);
  };

  const restoreSnap = () => {
    container.style.scrollSnapType = previousSnapType;
    activeScrolls.delete(container);
  };

  const finish = () => {
    if (isFinished) return;
    isFinished = true;
    removeListeners();
    container.scrollLeft = destination;
    restoreFrame = requestAnimationFrame(restoreSnap);
  };

  const cancel = () => {
    isFinished = true;
    removeListeners();
    container.scrollTo({ behavior: 'auto', left: container.scrollLeft });
    restoreSnap();
  };

  activeScrolls.set(container, { cancel });
  container.style.scrollSnapType = 'none';
  container.addEventListener('scrollend', finish);
  container.scrollTo({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    left: destination,
  });
}
