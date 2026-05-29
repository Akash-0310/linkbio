import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      name: 'Getting Started',
      faqs: [
        {
          q: 'What is LinkBio and how does it work?',
          a: 'LinkBio is a self-hosted link-in-bio page builder designed for creators, influencers, and freelancers. You create an account, customize your profile with your name, photo, and bio, then add all your important links. You get a unique URL (like linkbio.com/yourname) that you can share on Instagram, TikTok, Twitter, and anywhere else. Every click is tracked with built-in analytics.',
        },
        {
          q: 'Is LinkBio really free?',
          a: 'Yes! Our Free tier includes up to 5 links, basic analytics, 3 themes, and a LinkBio subdomain — completely free, forever. No credit card required. When you need more features like unlimited links, custom domains, and advanced analytics, you can upgrade to our Pro plan at $9/month.',
        },
        {
          q: 'How do I create my first link page?',
          a: 'It takes less than 2 minutes: 1) Sign up with your email and choose a username, 2) Upload your profile photo and write a short bio, 3) Add your links with custom titles and icons, 4) Choose a theme, and 5) Share your unique URL. No coding or technical skills required!',
        },
        {
          q: 'Can I use my own domain name?',
          a: 'Absolutely! Pro and Business plan users can connect their own custom domain (like links.yourbrand.com). We provide step-by-step instructions and our support team is available to help with DNS configuration.',
        },
      ],
    },
    {
      name: 'Features & Customization',
      faqs: [
        {
          q: 'How many links can I add?',
          a: 'Free users can add up to 5 links. Pro and Business users get unlimited links. Each link can have a custom title, icon, and can be toggled on/off without deleting it.',
        },
        {
          q: 'What themes and customization options are available?',
          a: 'We offer 7 stunning themes including animated gradient backgrounds, glassmorphism effects, and minimal designs. Pro users get access to all themes plus custom CSS for pixel-perfect control. You can customize colors, fonts, button styles, and layout to match your brand.',
        },
        {
          q: 'Does LinkBio work on all devices?',
          a: 'Yes! Every LinkBio page is designed mobile-first and is fully responsive across all screen sizes — smartphones, tablets, laptops, and desktops. We test on 50+ device configurations to ensure a flawless experience.',
        },
        {
          q: 'Can I add social media icons?',
          a: 'Yes! We support icons for 30+ platforms including Instagram, TikTok, YouTube, Twitter/X, Spotify, Apple Music, GitHub, LinkedIn, and more. Custom icons are available for Pro users.',
        },
      ],
    },
    {
      name: 'Analytics & Tracking',
      faqs: [
        {
          q: 'What analytics does LinkBio provide?',
          a: 'Our analytics dashboard shows total page views, click counts per link, click-through rates, referral sources, geographic data, and time-based trends. Pro users get additional insights like device breakdown, peak traffic hours, and A/B testing capabilities.',
        },
        {
          q: 'Is the click tracking accurate?',
          a: 'Yes! We track clicks server-side, so they are not affected by ad blockers or browser extensions. Each click is recorded with timestamp, referrer, and device information for comprehensive analytics.',
        },
        {
          q: 'Can I export my analytics data?',
          a: 'Pro and Business users can export analytics data in CSV format. Business users also get API access for custom integrations with tools like Google Sheets, Notion, or your own dashboards.',
        },
      ],
    },
    {
      name: 'Privacy & Security',
      faqs: [
        {
          q: "What's your privacy policy?",
          a: "We take privacy seriously. We don't sell your data, don't use third-party tracking pixels, and don't serve ads. Your page analytics are visible only to you. We use industry-standard encryption for all data in transit and at rest.",
        },
        {
          q: 'Is my data secure?',
          a: 'Your data is encrypted with AES-256 at rest and TLS 1.3 in transit. We use secure password hashing with bcrypt, JWT authentication with regular token rotation, and conduct regular security audits. We are SOC 2 Type II compliant.',
        },
        {
          q: 'Can I delete my account and all data?',
          a: 'Yes! You can delete your account at any time from your dashboard settings. All your data — profile, links, analytics — will be permanently removed within 24 hours. No questions asked.',
        },
      ],
    },
    {
      name: 'Billing & Plans',
      faqs: [
        {
          q: 'Can I cancel my subscription anytime?',
          a: "Yes, you can cancel anytime with no penalties or hidden fees. When you cancel, you keep Pro features until the end of your billing period, then your account reverts to the Free tier. You won't lose any links — they just become inactive if you exceed the free limit.",
        },
        {
          q: 'Do you offer refunds?',
          a: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied for any reason, contact our support team within 14 days for a full refund.",
        },
        {
          q: 'Is there a discount for annual billing?',
          a: 'Yes! Annual billing saves you 20%. The Pro plan is $7.20/month (billed annually at $86.40) instead of $9/month. Business plan is $23.20/month (billed annually at $278.40) instead of $29/month.',
        },
      ],
    },
  ];

  const allFaqs = categories.flatMap((cat, catIndex) =>
    cat.faqs.map((faq, faqIndex) => ({
      ...faq,
      category: cat.name,
      globalIndex: `${catIndex}-${faqIndex}`,
    }))
  );

  const filteredFaqs = searchQuery
    ? allFaqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="container">
          <ScrollReveal>
            <div className="badge" style={{ margin: '0 auto 20px' }}>
              <FiHelpCircle /> FAQ
            </div>
            <h1 className="hero-title">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="hero-subtitle">
              Everything you need to know about LinkBio. Can't find what you're looking for?
              Our support team is always happy to help.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="faq-search">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input search-input"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container faq-container">
          {filteredFaqs ? (
            <div className="faq-results">
              <p className="faq-results-count">
                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} found
              </p>
              {filteredFaqs.map((faq) => (
                <ScrollReveal key={faq.globalIndex}>
                  <div
                    className={`faq-item glass-card-static ${openIndex === faq.globalIndex ? 'faq-open' : ''}`}
                    onClick={() => toggle(faq.globalIndex)}
                  >
                    <div className="faq-question">
                      <span className="faq-category-tag">{faq.category}</span>
                      <h3>{faq.q}</h3>
                      <motion.div
                        animate={{ rotate: openIndex === faq.globalIndex ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="faq-chevron"
                      >
                        <FiChevronDown />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {openIndex === faq.globalIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="faq-answer"
                        >
                          <p>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            categories.map((category, catIdx) => (
              <div key={category.name} className="faq-category">
                <ScrollReveal>
                  <h2 className="faq-category-title">{category.name}</h2>
                </ScrollReveal>
                <StaggerContainer>
                  {category.faqs.map((faq, faqIdx) => {
                    const idx = `${catIdx}-${faqIdx}`;
                    return (
                      <StaggerItem key={idx}>
                        <div
                          className={`faq-item glass-card-static ${openIndex === idx ? 'faq-open' : ''}`}
                          onClick={() => toggle(idx)}
                        >
                          <div className="faq-question">
                            <h3>{faq.q}</h3>
                            <motion.div
                              animate={{ rotate: openIndex === idx ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="faq-chevron"
                            >
                              <FiChevronDown />
                            </motion.div>
                          </div>
                          <AnimatePresence>
                            {openIndex === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="faq-answer"
                              >
                                <p>{faq.a}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            ))
          )}

          <ScrollReveal>
            <div className="faq-cta glass-card-static">
              <h3>Still have questions?</h3>
              <p>Our friendly support team is here to help you 24/7.</p>
              <Link to="/contact" className="btn btn-primary">Contact Support</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
