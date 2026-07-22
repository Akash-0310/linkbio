import './LoadingScreen.css';

/**
 * Full-viewport centered spinner shown while an async gate resolves — e.g.
 * verifying the current session before rendering a protected route. Replaces
 * rendering `null`, which left the screen blank during the auth check.
 */
const LoadingScreen = ({ label = 'Loading…' }) => (
  <div className="loading-screen" role="status" aria-live="polite">
    <div className="loading-screen-spinner" />
    <span className="sr-only">{label}</span>
  </div>
);

export default LoadingScreen;
