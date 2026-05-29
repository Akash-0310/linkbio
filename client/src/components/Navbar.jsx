import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Resources', path: '/resources' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <IoRocketOutline />
          </div>
          <span className="logo-text">Link<span className="text-gradient">Bio</span></span>
        </Link>

        <div className="navbar-links-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'nav-link-active' : ''}`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div className="nav-underline" layoutId="navUnderline" />
              )}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FiSun />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FiMoon />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {user ? (
            <div className="nav-user-actions">
              <Link to="/dashboard" className="btn btn-sm btn-secondary">Dashboard</Link>
              <button onClick={() => { logout(); navigate('/'); }} className="btn btn-sm btn-outline">Logout</button>
            </div>
          ) : (
            <div className="nav-auth-actions">
              <Link to="/login" className="btn btn-sm btn-secondary">Log In</Link>
              <Link to="/register" className="btn btn-sm btn-primary">Get Started</Link>
            </div>
          )}

          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-inner">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`mobile-nav-link ${isActive(link.path) ? 'mobile-nav-active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="mobile-menu-actions">
                {user ? (
                  <>
                    <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%' }}>Dashboard</Link>
                    <button onClick={() => { logout(); navigate('/'); }} className="btn btn-outline" style={{ width: '100%' }}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-secondary" style={{ width: '100%' }}>Log In</Link>
                    <Link to="/register" className="btn btn-primary" style={{ width: '100%' }}>Get Started Free</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
