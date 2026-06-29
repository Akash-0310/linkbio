import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiArrowRight, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [devLink, setDevLink] = useState('');
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await forgotPassword(email);
      setSent(true);
      // In dev (no SMTP configured) the API returns the reset link directly
      if (data.resetUrl) setDevLink(data.resetUrl);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow auth-glow-1" />
      <div className="auth-glow auth-glow-2" />
      <motion.div
        className="auth-card glass-card-static"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <div className="logo-icon"><IoRocketOutline /></div>
            <span className="logo-text">Link<span className="text-gradient">Bio</span></span>
          </Link>
          <h1>Forgot Password?</h1>
          <p>Enter your email and we'll send you a reset link</p>
        </div>

        {sent ? (
          <div className="auth-success">
            <FiCheckCircle className="auth-success-icon" />
            <p>If an account with that email exists, a password reset link has been sent. Check your inbox.</p>
            {devLink && (
              <p className="auth-dev-link">
                Dev mode (no email configured) — use this link:<br />
                <Link to={devLink.replace(/^https?:\/\/[^/]+/, '')}>{devLink}</Link>
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label><FiMail /> Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="form-input"
                required
              />
            </div>
            {error && <div className="auth-error">{error}</div>}
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Sending...' : <>Send Reset Link <FiArrowRight /></>}
            </button>
          </form>
        )}

        <p className="auth-switch">
          <Link to="/login"><FiArrowLeft style={{ verticalAlign: 'middle' }} /> Back to sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
