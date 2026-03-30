import React from 'react';

function ProductItem({ product, onAddToCart }) {
  return (
    <div className="product-item">
      <div className="product-info">
        <span className="product-name">{product.name}</span>
        <span className="product-price">${product.price}</span>
      </div>
      <button className="add-btn" onClick={() => onAddToCart(product)}>
        + Add
      </button>
    </div>
  );
}

export default ProductItem;