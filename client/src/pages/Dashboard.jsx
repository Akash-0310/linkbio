import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit3, FiTrash2, FiEye, FiEyeOff, FiBarChart2, FiLink, FiExternalLink, FiSave, FiUpload, FiCopy, FiCheck } from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ICON_OPTIONS = [
  { value: 'link', label: 'Link' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'spotify', label: 'Spotify' },
  { value: 'website', label: 'Website' },
  { value: 'email', label: 'Email' },
  { value: 'shop', label: 'Shop' },
  { value: 'portfolio', label: 'Portfolio' },
];

const THEMES = [
  { value: 'gradient-blue', label: 'Blue Gradient', colors: ['#2563eb', '#7c3aed'] },
  { value: 'gradient-purple', label: 'Purple Gradient', colors: ['#7c3aed', '#ec4899'] },
  { value: 'gradient-sunset', label: 'Sunset', colors: ['#f59e0b', '#ef4444'] },
  { value: 'gradient-ocean', label: 'Ocean', colors: ['#06b6d4', '#3b82f6'] },
  { value: 'gradient-forest', label: 'Forest', colors: ['#10b981', '#059669'] },
  { value: 'minimal-light', label: 'Minimal Light', colors: ['#f8fafc', '#e2e8f0'] },
  { value: 'minimal-dark', label: 'Minimal Dark', colors: ['#1e293b', '#0f172a'] },
];

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('links');
  const [links, setLinks] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [profile, setProfile] = useState({ displayName: '', bio: '', theme: 'gradient-blue' });
  const [newLink, setNewLink] = useState({ title: '', url: '', icon: 'link' });
  const [editingLink, setEditingLink] = useState(null);
  const [showAddLink, setShowAddLink] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({ displayName: user.displayName || '', bio: user.bio || '', theme: user.theme || 'gradient-blue' });
      fetchLinks();
      fetchAnalytics();
    }
  }, [user]);

  const fetchLinks = async () => {
    try {
      const { data } = await axios.get(`${API}/links`);
      setLinks(data);
    } catch (err) { console.error(err); }
  };

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get(`${API}/links/analytics`);
      setAnalytics(data);
    } catch (err) { console.error(err); }
  };

  const handleAddLink = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API}/links`, newLink);
      setLinks(data);
      setNewLink({ title: '', url: '', icon: 'link' });
      setShowAddLink(false);
      fetchAnalytics();
    } catch (err) { console.error(err); }
  };

  const handleDeleteLink = async (linkId) => {
    try {
      const { data } = await axios.delete(`${API}/links/${linkId}`);
      setLinks(data);
      fetchAnalytics();
    } catch (err) { console.error(err); }
  };

  const handleToggleLink = async (linkId, isActive) => {
    try {
      const { data } = await axios.put(`${API}/links/${linkId}`, { isActive: !isActive });
      setLinks(data);
    } catch (err) { console.error(err); }
  };

  const handleUpdateLink = async (linkId) => {
    try {
      const { data } = await axios.put(`${API}/links/${linkId}`, editingLink);
      setLinks(data);
      setEditingLink(null);
    } catch (err) { console.error(err); }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { data } = await axios.put(`${API}/auth/profile`, profile);
      updateUser(data);
    } catch (err) { console.error(err); }
    setSaving(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await axios.post(`${API}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const profileRes = await axios.put(`${API}/auth/profile`, { profilePhoto: data.url });
      updateUser(profileRes.data);
    } catch (err) { console.error(err); }
  };

  const profileUrl = `${window.location.origin}/${user?.username}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar glass-card-static">
          <div className="sidebar-profile">
            <div className="sidebar-avatar">
              {user?.profilePhoto ? (
                <img src={user.profilePhoto.startsWith('/') ? `http://localhost:5000${user.profilePhoto}` : user.profilePhoto} alt="Profile" />
              ) : (
                <div className="avatar-placeholder"><IoRocketOutline /></div>
              )}
            </div>
            <h3>{user?.displayName}</h3>
            <p>@{user?.username}</p>
          </div>

          <div className="sidebar-url">
            <div className="url-display">
              <FiLink />
              <span className="url-text">linkbio.com/{user?.username}</span>
            </div>
            <button className="btn btn-sm btn-secondary" onClick={copyUrl}>
              {copied ? <><FiCheck /> Copied</> : <><FiCopy /> Copy</>}
            </button>
          </div>

          <nav className="sidebar-nav">
            {[
              { id: 'links', icon: <FiLink />, label: 'My Links' },
              { id: 'appearance', icon: <FiEdit3 />, label: 'Appearance' },
              { id: 'analytics', icon: <FiBarChart2 />, label: 'Analytics' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`sidebar-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>

          <a href={`/${user?.username}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>
            <FiExternalLink /> View Live Page
          </a>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <AnimatePresence mode="wait">
            {/* Links Tab */}
            {activeTab === 'links' && (
              <motion.div key="links" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="dash-header">
                  <div>
                    <h2>My Links</h2>
                    <p>Add and manage your bio links</p>
                  </div>
                  <button className="btn btn-primary" onClick={() => setShowAddLink(!showAddLink)}>
                    <FiPlus /> Add Link
                  </button>
                </div>

                <AnimatePresence>
                  {showAddLink && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="add-link-form glass-card-static"
                    >
                      <form onSubmit={handleAddLink} style={{ padding: 24 }}>
                        <div className="form-row-auth">
                          <div className="form-group">
                            <label>Link Title</label>
                            <input
                              type="text"
                              value={newLink.title}
                              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                              placeholder="My Website"
                              className="form-input"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Icon</label>
                            <select
                              value={newLink.icon}
                              onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                              className="form-input"
                            >
                              {ICON_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>URL</label>
                          <input
                            type="url"
                            value={newLink.url}
                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                            placeholder="https://example.com"
                            className="form-input"
                            required
                          />
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button type="submit" className="btn btn-primary">Add Link</button>
                          <button type="button" className="btn btn-secondary" onClick={() => setShowAddLink(false)}>Cancel</button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="links-list">
                  {links.length === 0 ? (
                    <div className="empty-state glass-card-static">
                      <FiLink style={{ fontSize: '2rem', color: 'var(--text-muted)' }} />
                      <h3>No links yet</h3>
                      <p>Add your first link to get started</p>
                    </div>
                  ) : (
                    links.map((link) => (
                      <motion.div
                        key={link._id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`link-item glass-card-static ${!link.isActive ? 'link-disabled' : ''}`}
                      >
                        {editingLink && editingLink._id === link._id ? (
                          <div className="link-edit-form">
                            <input
                              type="text"
                              value={editingLink.title}
                              onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                              className="form-input"
                              placeholder="Title"
                            />
                            <input
                              type="url"
                              value={editingLink.url}
                              onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                              className="form-input"
                              placeholder="URL"
                            />
                            <div style={{ display: 'flex', gap: 8 }}>
                              <button className="btn btn-sm btn-primary" onClick={() => handleUpdateLink(link._id)}>Save</button>
                              <button className="btn btn-sm btn-secondary" onClick={() => setEditingLink(null)}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div className="link-item-content">
                            <div className="link-info">
                              <div className="link-title">{link.title}</div>
                              <div className="link-url">{link.url}</div>
                            </div>
                            <div className="link-stats">
                              <span className="link-clicks">{link.clicks} clicks</span>
                            </div>
                            <div className="link-actions">
                              <button onClick={() => setEditingLink({ ...link })} title="Edit"><FiEdit3 /></button>
                              <button onClick={() => handleToggleLink(link._id, link.isActive)} title={link.isActive ? 'Disable' : 'Enable'}>
                                {link.isActive ? <FiEye /> : <FiEyeOff />}
                              </button>
                              <button onClick={() => handleDeleteLink(link._id)} title="Delete" className="delete-btn"><FiTrash2 /></button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <motion.div key="appearance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="dash-header">
                  <div>
                    <h2>Appearance</h2>
                    <p>Customize your profile page</p>
                  </div>
                </div>

                <div className="appearance-section glass-card-static" style={{ padding: 28 }}>
                  <h3>Profile Photo</h3>
                  <div className="photo-upload">
                    <div className="photo-preview">
                      {user?.profilePhoto ? (
                        <img src={user.profilePhoto.startsWith('/') ? `http://localhost:5000${user.profilePhoto}` : user.profilePhoto} alt="Profile" />
                      ) : (
                        <div className="avatar-placeholder large"><IoRocketOutline /></div>
                      )}
                    </div>
                    <label className="btn btn-secondary">
                      <FiUpload /> Upload Photo
                      <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                    </label>
                  </div>
                </div>

                <div className="appearance-section glass-card-static" style={{ padding: 28, marginTop: 20 }}>
                  <h3>Profile Details</h3>
                  <div className="form-group">
                    <label>Display Name</label>
                    <input
                      type="text"
                      value={profile.displayName}
                      onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="form-input"
                      rows={3}
                      placeholder="Write a short bio..."
                      maxLength={200}
                    />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{profile.bio.length}/200</span>
                  </div>
                </div>

                <div className="appearance-section glass-card-static" style={{ padding: 28, marginTop: 20 }}>
                  <h3>Theme</h3>
                  <div className="theme-grid">
                    {THEMES.map(theme => (
                      <button
                        key={theme.value}
                        className={`theme-option ${profile.theme === theme.value ? 'theme-active' : ''}`}
                        onClick={() => setProfile({ ...profile, theme: theme.value })}
                      >
                        <div
                          className="theme-preview"
                          style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}
                        />
                        <span>{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 20 }} onClick={handleSaveProfile} disabled={saving}>
                  {saving ? 'Saving...' : <><FiSave /> Save Changes</>}
                </button>
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="dash-header">
                  <div>
                    <h2>Analytics</h2>
                    <p>Track your page performance</p>
                  </div>
                </div>

                <div className="analytics-cards">
                  <div className="analytics-stat glass-card-static">
                    <div className="analytics-stat-icon" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#3b82f6' }}><FiEye /></div>
                    <div>
                      <div className="analytics-stat-value">{analytics?.totalViews || 0}</div>
                      <div className="analytics-stat-label">Total Views</div>
                    </div>
                  </div>
                  <div className="analytics-stat glass-card-static">
                    <div className="analytics-stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><FiLink /></div>
                    <div>
                      <div className="analytics-stat-value">{analytics?.totalClicks || 0}</div>
                      <div className="analytics-stat-label">Total Clicks</div>
                    </div>
                  </div>
                  <div className="analytics-stat glass-card-static">
                    <div className="analytics-stat-icon" style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}><FiBarChart2 /></div>
                    <div>
                      <div className="analytics-stat-value">{analytics?.totalLinks || 0}</div>
                      <div className="analytics-stat-label">Active Links</div>
                    </div>
                  </div>
                </div>

                <div className="analytics-links glass-card-static" style={{ padding: 28, marginTop: 20 }}>
                  <h3>Link Performance</h3>
                  {analytics?.linkStats?.length > 0 ? (
                    <div className="analytics-table">
                      {analytics.linkStats.map(link => {
                        const maxClicks = Math.max(...analytics.linkStats.map(l => l.clicks), 1);
                        return (
                          <div key={link.id} className="analytics-row">
                            <div className="analytics-row-info">
                              <div className="analytics-row-title">{link.title}</div>
                              <div className="analytics-row-url">{link.url}</div>
                            </div>
                            <div className="analytics-row-bar-wrap">
                              <div
                                className="analytics-row-bar"
                                style={{ width: `${(link.clicks / maxClicks) * 100}%` }}
                              />
                            </div>
                            <div className="analytics-row-count">{link.clicks}</div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 30 }}>
                      No analytics data yet. Share your page to start tracking!
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
