import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Reset the window scroll position whenever the route changes.
 *
 * Without this, the browser keeps the scroll offset across client-side
 * navigations, so clicking a footer link at the bottom of a long page landed
 * the reader halfway down the next one. Renders nothing — mount it once inside
 * the Router.
 *
 * Two cases are deliberately skipped: a URL with a hash, so `/faq#pricing`
 * still jumps to its anchor, and POP navigation, so back/forward keeps the
 * position the reader left off at.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash || navigationType === 'POP') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash, navigationType]);

  return null;
};

export default ScrollToTop;
