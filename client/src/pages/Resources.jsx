import { useState } from 'react';
import { FiBook, FiVideo, FiDownload, FiExternalLink, FiLayout, FiTrendingUp, FiPenTool, FiCode, FiCamera, FiShare2 } from 'react-icons/fi';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import './Resources.css';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('all');

  const resources = [
    {
      type: 'guide',
      icon: <FiBook />,
      title: 'The Ultimate Link-in-Bio Strategy Guide',
      description: 'Learn how to maximize clicks, conversions, and engagement from your bio link. Includes case studies from top creators who grew their audience by 500%.',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop',
      tag: 'Popular',
      readTime: '12 min read',
    },
    {
      type: 'tutorial',
      icon: <FiVideo />,
      title: 'Setting Up Your Perfect Profile in 5 Minutes',
      description: 'Step-by-step video tutorial walking you through account creation, customization, and your first link page. Perfect for beginners.',
      image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop',
      tag: 'Video',
      readTime: '5 min watch',
    },
    {
      type: 'guide',
      icon: <FiTrendingUp />,
      title: 'Analytics Mastery: Data-Driven Growth',
      description: 'Understand your click data like a pro. Learn which metrics matter, how to read trends, and how to optimize your link placement for maximum impact.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tag: 'Advanced',
      readTime: '8 min read',
    },
    {
      type: 'template',
      icon: <FiLayout />,
      title: 'Premium Theme Templates Collection',
      description: 'Browse our curated collection of 20+ stunning page templates. From minimalist to bold, find the perfect look for your brand and customize it freely.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
      tag: 'Free',
      readTime: 'Templates',
    },
    {
      type: 'guide',
      icon: <FiPenTool />,
      title: 'Personal Branding for the Digital Age',
      description: 'Your link page is your digital business card. Learn how to craft a consistent brand identity across all platforms that builds trust and recognition.',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop',
      tag: 'Branding',
      readTime: '10 min read',
    },
    {
      type: 'tutorial',
      icon: <FiCode />,
      title: 'Advanced Customization with Custom CSS',
      description: 'Take full control of your page design with custom CSS. This tutorial covers everything from custom fonts to animated backgrounds and responsive layouts.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      tag: 'Pro',
      readTime: '15 min read',
    },
    {
      type: 'template',
      icon: <FiCamera />,
      title: 'Photography Portfolio Template Pack',
      description: 'Specially designed templates for photographers and visual artists. Showcase your work with full-width image galleries and elegant typography.',
      image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&h=400&fit=crop',
      tag: 'Free',
      readTime: 'Templates',
    },
    {
      type: 'guide',
      icon: <FiShare2 />,
      title: 'Social Media Cross-Promotion Playbook',
      description: 'Maximize your bio link traffic with our cross-promotion strategies for Instagram, TikTok, YouTube, Twitter, and LinkedIn. Real examples included.',
      image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=600&h=400&fit=crop',
      tag: 'Strategy',
      readTime: '9 min read',
    },
    {
      type: 'tutorial',
      icon: <FiDownload />,
      title: 'Integrating with E-commerce Platforms',
      description: 'Connect your Shopify, Etsy, or Gumroad store with your LinkBio page. Drive sales directly from social media with optimized product links.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      tag: 'E-commerce',
      readTime: '7 min read',
    },
  ];

  const tabs = [
    { id: 'all', label: 'All Resources' },
    { id: 'guide', label: 'Guides' },
    { id: 'tutorial', label: 'Tutorials' },
    { id: 'template', label: 'Templates' },
  ];

  const filtered = activeTab === 'all' ? resources : resources.filter(r => r.type === activeTab);

  return (
    <div className="resources-page">
      <section className="resources-hero">
        <div className="container">
          <ScrollReveal>
            <div className="badge" style={{ margin: '0 auto 20px' }}>
              <FiBook /> Resources
            </div>
            <h1 className="hero-title">
              Learn, Create, <span className="text-gradient">Grow</span>
            </h1>
            <p className="hero-subtitle">
              Guides, tutorials, and templates to help you get the most out of LinkBio.
              From beginner basics to advanced strategies — we've got you covered.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="resources-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`resource-tab ${activeTab === tab.id ? 'resource-tab-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <StaggerContainer className="grid-3 resources-grid">
            {filtered.map((resource, i) => (
              <StaggerItem key={i}>
                <div className="resource-card glass-card">
                  <div className="resource-image">
                    <img src={resource.image} alt={resource.title} loading="lazy" />
                    <div className="resource-tag">{resource.tag}</div>
                  </div>
                  <div className="resource-body">
                    <div className="resource-meta">
                      <span className="resource-type-icon">{resource.icon}</span>
                      <span className="resource-time">{resource.readTime}</span>
                    </div>
                    <h3 className="resource-title">{resource.title}</h3>
                    <p className="resource-desc">{resource.description}</p>
                    <button className="resource-link">
                      Read More <FiExternalLink />
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="newsletter-card glass-card-static">
              <div className="newsletter-content">
                <h2>Stay Updated with Creator Tips</h2>
                <p>Get weekly insights, strategies, and resources delivered straight to your inbox. Join 15,000+ creators who read our newsletter.</p>
                <div className="newsletter-form">
                  <input type="email" placeholder="Enter your email" className="form-input" />
                  <button className="btn btn-primary">Subscribe</button>
                </div>
                <span className="newsletter-note">No spam, ever. Unsubscribe anytime.</span>
              </div>
              <div className="newsletter-image">
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=400&fit=crop"
                  alt="Newsletter"
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Resources;
