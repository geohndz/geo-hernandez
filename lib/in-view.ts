export function isReallyVisible(entry: IntersectionObserverEntry) {
  if (!entry.isIntersecting || entry.intersectionRatio <= 0) return false;
  const rect = entry.boundingClientRect;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
}
