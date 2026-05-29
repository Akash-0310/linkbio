import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiAtSign, FiArrowRight } from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', displayName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!/^[a-z0-9_-]+$/.test(form.username)) {
      setError('Username can only contain lowercase letters, numbers, hyphens, and underscores');
      return;
    }
    setLoading(true);
    try {
      await register(form.username, form.email, form.password, form.displayName);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
          <h1>Create Your Page</h1>
          <p>Join 50,000+ creators on LinkBio</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row-auth">
            <div className="form-group">
              <label><FiAtSign /> Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="yourname"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label><FiUser /> Display Name</label>
              <input
                type="text"
                name="displayName"
                value={form.displayName}
                onChange={handleChange}
                placeholder="John Doe"
                className="form-input"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label><FiMail /> Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label><FiLock /> Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min 6 characters"
              className="form-input"
              required
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Creating account...' : <>Create Free Account <FiArrowRight /></>}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
