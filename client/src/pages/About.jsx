import { motion } from 'framer-motion';
import { FiTarget, FiHeart, FiUsers, FiGlobe, FiAward, FiTrendingUp, FiShield, FiZap } from 'react-icons/fi';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import './About.css';

const About = () => {
  const values = [
    {
      icon: <FiHeart />,
      title: 'Creator-First',
      description: 'Everything we build starts with one question: does this help creators succeed? Your success is our mission.',
    },
    {
      icon: <FiShield />,
      title: 'Privacy by Design',
      description: 'We believe your data belongs to you. No tracking pixels, no selling data to advertisers. Period.',
    },
    {
      icon: <FiZap />,
      title: 'Performance Obsessed',
      description: 'Every millisecond matters. We optimize relentlessly so your page loads instantly, everywhere.',
    },
    {
      icon: <FiGlobe />,
      title: 'Open & Transparent',
      description: 'From our pricing to our roadmap, we believe in radical transparency with our community.',
    },
  ];

  const team = [
    {
      name: 'Alex Morgan',
      role: 'CEO & Co-founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
      bio: 'Former product lead at Stripe. Passionate about empowering independent creators.',
    },
    {
      name: 'Priya Sharma',
      role: 'CTO & Co-founder',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
      bio: 'Ex-Google engineer with 12 years of distributed systems experience.',
    },
    {
      name: 'Jordan Lee',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
      bio: 'Award-winning designer who previously led design at Figma and Notion.',
    },
    {
      name: 'Maria Santos',
      role: 'Head of Community',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
      bio: 'Built creator communities of 100K+ members. Your voice inside our team.',
    },
  ];

  const milestones = [
    { year: '2022', title: 'The Beginning', desc: 'Founded in a garage with a simple idea: links should be beautiful.' },
    { year: '2023', title: '10K Users', desc: 'Reached our first major milestone and launched Pro tier.' },
    { year: '2024', title: 'Series A', desc: 'Raised $12M to accelerate growth and build new features.' },
    { year: '2025', title: '50K Creators', desc: 'Trusted by creators in 150+ countries around the world.' },
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <ScrollReveal>
            <div className="badge" style={{ margin: '0 auto 20px' }}>
              <FiTarget /> Our Story
            </div>
            <h1 className="hero-title">
              We're Building the Future of<br />
              <span className="text-gradient">Personal Branding</span>
            </h1>
            <p className="hero-subtitle">
              LinkBio started with a simple frustration: why do link-in-bio tools feel so generic?
              We believed creators deserve a page that's as unique as they are — fast, beautiful,
              and completely under their control.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="about-hero-image">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop"
                alt="Team collaboration"
                loading="lazy"
              />
              <div className="image-overlay" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="mission-grid">
            <ScrollReveal direction="left">
              <div className="mission-content">
                <div className="badge" style={{ marginBottom: 20 }}>
                  <FiAward /> Our Mission
                </div>
                <h2 className="section-title" style={{ textAlign: 'left' }}>
                  Empowering Every Creator to <span className="gradient-text">Own Their Audience</span>
                </h2>
                <p className="mission-text">
                  In a world where algorithms control visibility, we believe every creator deserves a direct
                  line to their audience. LinkBio gives you a beautiful, lightning-fast page that you control
                  completely — no middleman deciding who sees your content.
                </p>
                <p className="mission-text">
                  We're not just another link-in-bio tool. We're a movement towards creator independence.
                  Self-hosted, privacy-respecting, and designed to convert — because your audience
                  should work for you, not for a platform.
                </p>
                <div className="mission-stats">
                  <div className="mission-stat">
                    <FiUsers className="mission-stat-icon" />
                    <div>
                      <strong>50,000+</strong>
                      <span>Active Creators</span>
                    </div>
                  </div>
                  <div className="mission-stat">
                    <FiTrendingUp className="mission-stat-icon" />
                    <div>
                      <strong>340%</strong>
                      <span>Avg. CTR Increase</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="mission-image">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=700&fit=crop"
                  alt="Creative workspace"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="section-subtitle">
              These aren't just words on a wall. They're the principles that guide every decision
              we make, from product features to hiring.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid-2">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="value-card glass-card">
                  <div className="value-icon">{v.icon}</div>
                  <div>
                    <h3>{v.title}</h3>
                    <p>{v.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="section-subtitle">
              From a side project to a platform serving 50,000+ creators — here's how we got here.
            </p>
          </ScrollReveal>
          <div className="timeline">
            {milestones.map((m, i) => (
              <ScrollReveal key={m.year} delay={i * 0.1}>
                <div className="timeline-item">
                  <div className="timeline-marker">
                    <div className="timeline-dot" />
                  </div>
                  <div className="timeline-content glass-card" style={{ padding: '24px 28px' }}>
                    <div className="timeline-year">{m.year}</div>
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section team-section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="section-subtitle">
              We're a small, passionate team of builders who believe the internet should work
              for creators, not against them.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid-4">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="team-card glass-card">
                  <div className="team-image-wrap">
                    <img src={member.image} alt={member.name} loading="lazy" />
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <div className="team-role">{member.role}</div>
                    <p className="team-bio">{member.bio}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
};

export default About;
