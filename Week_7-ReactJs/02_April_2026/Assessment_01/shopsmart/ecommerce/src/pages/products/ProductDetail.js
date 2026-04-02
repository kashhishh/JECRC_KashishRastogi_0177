import { Outlet, Link, useParams } from 'react-router-dom';
import './Products.css';

const ProductDetail = () => {
  const { productId } = useParams();

  const products = {
    1: { name: 'Wireless Headphones', price: '$79.99', description: 'Premium wireless headphones with noise cancellation' },
    2: { name: 'Smart Watch', price: '$199.99', description: 'Advanced fitness tracking and notifications' },
    3: { name: 'Laptop Stand', price: '$49.99', description: 'Ergonomic laptop stand for better posture' },
    4: { name: 'USB-C Cable', price: '$14.99', description: 'High-speed USB-C charging and data cable' },
    5: { name: 'Mechanical Keyboard', price: '$129.99', description: 'Professional mechanical keyboard with backlighting' },
    6: { name: 'Wireless Mouse', price: '$59.99', description: 'Precision wireless mouse with USB receiver' },
    7: { name: 'Monitor Lamp', price: '$39.99', description: 'Eye-friendly monitor screen light bar' },
    8: { name: 'Phone Case', price: '$24.99', description: 'Durable protective phone case' },
  };

  const product = products[productId] || { name: 'Product Not Found', price: 'N/A', description: '' };

  return (
    <div className="product-detail-container">
      <Link to="/products" className="back-link">← Back to Products</Link>

      <div className="product-detail">
        <div className="product-image-large">📦</div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price-large">{product.price}</p>
          <p className="description">{product.description}</p>

          <div className="product-specs">
            <h3>Quick Specs</h3>
            <ul>
              <li>High quality material</li>
              <li>Warranty included</li>
              <li>Free shipping on orders over $50</li>
              <li>Easy returns within 30 days</li>
            </ul>
          </div>

          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>

      <div className="product-tabs">
        <Link 
          to={`/products/${productId}/reviews`} 
          className="tab-link"
        >
          Reviews
        </Link>
        <Link 
          to={`/products/${productId}/specs`} 
          className="tab-link"
        >
          Specifications
        </Link>
      </div>

      <div className="tab-content">
        <Outlet context={{ productName: product.name }} />
      </div>
    </div>
  );
};

export default ProductDetail;
