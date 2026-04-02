import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Your trusted online shopping destination for quality products.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@eshop.com</p>
          <p>Phone: +1-800-ESHOP</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#instagram">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 E-Shop By Kashish Rastogi . All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
