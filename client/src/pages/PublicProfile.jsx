import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiExternalLink, FiInstagram, FiTwitter, FiYoutube, FiGithub, FiLinkedin, FiGlobe, FiMail, FiShoppingBag, FiMusic, FiLink, FiGrid } from 'react-icons/fi';
import axios from 'axios';
import './PublicProfile.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ICON_MAP = {
  link: FiLink,
  instagram: FiInstagram,
  twitter: FiTwitter,
  youtube: FiYoutube,
  tiktok: FiMusic,
  github: FiGithub,
  linkedin: FiLinkedin,
  spotify: FiMusic,
  website: FiGlobe,
  email: FiMail,
  shop: FiShoppingBag,
  portfolio: FiGrid,
};

const THEME_STYLES = {
  'gradient-blue': { bg: 'linear-gradient(-45deg, #0c1445, #1e3a8a, #4c1d95, #1e1b4b)', text: '#fff' },
  'gradient-purple': { bg: 'linear-gradient(-45deg, #2e1065, #7c3aed, #be185d, #4c1d95)', text: '#fff' },
  'gradient-sunset': { bg: 'linear-gradient(-45deg, #7c2d12, #dc2626, #f59e0b, #92400e)', text: '#fff' },
  'gradient-ocean': { bg: 'linear-gradient(-45deg, #0c4a6e, #0891b2, #1d4ed8, #164e63)', text: '#fff' },
  'gradient-forest': { bg: 'linear-gradient(-45deg, #064e3b, #059669, #065f46, #047857)', text: '#fff' },
  'minimal-light': { bg: '#f8fafc', text: '#0f172a' },
  'minimal-dark': { bg: '#0f172a', text: '#f1f5f9' },
};

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API}/links/public/${username}`);
        setProfile(data);
      } catch (err) {
        setError(err.response?.status === 404 ? 'Profile not found' : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  const handleLinkClick = async (linkId, url) => {
    try {
      await axios.post(`${API}/links/click/${username}/${linkId}`, {
        referrer: document.referrer || 'direct'
      });
    } catch (err) {
      // click tracking is best-effort
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="profile-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <h2>404</h2>
        <p>{error}</p>
        <a href="/" className="btn btn-primary">Go Home</a>
      </div>
    );
  }

  const theme = THEME_STYLES[profile.theme] || THEME_STYLES['gradient-blue'];
  const isGradient = profile.theme?.startsWith('gradient');

  return (
    <div
      className={`public-profile ${isGradient ? 'profile-gradient' : ''}`}
      style={{
        background: theme.bg,
        backgroundSize: isGradient ? '400% 400%' : undefined,
        color: theme.text,
      }}
    >
      <div className="profile-container">
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Avatar */}
          <motion.div
            className="profile-avatar"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            {profile.profilePhoto ? (
              <img
                src={profile.profilePhoto.startsWith('/') ? `http://localhost:5000${profile.profilePhoto}` : profile.profilePhoto}
                alt={profile.displayName}
              />
            ) : (
              <div className="profile-avatar-fallback">
                {profile.displayName?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </motion.div>

          {/* Name & Bio */}
          <motion.h1
            className="profile-name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {profile.displayName}
          </motion.h1>

          {profile.bio && (
            <motion.p
              className="profile-bio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {profile.bio}
            </motion.p>
          )}

          {/* Links */}
          <div className="profile-links">
            {profile.links.map((link, i) => {
              const IconComponent = ICON_MAP[link.icon] || FiLink;
              return (
                <motion.button
                  key={link._id}
                  className="profile-link-btn"
                  onClick={() => handleLinkClick(link._id, link.url)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className="profile-link-icon" />
                  <span className="profile-link-title">{link.title}</span>
                  <FiExternalLink className="profile-link-arrow" />
                </motion.button>
              );
            })}
          </div>

          {/* Footer */}
          <motion.div
            className="profile-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <a href="/" className="profile-branding">
              Built with <strong>LinkBio</strong>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PublicProfile;
