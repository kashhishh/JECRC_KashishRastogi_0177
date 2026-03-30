import React from 'react';

function CartItem({ item, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <span className="cart-item-name">{item.name}</span>
        <span className="cart-item-subtotal">${item.price * item.quantity}</span>
      </div>

      <div className="cart-item-controls">
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
        <span className="quantity">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>

        {/* Remove single item */}
        <button className="remove-btn" onClick={() => onRemoveItem(item.id)} title="Remove item">
          🗑️ Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;