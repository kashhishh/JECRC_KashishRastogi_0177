import { useState } from 'react';
import './Public.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container">
      <section className="content-section">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Send us a message!</p>

        <div className="contact-wrapper">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>

          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="info-item">
              <h4>Email</h4>
              <p>support@eshop.com</p>
            </div>
            <div className="info-item">
              <h4>Phone</h4>
              <p>+1-800-ESHOP (37467)</p>
            </div>
            <div className="info-item">
              <h4>Address</h4>
              <p>123 Shopping Street<br />Commerce City, CC 12345</p>
            </div>
            <div className="info-item">
              <h4>Business Hours</h4>
              <p>Monday - Friday: 9AM - 6PM<br />Saturday - Sunday: 10AM - 4PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
