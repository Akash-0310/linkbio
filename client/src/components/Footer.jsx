import { Link } from 'react-router-dom';
import { IoRocketOutline } from 'react-icons/io5';
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Features', path: '/#features' },
      { name: 'Pricing', path: '/#pricing' },
      { name: 'Templates', path: '/resources' },
      { name: 'Analytics', path: '/#features' },
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Blog', path: '/resources' },
      { name: 'Careers', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ],
    Support: [
      { name: 'Help Center', path: '/faq' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Resources', path: '/resources' },
      { name: 'Status', path: '/contact' },
    ],
    Legal: [
      { name: 'Privacy Policy', path: '/about' },
      { name: 'Terms of Service', path: '/about' },
      { name: 'Cookie Policy', path: '/about' },
      { name: 'GDPR', path: '/about' },
    ],
  };

  const socialLinks = [
    { icon: <FiGithub />, href: '#', label: 'GitHub' },
    { icon: <FiTwitter />, href: '#', label: 'Twitter' },
    { icon: <FiInstagram />, href: '#', label: 'Instagram' },
    { icon: <FiLinkedin />, href: '#', label: 'LinkedIn' },
    { icon: <FiMail />, href: '#', label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <IoRocketOutline />
              </div>
              <span className="logo-text">Link<span className="text-gradient">Bio</span></span>
            </Link>
            <p className="footer-description">
              Create beautiful, customizable link-in-bio pages that convert.
              Trusted by 50,000+ creators, influencers, and freelancers worldwide.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="social-link" aria-label={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links-grid">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="footer-column">
                <h4 className="footer-column-title">{category}</h4>
                <ul>
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="footer-link">{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} LinkBio. All rights reserved.
          </p>
          <p className="footer-made-with">
            Made with <FiHeart className="heart-icon" /> by LinkBio Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
