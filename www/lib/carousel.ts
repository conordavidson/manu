import * as React from 'react';
import * as Scroll from '@/lib/scroll';

const AUTO_ADVANCE_DELAY = 3500;
const AUTO_ADVANCE_RESUME_DELAY = 10000;
const WHEEL_GESTURE_IDLE_DELAY = 80;
const WHEEL_IMPULSE_COOLDOWN = 180;

type WheelGesture = {
  direction: number;
  lastDelta: number;
  lastEventTime: number;
  lastTriggerTime: number;
};

type UseCarouselBehaviorOptions = {
  containerRef: React.RefObject<HTMLElement | null>;
  currentSlideIndex: number;
  onAutoAdvance?: (index: number) => void;
  scrollToSlide: (index: number) => void;
  slideCount: number;
};

export function useCarouselBehavior(options: UseCarouselBehaviorOptions): () => void {
  const { containerRef, currentSlideIndex, onAutoAdvance, scrollToSlide, slideCount } = options;
  const autoAdvanceTimeoutRef = React.useRef<null | ReturnType<typeof setTimeout>>(null);
  const autoScrollResetTimeoutRef = React.useRef<null | ReturnType<typeof setTimeout>>(null);
  const isAutoScrollActiveRef = React.useRef(false);
  const resumeTimeoutRef = React.useRef<null | ReturnType<typeof setTimeout>>(null);
  const wheelGestureRef = React.useRef<null | WheelGesture>(null);
  const wheelUnlockTimeoutRef = React.useRef<null | ReturnType<typeof setTimeout>>(null);
  const [isAutoAdvancePaused, setIsAutoAdvancePaused] = React.useState(false);
  const [isPageVisible, setIsPageVisible] = React.useState(true);

  const pauseAutoAdvance = React.useCallback(() => {
    if (isAutoScrollActiveRef.current && containerRef.current) {
      Scroll.cancelSmoothScroll(containerRef.current);
    }
    isAutoScrollActiveRef.current = false;
    if (autoScrollResetTimeoutRef.current) {
      clearTimeout(autoScrollResetTimeoutRef.current);
      autoScrollResetTimeoutRef.current = null;
    }
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
      autoAdvanceTimeoutRef.current = null;
    }
    setIsAutoAdvancePaused(true);

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoAdvancePaused(false);
      resumeTimeoutRef.current = null;
    }, AUTO_ADVANCE_RESUME_DELAY);
  }, [containerRef]);

  React.useEffect(() => {
    return () => {
      if (autoAdvanceTimeoutRef.current) clearTimeout(autoAdvanceTimeoutRef.current);
      if (autoScrollResetTimeoutRef.current) clearTimeout(autoScrollResetTimeoutRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      if (wheelUnlockTimeoutRef.current) clearTimeout(wheelUnlockTimeoutRef.current);
    };
  }, []);

  React.useEffect(() => {
    const onVisibilityChange = () => {
      const isVisible = document.visibilityState === 'visible';

      if (!isVisible) {
        if (autoAdvanceTimeoutRef.current) {
          clearTimeout(autoAdvanceTimeoutRef.current);
          autoAdvanceTimeoutRef.current = null;
        }
        if (isAutoScrollActiveRef.current && containerRef.current) {
          Scroll.cancelSmoothScroll(containerRef.current);
        }
        isAutoScrollActiveRef.current = false;
        if (autoScrollResetTimeoutRef.current) {
          clearTimeout(autoScrollResetTimeoutRef.current);
          autoScrollResetTimeoutRef.current = null;
        }
      }

      setIsPageVisible(isVisible);
    };

    onVisibilityChange();
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [containerRef]);

  React.useEffect(() => {
    if (isAutoAdvancePaused || !isPageVisible || slideCount <= 1) return;

    const timeout = setTimeout(() => {
      autoAdvanceTimeoutRef.current = null;
      const nextIndex = (currentSlideIndex + 1) % slideCount;
      isAutoScrollActiveRef.current = true;
      scrollToSlide(nextIndex);
      onAutoAdvance?.(nextIndex);
      autoScrollResetTimeoutRef.current = setTimeout(() => {
        isAutoScrollActiveRef.current = false;
        autoScrollResetTimeoutRef.current = null;
      }, 2000);
    }, AUTO_ADVANCE_DELAY);
    autoAdvanceTimeoutRef.current = timeout;

    return () => {
      clearTimeout(timeout);
      if (autoAdvanceTimeoutRef.current === timeout) autoAdvanceTimeoutRef.current = null;
    };
  }, [
    currentSlideIndex,
    isAutoAdvancePaused,
    isPageVisible,
    onAutoAdvance,
    scrollToSlide,
    slideCount,
  ]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    const onPointerDown = () => pauseAutoAdvance();
    const onWheel = (event: WheelEvent) => {
      pauseAutoAdvance();
      const isHorizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      if (isTouchDevice || isHorizontalGesture || event.deltaY === 0) return;

      event.preventDefault();
      const currentTime = performance.now();
      const direction = Math.sign(event.deltaY);
      const delta = Math.abs(event.deltaY);
      const previousGesture = wheelGestureRef.current;
      const isNewDirection = previousGesture?.direction !== direction;
      const isAfterIdle =
        !previousGesture || currentTime - previousGesture.lastEventTime > WHEEL_GESTURE_IDLE_DELAY;
      const hasNewImpulse =
        !!previousGesture &&
        currentTime - previousGesture.lastTriggerTime > WHEEL_IMPULSE_COOLDOWN &&
        delta > previousGesture.lastDelta * 1.5 &&
        delta - previousGesture.lastDelta > 0.25;
      const shouldAdvance = isNewDirection || isAfterIdle || hasNewImpulse;

      wheelGestureRef.current = {
        direction,
        lastDelta: delta,
        lastEventTime: currentTime,
        lastTriggerTime: shouldAdvance
          ? currentTime
          : (previousGesture?.lastTriggerTime ?? currentTime),
      };

      if (wheelUnlockTimeoutRef.current) clearTimeout(wheelUnlockTimeoutRef.current);
      wheelUnlockTimeoutRef.current = setTimeout(() => {
        wheelGestureRef.current = null;
        wheelUnlockTimeoutRef.current = null;
      }, WHEEL_GESTURE_IDLE_DELAY);

      if (!shouldAdvance) return;

      const nextIndex = Math.max(0, Math.min(currentSlideIndex + direction, slideCount - 1));
      if (nextIndex === currentSlideIndex) return;

      scrollToSlide(nextIndex);
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('wheel', onWheel);
    };
  }, [containerRef, currentSlideIndex, pauseAutoAdvance, scrollToSlide, slideCount]);

  return pauseAutoAdvance;
}
