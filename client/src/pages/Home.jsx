import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiLink, FiBarChart2, FiSmartphone, FiZap, FiShield, FiGlobe, FiStar, FiCheck, FiUsers, FiTrendingUp, FiLayers } from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <FiLink />,
      title: 'Unlimited Links',
      description: 'Add as many links as you want. Social media, websites, portfolios, music, videos — organize everything in one place.',
    },
    {
      icon: <FiBarChart2 />,
      title: 'Click Analytics',
      description: 'Track every click in real-time. Understand your audience with detailed analytics, referral sources, and engagement metrics.',
    },
    {
      icon: <FiSmartphone />,
      title: 'Mobile-First Design',
      description: 'Every page is optimized for mobile devices. Your audience gets a beautiful experience on any screen size.',
    },
    {
      icon: <FiZap />,
      title: 'Lightning Fast',
      description: 'Pages load in under 100ms. No bloated scripts, no heavy frameworks — just pure performance.',
    },
    {
      icon: <FiShield />,
      title: 'Self-Hosted & Private',
      description: 'Your data stays yours. No tracking pixels, no third-party cookies. Complete control over your personal page.',
    },
    {
      icon: <FiGlobe />,
      title: 'Custom Domains',
      description: 'Use your own domain name for a professional look. Setup takes less than 5 minutes with our guided process.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Active Creators' },
    { number: '2M+', label: 'Links Shared' },
    { number: '99.9%', label: 'Uptime' },
    { number: '150+', label: 'Countries' },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Content Creator, 1.2M followers',
      text: 'LinkBio completely transformed how I share content with my audience. The analytics alone saved me hours of guesswork. My click-through rate increased by 340% in the first month.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Marcus Rivera',
      role: 'Freelance Designer',
      text: "Finally, a link-in-bio tool that doesn't look generic. The glassmorphism themes are gorgeous, and my clients always ask how I built my page. It's become my secret weapon.",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Aisha Patel',
      role: 'E-commerce Entrepreneur',
      text: 'I switched from Linktree and my conversion rate doubled. The self-hosting aspect means faster load times and zero downtime. My store links finally get the clicks they deserve.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
  ];

  const pricing = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: ['Up to 5 links', 'Basic analytics', '3 themes', 'Mobile responsive', 'LinkBio subdomain'],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/month',
      description: 'For serious creators',
      features: ['Unlimited links', 'Advanced analytics', 'All themes + custom CSS', 'Custom domain', 'Priority support', 'Remove LinkBio branding', 'SEO optimization'],
      cta: 'Start Pro Trial',
      popular: true,
    },
    {
      name: 'Business',
      price: '$29',
      period: '/month',
      description: 'For teams and brands',
      features: ['Everything in Pro', 'Team collaboration', 'API access', 'White-label solution', 'Dedicated support', 'SLA guarantee', 'Custom integrations'],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const howItWorks = [
    {
      step: '01',
      icon: <FiUsers />,
      title: 'Create Your Account',
      description: 'Sign up in seconds with your email. Choose a unique username that becomes your shareable URL.',
    },
    {
      step: '02',
      icon: <FiLayers />,
      title: 'Customize Your Page',
      description: 'Add your photo, bio, and links. Pick from stunning themes with animated gradients and glassmorphism effects.',
    },
    {
      step: '03',
      icon: <FiTrendingUp />,
      title: 'Share & Grow',
      description: 'Drop your LinkBio URL everywhere — Instagram, TikTok, Twitter, email. Watch your clicks soar with real-time analytics.',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="container">
          <ScrollReveal>
            <div className="hero-badge badge">
              <IoRocketOutline /> Now in Public Beta — Join 50,000+ Creators
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="hero-title">
              One Link to Rule<br />
              <span className="text-gradient">All Your Content</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="hero-subtitle">
              Create a stunning, self-hosted link-in-bio page in minutes. Share your content,
              track clicks, and own your audience — no middleman, no limitations, no compromises.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Create Your Page <FiArrowRight />
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg">
                See How It Works
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="hero-preview">
              <div className="hero-preview-frame">
                <div className="preview-phone">
                  <div className="phone-notch" />
                  <div className="preview-content">
                    <div className="preview-avatar" />
                    <div className="preview-name-bar" />
                    <div className="preview-bio-bar" />
                    <div className="preview-link-bar" />
                    <div className="preview-link-bar" />
                    <div className="preview-link-bar" />
                    <div className="preview-link-bar short" />
                  </div>
                </div>
              </div>
              <div className="hero-float-card float-card-1 glass-card">
                <FiBarChart2 className="float-icon" />
                <div>
                  <div className="float-label">Total Clicks</div>
                  <div className="float-value">24,891</div>
                </div>
              </div>
              <div className="hero-float-card float-card-2 glass-card">
                <FiTrendingUp className="float-icon" style={{ color: 'var(--success)' }} />
                <div>
                  <div className="float-label">Growth</div>
                  <div className="float-value" style={{ color: 'var(--success)' }}>+127%</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <StaggerContainer className="stats-grid">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="stat-card glass-card-static">
                  <div className="stat-number text-gradient">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" id="features">
        <div className="container">
          <ScrollReveal>
            <div className="badge" style={{ margin: '0 auto 20px', display: 'inline-flex' }}>
              <FiZap /> Powerful Features
            </div>
            <h2 className="section-title">
              Everything You Need to <span className="gradient-text">Stand Out</span>
            </h2>
            <p className="section-subtitle">
              From unlimited links to real-time analytics, we give you all the tools to create
              a page that truly represents you and drives real engagement.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid-3">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="feature-card glass-card" style={{ padding: '36px' }}>
                  <div className="feature-icon-wrap">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works-section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Get Started in <span className="gradient-text">3 Simple Steps</span>
            </h2>
            <p className="section-subtitle">
              No technical knowledge required. Create your professional link page in minutes,
              not hours. It's that simple.
            </p>
          </ScrollReveal>
          <div className="how-steps">
            {howItWorks.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.15}>
                <div className="how-step-card">
                  <div className="how-step-number">{item.step}</div>
                  <div className="how-step-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {i < howItWorks.length - 1 && <div className="how-step-connector" />}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Image Section */}
      <section className="section showcase-section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Loved by <span className="gradient-text">Creators Worldwide</span>
            </h2>
            <p className="section-subtitle">
              Join thousands of influencers, freelancers, and businesses who trust LinkBio
              to be their digital front door.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="showcase-image-grid">
              <div className="showcase-img-wrapper">
                <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop" alt="Creator workspace" loading="lazy" />
              </div>
              <div className="showcase-img-wrapper tall">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=700&fit=crop" alt="Team collaboration" loading="lazy" />
              </div>
              <div className="showcase-img-wrapper">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" alt="Developer working" loading="lazy" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="badge" style={{ margin: '0 auto 20px', display: 'inline-flex' }}>
              <FiStar /> Testimonials
            </div>
            <h2 className="section-title">
              What Our <span className="gradient-text">Creators Say</span>
            </h2>
            <p className="section-subtitle">
              Don't just take our word for it — hear from creators who've transformed their
              online presence with LinkBio.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="testimonial-card glass-card" style={{ padding: '32px' }}>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="star-filled" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section" id="pricing">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="section-subtitle">
              Start free, upgrade when you're ready. No hidden fees, no surprises.
              Cancel anytime.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid-3 pricing-grid">
            {pricing.map((plan) => (
              <StaggerItem key={plan.name}>
                <div className={`pricing-card glass-card ${plan.popular ? 'pricing-popular' : ''}`}>
                  {plan.popular && <div className="popular-badge">Most Popular</div>}
                  <h3 className="pricing-name">{plan.name}</h3>
                  <p className="pricing-desc">{plan.description}</p>
                  <div className="pricing-price">
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-period">{plan.period}</span>
                  </div>
                  <ul className="pricing-features">
                    {plan.features.map((f) => (
                      <li key={f}><FiCheck className="check-icon" /> {f}</li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ width: '100%' }}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <ScrollReveal>
            <div className="cta-card">
              <h2>Ready to Build Your <span className="text-gradient">Link Page?</span></h2>
              <p>Join 50,000+ creators who've already made the switch. It takes less than 2 minutes to get started.</p>
              <div className="hero-actions">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started Free <FiArrowRight />
                </Link>
                <Link to="/contact" className="btn btn-secondary btn-lg">
                  Talk to Us
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
