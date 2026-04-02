import './Public.css';

const About = () => {
  return (
    <div className="container">
      <section className="content-section">
        <h1>About E-Shop</h1>
        <p>
          E-Shop is a leading online retail platform dedicated to providing customers
          with a seamless shopping experience. Founded in 2020, we have grown to become
          a trusted destination for quality products and excellent customer service.
        </p>

        <h2>Our Mission</h2>
        <p>
          To make online shopping accessible, affordable, and enjoyable for everyone.
          We believe in providing exceptional value and service to our customers.
        </p>

        <h2>Our Values</h2>
        <ul className="values-list">
          <li>Customer-first approach</li>
          <li>Quality and authenticity</li>
          <li>Competitive pricing</li>
          <li>Sustainable practices</li>
          <li>Excellent customer support</li>
        </ul>

        <h2>Why Choose E-Shop?</h2>
        <div className="reasons">
          <div className="reason-item">
            <h3>Trusted Partner</h3>
            <p>Serving thousands of satisfied customers worldwide</p>
          </div>
          <div className="reason-item">
            <h3>Innovation</h3>
            <p>Continuously improving our platform for better user experience</p>
          </div>
          <div className="reason-item">
            <h3>Security</h3>
            <p>Your data and transactions are protected with industry-leading security</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
