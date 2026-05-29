import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiMessageCircle, FiClock, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import './Contact.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      await axios.post(`${API}/contact`, formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.response?.data?.message || 'Something went wrong. Please try again.' });
    }
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: 'Email Us',
      detail: 'hello@linkbio.com',
      sub: 'We reply within 2 hours',
    },
    {
      icon: <FiMapPin />,
      title: 'Our Office',
      detail: 'San Francisco, CA',
      sub: '548 Market St, Suite 100',
    },
    {
      icon: <FiPhone />,
      title: 'Call Us',
      detail: '+1 (555) 123-4567',
      sub: 'Mon-Fri 9am-6pm PST',
    },
    {
      icon: <FiClock />,
      title: 'Support Hours',
      detail: '24/7 Available',
      sub: 'Live chat & email support',
    },
  ];

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <ScrollReveal>
            <div className="badge" style={{ margin: '0 auto 20px' }}>
              <FiMessageCircle /> Contact Us
            </div>
            <h1 className="hero-title">
              Let's Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="hero-subtitle">
              Have a question, feedback, or just want to say hello? We'd love to hear from you.
              Our team typically responds within 2 hours during business hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={{ paddingBottom: 40 }}>
        <div className="container">
          <StaggerContainer className="grid-4 contact-info-grid">
            {contactInfo.map((info) => (
              <StaggerItem key={info.title}>
                <div className="contact-info-card glass-card-static">
                  <div className="contact-info-icon">{info.icon}</div>
                  <h3>{info.title}</h3>
                  <div className="contact-info-detail">{info.detail}</div>
                  <div className="contact-info-sub">{info.sub}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="contact-grid">
            <ScrollReveal direction="left">
              <div className="contact-form-card glass-card-static">
                <h2>Send Us a Message</h2>
                <p className="contact-form-desc">
                  Fill out the form below and we'll get back to you as soon as possible.
                  All fields are required.
                </p>

                {status.success ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="success-message"
                  >
                    <FiCheckCircle className="success-icon" />
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. We'll get back to you within 2 hours.</p>
                    <button className="btn btn-secondary" onClick={() => setStatus({ ...status, success: false })}>
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="form-input"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your question or feedback..."
                        className="form-input"
                        rows={6}
                        required
                      />
                    </div>
                    {status.error && <div className="form-error">{status.error}</div>}
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={status.loading}
                      style={{ width: '100%' }}
                    >
                      {status.loading ? 'Sending...' : <>Send Message <FiSend /></>}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="contact-side">
                <div className="contact-map-card glass-card-static">
                  <img
                    src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop"
                    alt="San Francisco"
                    className="map-placeholder"
                    loading="lazy"
                  />
                  <div className="map-overlay">
                    <FiMapPin className="map-pin" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>

                <div className="contact-faq-card glass-card-static">
                  <h3>Common Questions</h3>
                  <div className="contact-faq-item">
                    <strong>How fast will I get a response?</strong>
                    <p>We typically respond within 2 hours during business hours (Mon-Fri, 9am-6pm PST).</p>
                  </div>
                  <div className="contact-faq-item">
                    <strong>Can I schedule a demo?</strong>
                    <p>Yes! Mention "demo" in your message and we'll set up a personalized walkthrough.</p>
                  </div>
                  <div className="contact-faq-item">
                    <strong>I need technical support</strong>
                    <p>Include your username and a description of the issue for fastest resolution.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
