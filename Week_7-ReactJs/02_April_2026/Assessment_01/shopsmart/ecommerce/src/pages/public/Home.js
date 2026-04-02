import { Link } from 'react-router-dom';
import './Public.css';

const Home = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1>Welcome to E-Shop</h1>
        <p>Your one-stop destination for quality products at great prices</p>
        <Link to="/products" className="cta-button">
          Shop Now
        </Link>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🎯 Wide Selection</h3>
            <p>Thousands of products to choose from</p>
          </div>
          <div className="feature-card">
            <h3>💰 Best Prices</h3>
            <p>Competitive pricing on all items</p>
          </div>
          <div className="feature-card">
            <h3>🚚 Fast Shipping</h3>
            <p>Quick and reliable delivery</p>
          </div>
          <div className="feature-card">
            <h3>✔️ Quality Guarantee</h3>
            <p>All products are authentic</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Shopping?</h2>
        <p>Browse our collection of premium products</p>
        <Link to="/products" className="cta-button">Explore Products</Link>
      </section>
    </div>
  );
};

export default Home;
