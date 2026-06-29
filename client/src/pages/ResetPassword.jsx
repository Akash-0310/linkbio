import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed. The link may have expired.');
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
          <h1>Set a New Password</h1>
          <p>Choose a strong password for your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label><FiLock /> New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label><FiLock /> Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter your password"
              className="form-input"
              required
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Resetting...' : <>Reset Password <FiArrowRight /></>}
          </button>
        </form>

        <p className="auth-switch">
          <Link to="/login"><FiArrowLeft style={{ verticalAlign: 'middle' }} /> Back to sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
