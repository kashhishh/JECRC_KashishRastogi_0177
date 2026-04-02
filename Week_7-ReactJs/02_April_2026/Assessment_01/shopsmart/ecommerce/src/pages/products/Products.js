import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const products = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: '$79.99' },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: '$199.99' },
    { id: 3, name: 'Laptop Stand', category: 'Accessories', price: '$49.99' },
    { id: 4, name: 'USB-C Cable', category: 'Accessories', price: '$14.99' },
    { id: 5, name: 'Mechanical Keyboard', category: 'Electronics', price: '$129.99' },
    { id: 6, name: 'Wireless Mouse', category: 'Electronics', price: '$59.99' },
    { id: 7, name: 'Monitor Lamp', category: 'Accessories', price: '$39.99' },
    { id: 8, name: 'Phone Case', category: 'Accessories', price: '$24.99' },
  ];

  return (
    <div className="products-container">
      <h1>Our Products</h1>
      <p className="products-intro">Browse our collection of high-quality products</p>

      <div className="products-grid">
        {products.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-card">
            <div className="product-image">📦</div>
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">{product.price}</p>
            <button className="view-details">View Details</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
